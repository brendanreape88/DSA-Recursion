import React, { Component } from 'react';
import {
  View,
  Platform,
  StatusBar,
  AppState,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import PropTypes from 'prop-types';
import { CheckOutDetails } from '../../components';
import { resetCheckout } from '../../redux/';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import styles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
      headerBackTitle: IMLocalized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
    });
    this.state = {
      appState: AppState.currentState,
      isNativePayPossible: false,
      nextClicked: false,
    };
    this.appConfig = route.params.appConfig;
    this.isStripeCheckoutEnabled = !this.appConfig.isStripeCheckoutEnabled;
    // this.onFooterPress = this.onFooterPress.bind(this);
    this.orderAPIManager = new route.params.orderAPIManager(
      props,
      this.appConfig,
    );
  }

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.orderAPIManager.handleAppStateChange &&
        this.orderAPIManager.handleAppStateChange(); // this method does nothing
    }
    this.setState({ appState: nextAppState });
  };

  onFooterPress = async () => {
    console.log('total_to_charge', totalPrice - this.props.amountToUse);
    this.setState({ nextClicked: true });
    const {
      selectedPaymentMethod,
      shippingMethods,
      totalPrice,
      shoppingBag,
    } = this.props;
    const { orderAPIManager } = this;
    const items = [
      {
        label: 'Shopertino, Inc',
        amount: `${totalPrice}`,
      },
    ];
    const options = {
      requiredBillingAddressFields: ['all'],
      billing_address_required: true,
      total_price: `${totalPrice}`,
      currency_code: 'USD',
      shipping_countries: ['US', 'CA'], //android
      line_items: [
        {
          currency_code: 'USD',
          description: 'Pay Shopertino, Inc',
          unit_price: `${totalPrice}`,
          total_price: `${totalPrice}`,
          // total_price: "0.1",
          // unit_price: `0.1`,
          quantity: '1',
        },
      ],
      shippingMethods,
      kazooCashAmount: this.props.amountToUse,
      total_to_charge: `${totalPrice - this.props.amountToUse}`,
      recipient: this.props.recipient,
    };

    try {
      if (orderAPIManager) {
        await orderAPIManager.startCheckout(
          selectedPaymentMethod,
          items,
          options,
          this.loading,
          shoppingBag,
        );
        this.setState({ nextClicked: false });
      }
    } catch (error) {
      Sentry.captureException(error);
      this.setState({ nextClicked: false });
      Alert.alert(IMLocalized('An error occured, please try again.'));
    }
  };

  render() {
    const { width } = Dimensions.get('window');
    console.log(
      'amountToUse in checkout screen render:',
      this.props.amountToUse,
    );

    const themeBackgroundColor =
      this.props.theme === 'dark' ? 'black' : 'white';
    const themeElementColor = this.props.theme === 'dark' ? 'white' : 'black';

    return (
      <>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.checkoutContainer,
          }}>
          <View
            style={{
              height: '11%',
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
                  tintColor: this.props.theme === 'dark' ? 'white' : '#545454',
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
                Checkout
              </Text>
            </View>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Image
                source={arrowheadIcon}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: themeBackgroundColor,
                }}
              />
            </TouchableOpacity>
          </View>
          <CheckOutDetails
            appConfig={this.appConfig}
            totalPrice={this.props.totalPrice}
            selectedShippingMethod={this.props.selectedShippingMethod}
            title={'Shipping Adress'}
            cardNumbersEnding={this.props.cardNumbersEnding}
            isShippinngAddress={true}
            selectedPaymentMethod={this.props.selectedPaymentMethod}
            isStripeCheckoutEnabled={this.isStripeCheckoutEnabled}
            amountOfKazooCashToUse={this.props.amountToUse}
          />
        </View>
        {!this.state.nextClicked ? (
          <View style={{ backgroundColor: themeBackgroundColor }}>
            <TouchableOpacity
              style={styles.paymentMethodNextButton}
              onPress={this.onFooterPress}>
              <Text
                style={{
                  color: themeBackgroundColor,
                  ...styles.paymentMethodNextButtonText,
                }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ backgroundColor: themeBackgroundColor }}>
            <View style={styles.paymentMethodNextButton}>
              <Text
                style={{
                  color: themeBackgroundColor,
                  ...styles.paymentMethodNextButtonText,
                }}>
                PROCESSING
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }
}

CheckoutScreen.propTypes = {
  totalPrice: PropTypes.any,
  orderHistory: PropTypes.array,
  cardNumbersEnding: PropTypes.array,
  currentOrderId: PropTypes.string,
  selectedShippingMethod: PropTypes.object,
  selectedPaymentMethod: PropTypes.object,
  shoppingBag: PropTypes.array,
  navigation: PropTypes.object,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  user: PropTypes.object,
  setOrderHistory: PropTypes.func,
};

const mapStateToProps = ({ checkout, products, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    selectedShippingMethod: checkout.selectedShippingMethod,
    shippingMethods: checkout.shippingMethods,
    cardNumbersEnding: checkout.cardNumbersEnding,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    currentOrderId: checkout.currentOrderId,
    shoppingBag: products.shoppingBag,
    orderHistory: products.orderHistory,
    stripeCustomer: app.stripeCustomer,
    user: app.user,
    giftMessage: checkout.giftMessage,
    giftWrapping: checkout.giftWrapping,
    giftVideo: checkout.giftVideo,
    giftThumbnail: checkout.giftThumbnail,
    recipient: checkout.recipient,
    ShoppingBag: products.shoppingBag,
    amountToUse: app.amountOfKazooCashToUse,
    theme: app.theme,
  };
};

export default connect(mapStateToProps, { resetCheckout })(CheckoutScreen);
