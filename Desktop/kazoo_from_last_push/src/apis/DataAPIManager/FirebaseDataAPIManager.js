import { Alert } from 'react-native';
import { firebaseDataManager } from '../firebase';
import PaymentMethodDataManager from '../../Core/firebase/paymentMethods';
import { IMLocalized } from '../../Core/localization/IMLocalization';

export default class {
  constructor(appConfig) {
    this.unsubscribeProducts = null;
    this.unsubscribeCategories = null;
    this.unsubscribePaymentMethods = null;
    this.unsubscribeShippingMethods = null;
    this.unsubscribeOrders = null;
    this.products = [];
    this.categories = [];
    this.paymentMethods = [];
    this.shippingMethods = [];
    this.paymentMethodDataManager = new PaymentMethodDataManager(appConfig);
  }

  unsubscribe() {
    this.unsubscribeProducts && this.unsubscribeProducts();
    this.unsubscribeCategories && this.unsubscribeCategories();
    this.unsubscribePaymentMethods && this.unsubscribePaymentMethods();
    this.unsubscribeShippingMethods && this.unsubscribeShippingMethods();
    this.unsubscribeOrders && this.unsubscribeOrders();
  }

  loadShopData(callback) {
    this.unsubscribeProducts = firebaseDataManager.subscribeProducts((data) => {
      this.products = data;
      callback &&
        callback({ products: this.products, categories: this.categories });
    });

    this.unsubscribeCategories = firebaseDataManager.subscribeCategories(
      (data) => {
        this.categories = data;
        callback &&
          callback({ products: this.products, categories: this.categories });
      },
    );
  }

  setWishlist(user, wishlist) {
    firebaseDataManager.setUserWishList(user.id, wishlist);
  }

  loadPaymentMethod(user, callback) {
    this.unsubscribePaymentMethods = this.paymentMethodDataManager.subscribePaymentMethods(
      user.id,
      (data) => {
        this.paymentMethods = data;
        callback &&
          callback({
            paymentMethods: this.paymentMethods,
            shippingMethods: this.shippingMethods,
          });
      },
    );

    this.unsubscribeShippingMethods = firebaseDataManager.subscribeShippingMethods(
      (data) => {
        this.shippingMethods = data;
        callback &&
          callback({
            paymentMethods: this.paymentMethods,
            shippingMethods: this.shippingMethods,
          });
      },
    );
  }

  async onUpdatePaymentMethod(props, token, source, callback) {
    if (source.success && source.data && source.data.response) {
      await this.paymentMethodDataManager.updateUserPaymentMethods({
        ownerId: props.user.id,
        card: token.card,
      });
      await this.paymentMethodDataManager.savePaymentSource(
        props.user.id,
        source.data.response,
      );
      callback();
    } else {
      Alert.alert(IMLocalized('An error occured, please try again.'));
    }
  }

  async onRemoveFromPaymentMethods(method, callback) {
    await this.paymentMethodDataManager.deleteFromUserPaymentMethods(
      method.cardId,
    );
    callback();
  }

  storeUserShippAddress(props, address) {
    firebaseDataManager.setUserShippingAddress(props.user.id, address);
  }

  onUpdateUser(props, userData) {
    const user = { ...props.user, ...userData };

    firebaseDataManager.setUserProfile(props.user.id, userData);

    props.setUserData({
      user: { ...user, stripeCustomer: props.stripeCustomer },
    });

    props.navigation.goBack();
  }

  loadOrder(user, callback) {
    this.unsubscribeOrders = firebaseDataManager.subscribeOrders(
      user.id,
      callback,
    );
  }

  onShoppingBagContinuePress(
    props,
    appConfig,
    callback,
    sendAsGift,
    purchaseFromWishlistID,
  ) {
    if (props.shoppingBag.length < 1) {
      return;
    }
    props.setSubtotalPrice(Number(props.totalShoppinBagPrice));

    if (!props.stripeCustomer) {
      Alert.alert(
        IMLocalized('Oops! We are unable to continue this order.'),
        IMLocalized(
          'An unknown error occured and ur account will be logged out. Afterwards, Kindly login and try again.',
        ),
        [
          {
            text: 'Ok',
            onPress: () => callback && callback(),
          },
        ],
        { cancelable: true },
      );

      return;
    }

    if (sendAsGift) {
      props.navigation.navigate('Select Recipient', {
        appConfig,
        sendAsGift,
        sendGiftTo: purchaseFromWishlistID,
        type: 'send as gift',
      });
    } else {
      props.navigation.navigate('PaymentMethod', {
        appConfig,
        sendAsGift,
      });
    }
  }

  logout() {
    firebaseDataManager.logout();
  }
}
