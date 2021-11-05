import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Button from 'react-native-button';
import { connect, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import { localizedErrorMessage } from '../utils/ErrorCode';
import kazooLogo from '../../../../assets/images/kazoo-logo.png';
import loginBackground from '../../../../assets/images/login-background.jpeg';

const LoginScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const authManager = props.route.params.authManager;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableShift, setEnableShift] = useState(false);
  const appStyles = props.route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { height, width } = Dimensions.get('window');

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(
        email && email.trim(),
        password && password.trim(),
        appConfig,
      )
      .then((response) => {
        if (response?.user) {
          const user = response.user;
          props.setUserData({
            user: response.user,
          });
          Keyboard.dismiss();
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user: user } }],
          });
        } else {
          setLoading(false);
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      });
  };

  const onFBButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithFacebook(appConfig).then((response) => {
      if (response?.user) {
        const user = response.user;
        props.setUserData({
          user: response.user,
        });
        Keyboard.dismiss();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }],
        });
      } else {
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  const onAppleButtonPress = async () => {
    setLoading(true);
    authManager.loginOrSignUpWithApple(appConfig).then((response) => {
      if (response?.user) {
        const user = response.user;
        props.setUserData({ user });
        Keyboard.dismiss();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }],
        });
      } else {
        setLoading(false);
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  const onForgotPassword = async () => {
    props.navigation.push('ResetPassword', {
      isResetPassword: true,
      appStyles,
      appConfig,
    });
  };

  let passwordInput;

  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useRef({});

  useEffect(() => {
    const tryToLoginFirst = async () => {
      authManager
        .retrievePersistedAuthUser(appConfig)
        .then((response) => {
          if (response?.user) {
            const user = response.user;
            props.setUserData({
              user: response.user,
            });
            Keyboard.dismiss();
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'MainStack', params: { user: user } }],
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    };
    tryToLoginFirst();
  }, [appConfig, appStyles, authManager, props]);

  useEffect(() => {
    currentUser.current = props.user;
  }, [props.user]);

  if (isLoading === true) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }

  return (
    <ImageBackground
      source={loginBackground}
      style={{ height: height, width: width }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingBottom: 10,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled={enableShift}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.keboardContainer}
            keyboardShouldPersistTaps="always">
            <View style={appStyles.styleSet.backArrowStyle} />
            <View style={styles.logoContainer}>
              <Image source={kazooLogo} style={styles.logo} />
            </View>
            <Text style={{ color: themeElementColor, ...styles.title }}>
              {IMLocalized('Welcome')}
            </Text>
            <TextInput
              style={{
                backgroundColor: 'transparent',
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('E-mail')}
              placeholderTextColor={themeElementColor}
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{
                backgroundColor: 'transparent',
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholderTextColor={themeElementColor}
              secureTextEntry
              placeholder={IMLocalized('Password')}
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              ref={(input) => {
                passwordInput = input;
              }}
              blurOnSubmit={false}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordText}
                onPress={() => onForgotPassword()}>
                {IMLocalized('Forgot password?')}
              </Button>
            </View>
            <Button
              containerStyle={styles.loginContainer}
              style={styles.loginText}
              onPress={() => onPressLogin()}>
              {IMLocalized('Login')}
            </Button>
            <View style={styles.dividerContainer}>
              <View style={styles.leftLine} />
              <Text style={styles.dividerText}>Not a Member?</Text>
              <View style={styles.rightLine} />
            </View>
            <Button
              containerStyle={styles.signupContainer}
              style={styles.signupText}
              onPress={() => {
                appConfig.isSMSAuthEnabled
                  ? props.navigation.navigate('LoginStack', {
                      screen: 'Sms',
                      params: {
                        isSigningUp: true,
                        appStyles,
                        appConfig,
                        authManager,
                      },
                    })
                  : props.navigation.navigate('LoginStack', {
                      screen: 'Signup',
                      params: {
                        appStyles,
                        appConfig,
                        authManager,
                      },
                    });
              }}>
              {IMLocalized('Create Account')}
            </Button>
            {loading && <TNActivityIndicator appStyles={appStyles} />}
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default connect(null, { setUserData })(LoginScreen);
