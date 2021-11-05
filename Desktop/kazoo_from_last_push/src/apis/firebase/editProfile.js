import * as Sentry from '@sentry/react-native';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

export const setUserProfile = async (userId, userData) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId);

    userRef.update({
      ...userData,
    });
  } catch (error) {
    Sentry.captureException(error);
    return { error, success: false };
  }
};
