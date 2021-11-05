import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import * as Sentry from '@sentry/react-native';
import { ErrorCode } from '../onboarding/utils/ErrorCode';
import { firebase } from './config';
import { firebase as RNFBAuth } from '@react-native-firebase/auth';
import AppConfig from '../../ShopertinoConfig';

const usersRef = firebase.firestore().collection('users');

const handleUserFromAuthStateChanged = (user, resolve) => {
  if (user) {
    usersPrivateRef
      .doc(user.uid)
      .get()
      .then((document) => {
        const userData = document.data();
        resolve({ ...userData, id: user.uid, userID: user.uid });
      })
      .catch((error) => {
        resolve(null);
      });
  } else {
    resolve(null);
  }
};

export const tryAlternatePersistedAuthUserRetriever = (resolve) => {
  RNFBAuth.auth().onAuthStateChanged((user) => {
    if (user) {
      return handleUserFromAuthStateChanged(user, resolve);
    } else {
      resolve(null);
    }
  });
};

export const retrievePersistedAuthUser = () => {
  return new Promise((resolve) => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return handleUserFromAuthStateChanged(user, resolve);
      } else {
        return tryAlternatePersistedAuthUserRetriever(resolve);
      }
    });
  });
};

export const sendPasswordResetEmail = (email) => {
  firebase.auth().sendPasswordResetEmail(email);
};

const signInWithCredential = (AuthManager, credential, appIdentifier) => {
  return new Promise((resolve, _reject) => {
    AuthManager.auth()
      .signInWithCredential(credential)
      .then((response) => {
        const isNewUser = response.additionalUserInfo.isNewUser;
        const { first_name, last_name } = response.additionalUserInfo.profile;
        const {
          uid,
          email,
          birthdate,
          birthMonth,
          birthDay,
          birthYear,
          photoURL,
        } = response.user;
        const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

        if (isNewUser) {
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const userData = {
            id: uid,
            email: email || '',
            firstName: first_name || '',
            lastName: last_name || '',
            // phone: phoneNumber || '',
            //phoneNumber: phoneNumber || '',
            birthdate: birthdate || '',
            birthMonth: birthMonth || '',
            birthDay: birthDay || '',
            birthYear: birthYear || '',
            profilePictureURL: photoURL || defaultProfilePhotoURL,
            userID: uid,
            appIdentifier,
            createdAt: timestamp,
          };
          console.log('NEW USER');
          usersRef
            .doc(uid)
            .set(userData)
            .then(() => {
              resolve({
                user: { ...userData, id: uid, userID: uid },
                accountCreated: true,
              });
            });
        }
        usersRef
          .doc(uid)
          .get()
          .then((document) => {
            const userData = document.data();
            resolve({
              user: { ...userData, id: uid, userID: uid },
              accountCreated: false,
            });
          });
      })
      .catch((_error) => {
        Sentry.captureException(_error);
        resolve({ error: ErrorCode.serverError });
      });
  });
};

export const register = async (userDetails, address, appIdentifier) => {
  const {
    email,
    firstName,
    lastName,
    password,
    phone,
    //phoneNumber,
    birthdate,
    birthMonth,
    birthDay,
    birthYear,
    profilePictureURL,
    location,
    signUpLocation,
  } = userDetails;

  try {
    var response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const uid = response.user.uid;

    const userData = {
      id: uid,
      userID: uid, // legacy reasons
      email,
      firstName,
      lastName,
      birthdate,
      birthMonth,
      birthDay,
      birthYear,
      phone: phone || '',
      //phoneNumber: phoneNumber || '',
      profilePictureURL,
      location: location || '',
      signUpLocation: signUpLocation || '',
      appIdentifier,
      createdAt: timestamp,
    };

    const publicUserData = {
      id: uid,
      firstName: firstName,
      lastName: lastName,
      birthdate: birthdate,
      birthMonth: birthMonth,
      birthDay: birthDay,
      profilePictureURL: profilePictureURL,
      userID: uid,
    };

    const friendDoc = {
      id: uid,
      userID: uid, // legacy reasons
      firstName,
      lastName,
      birthdate,
      birthMonth,
      birthDay,
      profilePictureURL,
      lastPost: null,
      recentPosts: [],
      friends: [uid],
    };

    const kazooCashDoc = {
      balance: 0,
    };

    // Update both private and public profile, address, and friends in batch
    const batch = firebase.firestore().batch();
    const publicRef = usersRef.doc(uid);
    const addressRef = publicRef
      .collection(AppConfig.FIREBASE_COLLECTIONS.ADDRESSES)
      .doc();
    const kazooCashRef = publicRef
      .collection(AppConfig.FIREBASE_COLLECTIONS.KAZOO_CASH)
      .doc(uid);
    const privateRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS_PRIVATE)
      .doc(uid);
    const friendRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.FRIENDS)
      .doc(uid);
    batch.set(privateRef, userData);
    batch.set(publicRef, publicUserData);
    batch.set(friendRef, friendDoc);
    batch.set(addressRef, address);
    batch.set(kazooCashRef, kazooCashDoc);
    await batch.commit();

    return { user: userData };
  } catch (error) {
    var errorCode = ErrorCode.serverError;
    if (error.code === 'auth/email-already-in-use') {
      errorCode = ErrorCode.emailInUse;
    } else {
      Sentry.captureException(error);
    }
    return { error: errorCode };
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  return new Promise(function (resolve, reject) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;

        const userData = {
          email,
          id: uid,
        };
        usersPrivateRef
          .doc(uid)
          .get()
          .then(function (firestoreDocument) {
            if (!firestoreDocument.exists) {
              resolve({ errorCode: ErrorCode.noUser });
              return;
            }
            const user = firestoreDocument.data();
            const newUserData = {
              ...userData,
              ...user,
            };
            resolve({ user: newUserData });
          })
          .catch(function (_error) {
            Sentry.captureException(_error);
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch((error) => {
        var errorCode = ErrorCode.serverError;
        switch (error.code) {
          case 'auth/wrong-password':
            errorCode = ErrorCode.invalidPassword;
            break;
          case 'auth/network-request-failed':
            errorCode = ErrorCode.serverError;
            break;
          case 'auth/user-not-found':
            errorCode = ErrorCode.noUser;
            break;
          default:
            Sentry.captureException(error);
            errorCode = ErrorCode.serverError;
        }
        resolve({ error: errorCode });
      });
  });
};

export const loginWithApple = (identityToken, nonce, appIdentifier) => {
  const appleCredential = RNFBAuth.auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  return new Promise((resolve, _reject) => {
    signInWithCredential(RNFBAuth, appleCredential, appIdentifier).then(
      (response) => {
        resolve(response);
      },
    );
  });
};

export const loginWithFacebook = (accessToken, appIdentifier) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

  return new Promise((resolve, _reject) => {
    signInWithCredential(firebase, credential, appIdentifier).then(
      (response) => {
        resolve(response);
      },
    );
  });
};

export const logout = () => {
  firebase.auth().signOut();
  RNFBAuth.auth().signOut();
};

export const onVerificationChanged = (phone) => {
  auth()
    .verifyPhoneNumber(phone)
    .on(
      'state_changed',
      (phoneAuthSnapshot) => {
        console.log('State: ', phoneAuthSnapshot.state);
      },
      (error) => {
        console.error(error);
      },
      (phoneAuthSnapshot) => {
        console.log(phoneAuthSnapshot);
      },
    );
};

export const retrieveUserByPhone = (phone) => {
  return new Promise((resolve) => {
    usersRef.where('phone', '==', phone).onSnapshot((querySnapshot) => {
      if (querySnapshot.docs.length <= 0) {
        resolve({ error: true });
      } else {
        resolve({ success: true });
      }
    });
  });
};

export const sendSMSToPhoneNumber = (phoneNumber, captchaVerifier) => {
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, captchaVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        resolve({ confirmationResult });
      })
      .catch(function (_error) {
        resolve({ error: ErrorCode.smsNotSent });
      });
  });
};

export const loginWithSMSCode = (smsCode, verificationID) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationID,
    smsCode,
  );
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        const { user } = result;
        usersRef
          .doc(user.uid)
          .get()
          .then(function (firestoreDocument) {
            if (!firestoreDocument.exists) {
              resolve({ errorCode: ErrorCode.noUser });
              return;
            }
            const userData = firestoreDocument.data();
            resolve({ user: userData });
          })
          .catch(function (_error) {
            resolve({ error: ErrorCode.serverError });
          });
      })
      .catch((_error) => {
        resolve({ error: ErrorCode.invalidSMSCode });
      });
  });
};

export const registerWithPhoneNumber = (
  userDetails,
  smsCode,
  verificationID,
  appIdentifier,
) => {
  const {
    firstName,
    lastName,
    birthdate,
    birthMonth,
    birthDay,
    birthYear,
    phone,
    profilePictureURL,
    location,
    signUpLocation,
  } = userDetails;
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationID,
    smsCode,
  );
  return new Promise(function (resolve, _reject) {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const uid = response.user.uid;
        const data = {
          id: uid,
          userID: uid, // legacy reasons
          firstName,
          lastName,
          birthdate,
          birthMonth,
          birthDay,
          birthYear,
          phone,
          profilePictureURL,
          location: location || '',
          signUpLocation: signUpLocation || '',
          appIdentifier,
          createdAt: timestamp,
        };
        console.log('REGISTER W PHONE NUMBER');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            resolve({ user: data });
          });
      })
      .catch((error) => {
        var errorCode = ErrorCode.serverError;
        if (error.code === 'auth/email-already-in-use') {
          errorCode = ErrorCode.emailInUse;
        } else {
          Sentry.captureException(error);
        }
        resolve({ error: errorCode });
      });
  });
};

export const updateProfilePhoto = async (userID, profilePictureURL) => {
  try {
    await usersRef.doc(userID).update({ profilePictureURL: profilePictureURL });
    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { error: error };
  }
};

export const fetchAndStorePushTokenIfPossible = async (user) => {
  console.log('fetch and store push token if possible');
  try {
    const settings = await messaging().requestPermission();
    if (settings) {
      const token = await messaging().getToken();
      updateUser(user.id || user.userID, {
        pushToken: token,
        badgeCount: 0,
      });
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

const usersPrivateRef = firebase.firestore().collection('users_private');

export const updateUser = async (userID, newData) => {
  const dataWithOnlineStatus = {
    ...newData,
    // lastOnlineTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  console.log('UPDATE USER IN DB');
  return await usersPrivateRef
    .doc(userID)
    .set({ ...dataWithOnlineStatus }, { merge: true });
};

export const getUserByID = async (userID) => {
  try {
    const document = await usersRef.doc(userID).get();
    if (document) {
      return document.data();
    }
    return null;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};
