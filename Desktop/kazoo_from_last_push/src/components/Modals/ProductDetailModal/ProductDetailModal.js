import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Share,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import { useColorScheme } from 'react-native-appearance';
import Header from './Header';
import ProductOptions from './ProductOptions';
import Favourite from './Favourite';
import { updatePricesByQty } from '../../../utils/updatePricesByQty';
import {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
  setProductPricesAndQty,
} from '../../../redux/';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { firebase } from '../../../Core/firebase/config';
import dynamicStyles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import pin from '../../../../assets/icons/pin.png';
import { setPinnedItemID, setPinGiftsFor } from '../../../redux/reducers/app';
import { useSelector } from 'react-redux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const { width } = Dimensions.get('window');

function ProductDetailModal(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const {
    visible,
    onCancelPress,
    item,
    onAddToBag,
    appConfig,
    user,
    pinGiftsFor,
    navigation,
    productPricesByQty,
  } = props;

  // if (!item.sizes) {
  //   item.sizes = [];
  // }

  // if (!item.colors) {
  //   item.colors = [];
  // }

  const unbiasedItem = { ...item };
  delete unbiasedItem.isFavourite;

  const [selectedItem, setSelectedItem] = useState(unbiasedItem);
  const [isFav, setIsFav] = useState(false);
  const profileView = useSelector((state) => state.app.profileView);
  const otherUser = useSelector((state) => state.app.otherUser);

  // const loading = useRef('');
  // const paymentRequestAPI = useRef(new PaymentRequestAPI(appConfig));
  // const dataAPIManager = useRef(new DataAPIManager(appConfig));

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  console.log({ selectedItem });

  const toggleFav = () => {
    if (!user.id) {
      return;
    }
    if (selectedItem.id && !isFav) {
      delete selectedItem.purchaseFromWishlistID;
      const favItem = {
        purchaseFromWishlistID: null,
        ...selectedItem,
      };
      const wishlistDB = firebase
        .firestore()
        .collection(`users/${user.id}/wishlist`);
      wishlistDB
        .doc(favItem.id)
        .set(favItem)
        .then(() => {
          setIsFav(true);
          console.log('item added to wishlist!');
        });
    } else if (selectedItem.id && isFav) {
      const wishlistDB = firebase
        .firestore()
        .collection(`users/${user.id}/wishlist`);
      wishlistDB
        .doc(selectedItem.id)
        .delete()
        .then(() => {
          setIsFav(false);
          console.log('item removed from wishlist!');
        });
    }
  };

  const selectUser = () => {
    // setPinned(true);
    navigation.navigate('Select Recipient', {
      type: 'pin gift',
      item: selectedItem,
    });
    // toggleProductDetailVisible();
    onCancelPress();
  };

  const unPinGift = () => {
    if (profileView === 'friend') {
      const pinnedGiftsDB = firebase
        .firestore()
        .collection(`users/${user.id}/friends/${pinGiftsFor}/pinnedGifts`);
      pinnedGiftsDB
        .doc(selectedItem.id)
        .delete()
        .then(() => {
          console.log('gift has been unpinned from friend account!');
          props.setPinnedItemID(null);
          props.setPinGiftsFor(null);
        });
    } else if (profileView === 'off-app friend') {
      console.log('remove pinned gift from off-app friend account ran!');
      const pinnedGiftsDB = firebase
        .firestore()
        .collection(`users/${user.id}/subUsers/${otherUser.id}/pinnedGifts`);
      pinnedGiftsDB
        .doc(selectedItem.id)
        .delete()
        .then(() => {
          console.log('gift has been unpinned from sub user account!');
          props.setPinnedItemID(null);
          props.setPinGiftsFor(null);
        });
    } else {
      return () => {};
    }
  };

  // useEffect(() => {
  //   dataAPIManager.current?.setWishlist(user, wishlist);
  // }, [wishlist]);

  useEffect(() => {
    const ui = { ...item };
    delete ui.isFavourite;
    setSelectedItem(ui);
  }, [item]);

  const onModalShow = () => {
    setIsFav(false);
    if (item && selectedItem.id) {
      const wishlistDB = firebase
        .firestore()
        .collection(`users/${user.id}/wishlist`);
      wishlistDB
        .where('id', '==', selectedItem.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('wishlist item from firebase', data);
            if (data) {
              setIsFav(true);
            }
          });
        });
    }
  };

  const onSizeSelected = (index) => {
    const newSelectedItem = {
      ...selectedItem,
      selectedSizeIndex: index,
    };
    setSelectedItem(newSelectedItem);
  };

  const onColorSelected = (index) => {
    const newSelectedItem = {
      ...selectedItem,
      selectedColorIndex: index,
    };
    setSelectedItem(newSelectedItem);
  };

  const onShare = async () => {
    try {
      await Share.share({
        title: IMLocalized('Shopertino Product'),
        dialogTitle: IMLocalized(`Shopertino Product: ${selectedItem.name}`),
        message: selectedItem.description,
        url: selectedItem.photo,
      });
    } catch (error) {
      Sentry.captrueException(error);
      Alert.alert('Something went wrong. Please try again.');
    }
  };

  const addProductToBag = (productItem) => {
    const indexToUpdate = productPricesByQty.findIndex((shoppingBagProduct) => {
      return shoppingBagProduct.id === productItem.id;
    });
    let qty = 0;
    if (indexToUpdate !== -1 && !isNaN(productPricesByQty[indexToUpdate].qty)) {
      qty = productPricesByQty[indexToUpdate].qty + 1;
    } else {
      qty = 1;
    }
    productItem.quantity = qty;
    const newProductPriceByQty = {
      id: productItem.id,
      qty,
      totalPrice: Number(parseFloat(productItem.price) * qty),
    };

    updatePricesByQty(
      newProductPriceByQty,
      props.productPricesByQty,
      (pricesByQty) => {
        props.updateShoppingBag(productItem);
        props.setProductPricesAndQty(pricesByQty);
        onAddToBag(productItem);
      },
    );
  };

  if (!item) {
    return null;
  }

  return (
    <Modal
      isVisible={visible}
      onModalShow={onModalShow}
      hideModalContentWhileAnimating={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={styles.modalStyle}
      backdropOpacity={0.5}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}>
      <View style={styles.transparentContainer}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.viewContainer,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              marginLeft: 10,
              marginRight: 10,
              marginTop: '15%',
              marginBottom: 20,
              color: themeElementColor,
            }}>
            {selectedItem.name}
          </Text>

          {selectedItem.details && (
            <Swiper
              loop={false}
              activeDot={<View style={styles.activeDot} />}
              containerStyle={styles.swiperContainer}>
              {selectedItem.details.map((image, index) => (
                <View key={image} style={styles.imageBackgroundContainer}>
                  <Image
                    style={styles.imageBackground}
                    source={{ uri: image }}
                  />
                </View>
              ))}
            </Swiper>
          )}

          <Header
            onCancelPress={onCancelPress}
            setPinnedItemID={props.setPinnedItemID}
            setPinGiftsFor={props.setPinGiftsFor}
            headerContainerStyle={styles.headerContainerStyle}
            onSharePress={onShare}
            selectUser={selectUser}
            unPinGift={unPinGift}
          />

          <Favourite
            // onPress={() => onFavouritePress(selectedItem)}
            // isFavourite={selectedItem.isFavourite}
            onPress={() => toggleFav(selectedItem)}
            isFav={isFav}
            favouriteContainerStyle={styles.favouriteContainerStyle}
          />
          <View style={styles.descriptionContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(3),
                marginVertical: 10,
                color: themeElementColor,
              }}>{`${appConfig.currency}${selectedItem.price}`}</Text>
            <Text
              style={{ fontSize: RFPercentage(1.5), color: themeElementColor }}>
              {selectedItem.description}
            </Text>
            {/* <View style={styles.borderLine} /> */}
          </View>

          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '90%',
              marginTop: 20,
            }}>
            <ProductOptions
              item={selectedItem}
              onSizeSelected={onSizeSelected}
              onColorSelected={onColorSelected}
              optionContainerStyle={styles.optionContainerStyle}
            />
          </View>

          <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4AE0CD',
                borderRadius: 8,
                padding: 10,
                margin: 20,
                width: width * 0.8,
              }}
              onPress={() => addProductToBag(selectedItem)}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: RFPercentage(3),
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ProductDetailModal.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  onCancelPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  onAddToBag: PropTypes.func,
  shippingMethods: PropTypes.array,
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
    productPricesByQty: products.productPricesByQty,
    stripeCustomer: app.stripeCustomer,
    pinnedItemID: app.pinnedItemID,
    pinGiftsFor: app.pinGiftsFor,
    theme: app.theme,
  };
};

export default connect(mapStateToProps, {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
  setProductPricesAndQty,
  setPinnedItemID,
  setPinGiftsFor,
})(ProductDetailModal);
