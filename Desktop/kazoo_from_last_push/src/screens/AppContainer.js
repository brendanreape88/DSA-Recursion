import React, { useEffect } from 'react';
import stripe from 'tipsi-stripe';
import { GoogleSignin } from 'react-native-google-signin';
import RootNavigator from '../navigators/RootNavigator';
import AppConfig from '../ShopertinoConfig';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/dynamic-links';
import { setReferringUserId } from '../redux/reducers/app';
import { useDispatch } from 'react-redux';

stripe.setOptions({
  publishableKey: AppConfig.stripeConfig.PUBLISHABLE_KEY,
  merchantId: AppConfig.stripeConfig.MERCHANT_ID,
  androidPayMode: AppConfig.stripeConfig.ANDROID_PAYMENT_MODE,
});
GoogleSignin.configure({
  scopes: AppConfig.GOOGLE_SIGNIN_CONFIG.SCOPES,
  webClientId: AppConfig.GOOGLE_SIGNIN_CONFIG.WEB_CLIENT_ID,
  offlineAccess: AppConfig.GOOGLE_SIGNIN_CONFIG.OFFLINE_ACCESS,
});

const AppContainer = () => {
  const dispatch = useDispatch();

  const handleDynamicLink = (link) => {
    try {
      var referringUserId = link.substr(24, 28);
      dispatch(setReferringUserId(referringUserId));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(
        "We could not determine which user sent you a referral link. If you'd like to be automatically connected with this user, please try clicking the link again.",
      );
    }
  };

  const subscribeHandleDynamicLink = () => {
    const unsubscribe = firebase.dynamicLinks().onLink((link) => {
      if (link) {
        handleDynamicLink(link.url);
      }
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    subscribeHandleDynamicLink();
    firebase
      .dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          handleDynamicLink(link.url);
        }
      });
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
