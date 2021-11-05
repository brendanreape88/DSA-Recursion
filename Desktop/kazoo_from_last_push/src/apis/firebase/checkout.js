import * as Sentry from '@sentry/react-native';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

export const savePaymentCharge = async (userId, charge) => {
  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.STRIPE_CUSTOMERS)
      .doc(userId)
      .collection(AppConfig.FIREBASE_COLLECTIONS.CHARGES)
      .add(charge);

    return { ...response, success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { error, success: false };
  }
};

export const updateOrders = async (order, amount) => {
  const newOrder = {
    ...order,
    kazooCash: amount,
  };

  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.ORDERS)
      .add(JSON.parse(JSON.stringify(newOrder)));

    return { ...response, success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { error, success: false };
  }
};
