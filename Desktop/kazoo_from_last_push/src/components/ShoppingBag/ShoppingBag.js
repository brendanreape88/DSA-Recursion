import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import ShoppingBagCard from './ShoppingBagCard';
import FooterButton from '../FooterButton/FooterButton';
import { useColorScheme } from 'react-native-appearance';
import { TNEmptyStateView } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { RFPercentage } from 'react-native-responsive-fontsize';
import add from '../../../assets/icons/add.png';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { useIsFocused } from '@react-navigation/native';
import { firebase } from '../../Core/firebase/config';

function ShoppingBag(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const [canSendAsGift, setCanSendAsGift] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const currentUser = useSelector((state) => state.app.user);
  const isFocused = useIsFocused();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    firebase
      .firestore()
      .collection('friends')
      .doc(currentUser.id)
      .get()
      .then((friendsDoc) => {
        const friends = friendsDoc.get('friends');
        if (Array.isArray(friends) && friends.length > 0) {
          setCanSendAsGift(true);
          setDisabled(false);
        }
      });
    firebase
      .firestore()
      .collection(`users/${currentUser.id}/following`)
      .get()
      .then((docs) => {
        if (docs.size > 0) {
          setCanSendAsGift(true);
          setDisabled(false);
        }
      });
    firebase
      .firestore()
      .collection(`users/${currentUser.id}/subUsers`)
      .get()
      .then((docs) => {
        if (docs.size > 0) {
          setCanSendAsGift(true);
        }
        setDisabled(false);
        setDisabled(false);
      });
  }, [currentUser.id, isFocused]);

  const renderItem = ({ item }) => (
    <ShoppingBagCard
      item={item}
      onColorSelected={(index) => props.onColorSelected({ item, index })}
      onSizeSelected={(index) => props.onSizeSelected({ item, index })}
      productPricesByQty={props.productPricesByQty}
      onQtyChange={(totalPriceObj) => props.onQtyChange(totalPriceObj, item)}
      onLongPress={(product) => props.onLongPress(product)}
      onAttributesSelected={(selectedAttributes) =>
        props.onAttributesSelected(item, selectedAttributes)
      }
      removeFromShoppingBag={(product) => props.removeFromShoppingBag(product)}
      appConfig={props.appConfig}
    />
  );

  const emptyStateConfig = {
    title: IMLocalized('Empty Shopping Bag'),
    description: IMLocalized(
      'Your shopping bag is empty. Add products to your shopping bag and see it appear here.',
    ),
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          ...styles.emptyViewContainer,
        }}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    );
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <ScrollView style={{ width: '100%' }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: themeElementColor,
            marginVertical: 5,
            marginHorizontal: '5%',
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={props.shoppingBag}
          keyExtractor={(item) => item.id.toString()}
          extraData={props.shoppingBag}
          renderItem={renderItem}
          style={{ flex: 1 }}
          ListEmptyComponent={renderEmptyList()}
        />

        {props.shoppingBag?.length > 0 && (
          <View style={{ width: '100%', marginTop: 10 }}>
            <View
              style={{
                marginHorizontal: '5%',
                marginBottom: 5,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: RFPercentage(2),
                  color: themeElementColor,
                }}>
                Promo Code
              </Text>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Image
                  source={add}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: themeElementColor,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Items
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    // fontWeight: 'bold',
                  }}>
                  ${props.totalShoppinBagPrice}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Shipping
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    // fontWeight: 'bold',
                  }}>
                  $0.00
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                  }}>
                  Tax
                </Text>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    // fontWeight: 'bold',
                  }}>
                  $0.00
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                marginHorizontal: '5%',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontSize: RFPercentage(2),
                    // fontWeight: 'bold',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: '#B60101',
                    fontSize: RFPercentage(2),
                    // fontWeight: 'bold',
                  }}>
                  ${props.totalShoppinBagPrice}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {props.shoppingBag?.length > 0 && (
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <FooterButton
            disabled={disabled}
            title={'SEND AS GIFT'}
            onPress={() => {
              if (canSendAsGift) {
                const sendAsGift = true;
                props.onContinuePress(
                  sendAsGift,
                  props.shoppingBag[0].purchaseFromWishlistID,
                );
              } else {
                Alert.alert(
                  'Unable to send gift',
                  'Can only send a gift when you have friends, people you follow, or manually entered users.',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false },
                );
              }
            }}
            footerTitleStyle={styles.footerTitle}
            footerContainerStyle={styles.sendAsGiftButton}
          />
          <FooterButton
            title={'SEND TO ME'}
            onPress={() => {
              const sendAsGift = false;
              props.onContinuePress(sendAsGift);
            }}
            footerTitleStyle={styles.footerTitle}
            footerContainerStyle={styles.purchaseButton}
          />
        </View>
      )}
    </View>
  );
}

ShoppingBag.propTypes = {
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalShoppinBagPrice: PropTypes.string,
  removeFromShoppingBag: PropTypes.func,
  onContinuePress: PropTypes.func,
  onColorSelected: PropTypes.func,
  onSizeSelected: PropTypes.func,
  onQtyChange: PropTypes.func,
  onLongPress: PropTypes.func,
};

export default ShoppingBag;
