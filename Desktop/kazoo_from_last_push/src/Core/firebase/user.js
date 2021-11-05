import * as Sentry from '@sentry/react-native';
import { firebase } from './config';

export const usersRef = firebase.firestore().collection('users');

export const getUserData = async (userId) => {
  try {
    const user = await usersRef.doc(userId).get();

    return { data: { ...user.data(), id: user.id }, success: true };
  } catch (error) {
    Sentry.captureException(error);
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    };
  }
};

const usersPrivateRef = firebase.firestore().collection('users_private');

export const updateUserData = async (userId, userData) => {
  console.log('updating users_private with:', userData);
  try {
    const usersPRef = usersPrivateRef.doc(userId);
    await usersPRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { error, success: false };
  }
};

export const subscribeUsers = (callback) => {
  return usersRef.onSnapshot((querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return callback(users);
  });
};

export const subscribeCurrentUser = (userId, callback) => {
  const ref = usersRef
    .where('id', '==', userId)
    .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (docs.length > 0) {
        callback(docs[0].data());
      }
    });
  return ref;
};