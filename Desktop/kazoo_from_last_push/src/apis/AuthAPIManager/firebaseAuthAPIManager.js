import { firebaseStorage } from '../../Core/firebase';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import * as Sentry from '@sentry/react-native';
import * as Facebook from 'expo-facebook';
import { firebaseAuth, firebaseUser } from '../../Core/firebase';
import PaymentRequestAPI from '../../Core/payment/api';
import { ErrorCode } from '../../Core/onboarding/utils/ErrorCode';

const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

const loginWithEmailAndPassword = async (email, password, appConfig) => {
  const response = await firebaseAuth.loginWithEmailAndPassword(
    email,
    password,
  );
  if (!response.error) {
    const res = await handleSuccessfulLogin({ ...response.user }, false);
    // Login successful, push token stored, login credential persisted, so we log the user in.

    // handle no stripeCustomerId
    if (!res.user.stripeCustomer) {
      const stripeCustomer = await createStripeCustomer(
        // res.user.email,
        email,
        appConfig,
      );

      if (stripeCustomer) {
        await firebaseUser.updateUserData(res.user.id, {
          stripeCustomer,
        });
        res.user.stripeCustomer = stripeCustomer;
      }
    }

    return { user: res.user };
  } else {
    return { error: response.error };
  }
};

const createAccountWithEmailAndPassword = async (
  userDetails,
  address,
  appConfig,
) => {
  const { photoFile } = userDetails;
  try {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    };
    const userEmail = userData.email;
    const response = await firebaseAuth.register(
      userData,
      address,
      appConfig.appIdentifier,
    );

    if (response.error) {
      return { error: response.error };
    } else {
      // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
      let user = response.user;
      const stripeCustomer = await createStripeCustomer(
        // userDetails.email,
        userEmail,
        appConfig,
      );
      if (stripeCustomer) {
        user.stripeCustomer = stripeCustomer;
        await firebaseUser.updateUserData(user.id, {
          stripeCustomer,
        });
      }
      if (photoFile) {
        const photoResponse = await firebaseStorage.uploadFile(photoFile);
        if (photoResponse.error) {
          // if account gets created, but photo upload fails, we still log the user in
          user = {
            ...user,
            profilePictureURL: defaultProfilePhotoURL,
          };
        } else {
          await firebaseAuth.updateProfilePhoto(
            user.id,
            photoResponse.downloadURL,
          );
          user = {
            ...user,
            profilePictureURL: photoResponse.downloadURL,
          };
        }
      } else {
        user = {
          ...response.user,
          profilePictureURL: defaultProfilePhotoURL,
        };
      }
      const loginResponse = await handleSuccessfulLogin(user, true);
      return {
        ...loginResponse,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    return { error: ErrorCode.serverError };
  }
};

const retrievePersistedAuthUser = () => {
  return new Promise((resolve) => {
    firebaseAuth.retrievePersistedAuthUser().then((user) => {
      if (user) {
        handleSuccessfulLogin(user, false).then((res) => {
          // Persisted login successful, push token stored, login credential persisted, so we log the user in.peCustomer =
          resolve({
            user: res.user,
          });
        });
      } else {
        resolve(null);
      }
    });
  });
};

const onVerification = (phone) => {
  firebaseAuth.onVerificationChanged(phone);
};

const sendPasswordResetEmail = (email) => {
  return new Promise((resolve) => {
    firebaseAuth.sendPasswordResetEmail(email);
    resolve();
  });
};

const logout = (user) => {
  const userData = {
    //...user,
    // isOnline: false,
  };
  firebaseAuth.updateUser(user.id || user.userID, userData);
  firebaseAuth.logout();
};

const loginOrSignUpWithApple = (appConfig) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      firebaseAuth
        .loginWithApple(identityToken, nonce, appConfig.appIdentifier)
        .then(async (response) => {
          if (response?.user) {
            const newResponse = {
              user: { ...response.user },
              accountCreated: response.accountCreated,
            };
            handleSuccessfulLogin(
              newResponse.user,
              response.accountCreated,
            ).then(async (res) => {
              if (!res?.user?.stripeCustomer) {
                const stripeCustomer = await createStripeCustomer(
                  res?.user?.email,
                  appConfig,
                );

                if (stripeCustomer) {
                  firebaseUser.updateUserData(response.user.id, {
                    stripeCustomer,
                  });
                  response.user.stripeCustomer = stripeCustomer;
                }
              }
              // resolve(response);
              resolve({
                ...response,
              });
            });
          } else {
            resolve({ error: ErrorCode.appleAuthFailed });
          }
        });
    } catch (error) {
      Sentry.captureException(error);
      resolve({ error: ErrorCode.appleAuthFailed });
    }
  });
};

const createStripeCustomer = async (email, appConfig) => {
  const paymentRequestAPI = new PaymentRequestAPI(appConfig);

  const stripeCustomer = await paymentRequestAPI.createStripeCustomer(email);

  if (stripeCustomer.success) {
    return stripeCustomer.data.customer.id;
  }

  return false;
};

const loginOrSignUpWithFacebook = (appConfig) => {
  Facebook.initializeAsync(appConfig.facebookIdentifier);

  return new Promise(async (resolve, _reject) => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        firebaseAuth
          .loginWithFacebook(token, appConfig.appIdentifier)
          .then(async (response) => {
            if (response?.user) {
              const newResponse = {
                user: { ...response.user },
                accountCreated: response.accountCreated,
              };
              const stripeCustomer = await createStripeCustomer(
                response?.user?.email,
                appConfig,
              );
              if (stripeCustomer) {
                newResponse.user.stripeCustomer = stripeCustomer;
                firebaseUser.updateUserData(response.user.id, {
                  stripeCustomer,
                });
              }
              handleSuccessfulLogin(
                newResponse.user,
                response.accountCreated,
              ).then((res) => {
                // resolve(response);
                resolve({
                  ...res,
                });
              });
            } else {
              resolve({ error: ErrorCode.fbAuthFailed });
            }
          });
      } else {
        resolve({ error: ErrorCode.fbAuthCancelled });
      }
    } catch (error) {
      Sentry.captureException(error);
      resolve({ error: ErrorCode.fbAuthFailed });
    }
  });
};

const retrieveUserByPhone = (phone) => {
  return firebaseAuth.retrieveUserByPhone(phone);
};

const sendSMSToPhoneNumber = (phoneNumber, captchaVerifier) => {
  return firebaseAuth.sendSMSToPhoneNumber(phoneNumber, captchaVerifier);
};

const loginWithSMSCode = (smsCode, verificationID) => {
  return new Promise(function (resolve, _reject) {
    firebaseAuth.loginWithSMSCode(smsCode, verificationID).then((res) => {
      if (res.error) {
        resolve({ error: res.error });
      } else {
        // successful phone number login, we fetch the push token
        handleSuccessfulLogin(res.user, false).then((response) => {
          resolve(response);
        });
      }
    });
  });
};

const registerWithPhoneNumber = (
  userDetails,
  smsCode,
  verificationID,
  appIdentifier,
) => {
  const { photoFile } = userDetails;
  const accountCreationTask = (userData) => {
    return new Promise(function (resolve, _reject) {
      firebaseAuth
        .registerWithPhoneNumber(
          userData,
          smsCode,
          verificationID,
          appIdentifier,
        )
        .then((response) => {
          if (response.error) {
            resolve({ error: response.error });
          } else {
            // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
            let user = response.user;
            if (photoFile) {
              firebaseStorage.uploadFile(photoFile).then((res) => {
                if (res.error) {
                  // if account gets created, but photo upload fails, we still log the user in
                  resolve({
                    nonCriticalError: response.error,
                    user: {
                      ...user,
                      profilePictureURL: defaultProfilePhotoURL,
                    },
                  });
                } else {
                  firebaseAuth
                    .updateProfilePhoto(user.id, response.downloadURL)
                    .then((_res) => {
                      resolve({
                        user: {
                          ...user,
                          profilePictureURL: response.downloadURL,
                        },
                      });
                    });
                }
              });
            } else {
              resolve({
                user: {
                  ...response.user,
                  profilePictureURL: defaultProfilePhotoURL,
                },
              });
            }
          }
        });
    });
  };

  return new Promise(function (resolve, _reject) {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    };
    accountCreationTask(userData).then((res) => {
      if (res.error) {
        resolve({ error: res.error });
      } else {
        handleSuccessfulLogin(res.user, true).then((response) => {
          resolve(response);
        });
      }
    });
  });
};

const handleSuccessfulLogin = async (user, accountCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  fetchAndStoreExtraInfoUponLogin(user, accountCreated);
  return { user: { ...user } };
};

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
  firebaseAuth.fetchAndStorePushTokenIfPossible(user);

  // getCurrentLocation(Geolocation).then(async (location) => {
  //   const latitude = location.coords.latitude;
  //   const longitude = location.coords.longitude;
  //   var locationData = {};
  //   if (location) {
  //     locationData = {
  //       location: {
  //         latitude: latitude,
  //         longitude: longitude,
  //       },
  //     };
  //     if (accountCreated) {
  //       locationData = {
  //         ...locationData,
  //         signUpLocation: {
  //           latitude: latitude,
  //           longitude: longitude,
  //         },
  //       };
  //     }
  //   }

  const userData = {
    // ...locationData,
    // isOnline: true,
  };

  firebaseAuth.updateUser(user.id || user.userID, userData);
  // });
};

// const getCurrentLocation = (geolocation) => {
//   return new Promise(async (resolve) => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       resolve({ coords: { latitude: '', longitude: '' } });
//       return;
//     }

//     geolocation.getCurrentPosition(
//       (location) => {
//         console.log(location);
//         resolve(location);
//       },
//       (error) => {
//         console.log(error);
//       },
//     );

//     // setRegion(location.coords);
//     // onLocationChange(location.coords);

//     // geolocation.getCurrentPosition(
//     //     resolve,
//     //     () => resolve({ coords: { latitude: "", longitude: "" } }),
//     //     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
//     // );
//   });
// };

const authManager = {
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  createAccountWithEmailAndPassword,
  loginOrSignUpWithApple,
  loginOrSignUpWithFacebook,
  sendSMSToPhoneNumber,
  loginWithSMSCode,
  registerWithPhoneNumber,
  retrieveUserByPhone,
  onVerification,
};

export default authManager;
