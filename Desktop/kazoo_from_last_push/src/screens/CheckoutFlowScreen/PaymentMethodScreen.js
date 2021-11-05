import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import PropTypes from 'prop-types';
import stripe from 'tipsi-stripe';
import { ProcedureImage, PaymentOptions, HeaderButton } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import {
  updatePaymentMethods,
  setShippingMethods,
  removePaymentMethod,
  setTotalPrice,
} from '../../redux';
import { setAmountToUse } from '../../redux/reducers/app';
import AppStyles from '../../AppStyles';
import AppConfig from '../../ShopertinoConfig';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import PaymentRequestAPI from '../../Core/payment/api';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import cartIcon from '../../../assets/icons/shopping-cart.png';
import styles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import KazooCashOption from './KazooCashOption';

const options = {
  requiredBillingAddressFields: 'full',
  prefilledInformation: {
    billingAddress: {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
  },
};

class PaymentMethodScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      cardStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      title: '',
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={IMLocalized('Cancel')}
        />
      ),
      headerRight: () => (
        <HeaderButton
          onPress={() => {
            navigation.replace('ShippingAddress', {
              appConfig: route.params.appConfig,
            });
          }}
          buttonContainerStyle={{ marginRight: 10 }}
          title={IMLocalized('Next')}
        />
      ),
    });
    this.state = {
      cardNumberValue: '',
      apiToUse: '',
      useKazooCash: false,
      amountOfKazooCashToUse: null,
    };
    this.paymentRequestAPI = new PaymentRequestAPI(AppConfig);
    this.dataAPIManager = new DataAPIManager(AppConfig);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.dataAPIManager.unsubscribe && this.dataAPIManager.unsubscribe();
  }

  loadData = () => {
    this.dataAPIManager.loadPaymentMethod(
      this.props.user,
      ({ paymentMethods, shippingMethods }) => {
        if (paymentMethods) {
          this.setPaymentMethods(paymentMethods);
        }

        if (shippingMethods?.length > 1) {
          this.props.setShippingMethods(shippingMethods);
        }
      },
    );
  };

  setPaymentMethods = (methods) => {
    this.props.updatePaymentMethods(methods);
  };

  onAddNewCard = async () => {
    if (this.props.paymentMethods.length > 4) {
      Alert.alert(
        IMLocalized('Card Limit Exceeded'),
        IMLocalized('Kindly delete a card to add a new payment method.'),
        [
          {
            text: 'Cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      try {
        const token = await stripe.paymentRequestWithCardForm(options);

        if (token) {
          const source = await this.paymentRequestAPI.addNewPaymentSource(
            this.props.stripeCustomer,
            token.tokenId,
          );

          this.onUpdatePaymentMethod(token, source);
        }
      } catch (err) {
        Sentry.captureException(err);
        Alert.alert(
          'an error occured while trying to add card, please try again.',
        );
      }
    }
  };

  onUpdatePaymentMethod = (token, source) => {
    this.dataAPIManager.onUpdatePaymentMethod(
      this.props,
      token,
      source,
      this.loadData,
    );
  };

  onPaymentMethodLongPress = (method) => {
    Alert.alert(
      IMLocalized('Remove card'),
      IMLocalized('This card will be removed from payment methods.'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => this.removeFromPaymentMethods(method),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
        },
      ],
      { cancelable: true },
    );
  };

  removeFromPaymentMethods = async (method) => {
    try {
      const result = await this.paymentRequestAPI.deletePaymentSource(
        this.props.stripeCustomer,
        method.cardId,
      );

      if (result.data?.response?.deleted) {
        this.onRemoveFromPaymentMethods(method);
      }

      if (result?.stripeError?.data?.error?.startsWith('No such source')) {
        this.onRemoveFromPaymentMethods(method);
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('An error occured. try again later');
    }
  };

  onRemoveFromPaymentMethods = (method) => {
    this.dataAPIManager.onRemoveFromPaymentMethods(method, () => {
      this.props.removePaymentMethod(method);
    });
  };

  updateUseKazooCash = (update) => {
    console.log('update', update);
    this.setState({ useKazooCash: update });
  };

  updateKazooCash = (amount) => {
    console.log('amount of kazoo cash passed to update state', amount);
    if (amount === null || amount === 0) {
      this.setState({ amountOfKazooCashToUse: null });
    } else {
      this.setState({ amountOfKazooCashToUse: amount });
    }
  };

  render() {
    const themeBackgroundColor =
      this.props.theme === 'dark' ? 'black' : 'white';
    const { width } = Dimensions.get('window');
    const disabled =
      !this.props.paymentMethods || this.props.paymentMethods.length < 0;
    const style = disabled
      ? { ...styles.paymentMethodNextButton, opacity: 0.2 }
      : styles.paymentMethodNextButton;

    return (
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          flex: 1,
        }}>
        <ScrollView style={styles.paymentMethodKeyboardContainer}>
          <View
            style={{
              backgroundColor: themeBackgroundColor,
              ...styles.checkoutContainer,
            }}>
            {/* <Header title={IMLocalized('Payment Method')} /> */}
            <View
              style={{
                height: 80,
                borderBottomWidth: 1,
                borderColor: '#D9D9D9',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                style={{ marginLeft: 10, marginBottom: 5 }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={arrowheadIcon}
                  style={{
                    height: width * 0.06,
                    width: width * 0.06,
                    tintColor:
                      this.props.theme === 'dark' ? 'white' : '#545454',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  //borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFPercentage(4),
                    fontWeight: 'bold',
                    color: this.props.theme === 'dark' ? 'white' : '#545454',
                  }}>
                  Payment Method
                </Text>
              </View>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Image
                  source={cartIcon}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: this.props.theme === 'dark' ? 'black' : 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
            <ProcedureImage
              source={AppStyles.imageSet.creditCard}
              themeElementColor={this.themeElementColor}
            />
            <PaymentOptions
              onPaymentMethodLongPress={this.onPaymentMethodLongPress}
              onAddNewCard={this.onAddNewCard}
              navigation={this.props.navigation}
              cardNumbersEnding={this.props.cardNumbersEnding}
              paymentMethods={this.props.paymentMethods.filter(
                (method) => !method.isNativePaymentMethod,
              )}
            />
            <KazooCashOption
              useKazooCash={this.state.useKazooCash}
              updateUseKazooCash={this.updateUseKazooCash}
              updateKazooCash={this.updateKazooCash}
            />
          </View>
        </ScrollView>
        <View style={{ backgroundColor: themeBackgroundColor }}>
          <TouchableOpacity
            disabled={disabled}
            style={style}
            onPress={() => {
              this.props.setTotalPrice();
              this.props.setAmountToUse(this.state.amountOfKazooCashToUse);
              this.props.navigation.navigate('Checkout');
              this.setState({
                useKazooCash: false,
                amountOfKazooCashToUse: null,
              });
            }}>
            <Text
              style={{
                color: themeBackgroundColor,
                ...styles.paymentMethodNextButtonText,
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PaymentMethodScreen.propTypes = {
  cardNumbersEnding: PropTypes.array,
  navigation: PropTypes.object,
  paymentMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  setShippingMethods: PropTypes.func,
  updatePaymentMethods: PropTypes.func,
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    shippingMethod: checkout.shippingMethod,
    cardNumbersEnding: checkout.cardNumbersEnding,
    paymentMethods: checkout.paymentMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    theme: app.theme,
  };
};

export default connect(mapStateToProps, {
  setShippingMethods,
  updatePaymentMethods,
  removePaymentMethod,
  setTotalPrice,
  setAmountToUse,
})(PaymentMethodScreen);
