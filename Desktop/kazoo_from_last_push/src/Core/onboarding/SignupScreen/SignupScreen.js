import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect, useSelector } from 'react-redux';
import { localizedErrorMessage } from '../utils/ErrorCode';
import kazooLogo from '../../../../assets/images/kazoo-logo.png';

const SignupScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const appStyles = props.route.params.appStyles;
  const authManager = props.route.params.authManager;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [prefix, setPrefix] = useState('');
  const [lineNumber, setLineNumber] = useState('');
  const [addressL1, setAddressL1] = useState('');
  const [addressL2, setAddressL2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [enableShift, setEnableShift] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextClicked, setNextClicked] = useState(0);
  const { width, height } = Dimensions.get('window');

  const resetEnableShift = () => {
    setEnableShift(false);
  };

  const validateEmail = (text) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(text).toLowerCase()) ? true : false;
  };

  const validateFirstName = (text) => {
    return text !== '' ? true : false;
  };

  const validateLastName = (text) => {
    return text !== '' ? true : false;
  };

  const validateBirthMonth = (text) => {
    return text !== '' ? true : false;
  };

  const validateBirthDay = (text) => {
    return text !== '' ? true : false;
  };

  const validateAreaCode = (text) => {
    return text.length === 3 ? true : false;
  };

  const validatePrefix = (text) => {
    return text.length === 3 ? true : false;
  };

  const validateLineNumber = (text) => {
    return text.length === 4 ? true : false;
  };

  const validateAddressL1 = (text) => {
    return text !== '' ? true : false;
  };

  const validateCity = (text) => {
    return text !== '' ? true : false;
  };

  const validateState = (text) => {
    return text !== '' ? true : false;
  };

  const validateZipCode = (text) => {
    return text !== '' ? true : false;
  };

  const onClickNext = () => {
    if (!validateLastName(lastName?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your last name.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateFirstName(firstName?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your first name.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateEmail(email?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a valid email address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (password?.trim() == '') {
      Alert.alert(
        '',
        IMLocalized('Password cannot be empty.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      setPassword('');
      return;
    }

    if (password?.trim()?.length < 6) {
      Alert.alert(
        '',
        IMLocalized(
          'Password is too short. Please use at least 6 characters for security reasons.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      setPassword('');
      return;
    }

    if (confirmPassword !== password) {
      Alert.alert(
        '',
        IMLocalized('Passwords do not match.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      setPassword('');
      setConfirmPassword('');
      return;
    }

    resetEnableShift();
    setNextClicked(1);
  };

  const onContinueToAddress = () => {
    if (!validateBirthDay(day?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your birth day.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateBirthMonth(month?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your birth month.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateLineNumber(lineNumber?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your phone number.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validatePrefix(prefix?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your phone number.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateAreaCode(areaCode?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter your phone number.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    resetEnableShift();
    setNextClicked(2);
  };

  const onRegister = async () => {
    if (!validateAddressL1(addressL1?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a shipping address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateCity(city?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a shipping address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateState(state?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a shipping address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateState(state?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a shipping address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    if (!validateZipCode(zipCode?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a shipping address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    setLoading(true);

    const formattedBirthMonth = month.length === 1 ? `0${month}` : month;
    const formattedBirthDay = day.length === 1 ? `0${day}` : day;

    const userDetails = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: email && email.trim(),
      password: password && password.trim(),
      birthdate: formattedBirthMonth + formattedBirthDay + year,
      birthMonth: formattedBirthMonth,
      birthDay: formattedBirthDay,
      birthYear: year?.trim(),
      phoneNumber: areaCode + prefix + lineNumber,
      phone: areaCode + prefix + lineNumber,
      photoFile: profilePictureFile,
      appIdentifier: appConfig.appIdentifier,
    };
    const address = {
      addressName: 'Home',
      addressL1: addressL1,
      addressL2: addressL2,
      city: city,
      state: state,
      zipCode: zipCode,
      shippingAddress: true,
    };
    const response = await authManager.createAccountWithEmailAndPassword(
      userDetails,
      address,
      appConfig,
    );
    const user = response.user;

    if (user) {
      props.setUserData({
        user: response.user,
      });
      Keyboard.dismiss();
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainStack',
            params: { user: user },
          },
        ],
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
  };

  let lastNameInput;
  let emailInput;
  let passwordInput;
  let confirmPasswordInput;

  const onClickOutideKeyboard = () => {
    Keyboard.dismiss();
    setEnableShift(false);
  };

  const renderSignupWithEmail = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onClickOutideKeyboard()}
        accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled={enableShift}>
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('First Name')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            underlineColorAndroid="transparent"
            onFocus={() => setEnableShift(false)}
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('Last Name')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            underlineColorAndroid="transparent"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            ref={(input) => {
              lastNameInput = input;
            }}
            onSubmitEditing={() => {
              emailInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('E-mail Address')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            keyboardType="email-address"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            ref={(input) => {
              emailInput = input;
            }}
            onSubmitEditing={() => {
              passwordInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('Password')}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            ref={(input) => {
              passwordInput = input;
            }}
            onSubmitEditing={() => {
              confirmPasswordInput.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('Confirm Password')}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onFocus={() => setEnableShift(true)}
            ref={(input) => {
              confirmPasswordInput = input;
            }}
            blurOnSubmit={false}
          />
          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => onClickNext()}>
            {IMLocalized('Next')}
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };

  let birthDayInput;
  let areaCodeInput;
  let prefixInput;
  let lineNumberInput;

  const renderEnterBirthDate = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onClickOutideKeyboard()}
        accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled={enableShift}>
          {!enableShift && (
            <Text style={{ color: themeElementColor, ...styles.birthDate }}>
              Please enter your birthdate and phone number.
            </Text>
          )}
          <Text style={{ marginLeft: '10%', marginBottom: 5 }}>Birthdate</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginLeft: '10%',
              marginRight: '10%',
              marginBottom: 20,
            }}>
            <TextInput
              style={{
                flex: 2,
                marginRight: 5,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('mm')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(month) => setMonth(month)}
              value={month}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={2}
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              onSubmitEditing={() => {
                birthDayInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{
                flex: 2,
                marginLeft: 5,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('dd')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(day) => setDay(day)}
              value={day}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={2}
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              ref={(input) => {
                birthDayInput = input;
              }}
              onSubmitEditing={() => {
                areaCodeInput.focus();
              }}
              blurOnSubmit={false}
            />
          </View>
          <Text
            style={{
              marginLeft: '10%',
              marginBottom: 5,
              color: themeElementColor,
            }}>
            Phone Number
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginLeft: '10%',
              marginRight: '10%',
              marginBottom: 20,
            }}>
            <TextInput
              style={{
                flex: 2,
                marginRight: 10,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('###')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(areaCode) => setAreaCode(areaCode)}
              value={areaCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={3}
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              ref={(input) => {
                areaCodeInput = input;
              }}
              onSubmitEditing={() => {
                prefixInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{
                flex: 2,
                marginRight: 10,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('###')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(prefix) => setPrefix(prefix)}
              value={prefix}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={3}
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              ref={(input) => {
                prefixInput = input;
              }}
              onSubmitEditing={() => {
                lineNumberInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{
                flex: 4,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.InputContainer,
              }}
              placeholder={IMLocalized('####')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(lineNumber) => setLineNumber(lineNumber)}
              value={lineNumber}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={4}
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              blurOnSubmit={false}
            />
          </View>

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => onContinueToAddress()}>
            {IMLocalized('Next')}
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };

  let addressL2Input;
  let cityInput;
  let stateInput;
  let zipCodeInput;

  const renderEnterAddress = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onClickOutideKeyboard()}
        accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled={enableShift}>
          {!enableShift && (
            <Text style={{ color: themeElementColor, ...styles.birthDate }}>
              Please enter a shipping address so you can receive gifts! Your
              address is only visible to you and will never be shared with any
              users on this app.
            </Text>
          )}
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('Address Line 1')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(addressL1) => setAddressL1(addressL1)}
            value={addressL1}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            onSubmitEditing={() => {
              addressL2Input.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('Address Line 2')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(addressL2) => setAddressL2(addressL2)}
            value={addressL2}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            ref={(input) => {
              addressL2Input = input;
            }}
            onSubmitEditing={() => {
              cityInput.focus();
            }}
            blurOnSubmit={false}
          />

          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.InputContainer,
            }}
            placeholder={IMLocalized('City')}
            placeholderTextColor="#aaaaaa"
            onChangeText={(city) => setCity(city)}
            value={city}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onFocus={() => setEnableShift(true)}
            returnKeyType="next"
            ref={(input) => {
              cityInput = input;
            }}
            onSubmitEditing={() => {
              stateInput.focus();
            }}
            blurOnSubmit={false}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              marginHorizontal: '10%',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.smallInputContainer,
              }}
              placeholder={IMLocalized('State')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(state) => setState(state)}
              value={state}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onFocus={() => setEnableShift(true)}
              returnKeyType="next"
              ref={(input) => {
                stateInput = input;
              }}
              onSubmitEditing={() => {
                zipCodeInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{
                borderColor: themeElementColor,
                color: themeElementColor,
                ...styles.smallInputContainer,
              }}
              placeholder={IMLocalized('Zip Code')}
              placeholderTextColor="#aaaaaa"
              onChangeText={(zipCode) => setZipCode(zipCode)}
              value={zipCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="number-pad"
              onFocus={() => setEnableShift(true)}
              ref={(input) => {
                zipCodeInput = input;
              }}
              blurOnSubmit={false}
            />
          </View>

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => onRegister()}>
            {IMLocalized('Create Account')}
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        keyboardShouldPersistTaps="always">
        {!enableShift && (
          <View
            style={{
              height: '10%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}
              onPress={() => props.navigation.goBack()}>
              <Image
                style={{
                  height: width * 0.08,
                  width: width * 0.05,
                  tintColor: '#4AE0CD',
                }}
                source={appStyles.iconSet.keyboardArrow}
              />
            </TouchableOpacity>
          </View>
        )}
        {!enableShift && (
          <>
            <View style={styles.logoContainer}>
              <Image source={kazooLogo} style={styles.logo} />
            </View>
            <Text style={{ color: themeElementColor, ...styles.title }}>
              {IMLocalized('Welcome')}
            </Text>
          </>
        )}
        {nextClicked === 0
          ? renderSignupWithEmail()
          : nextClicked === 1
          ? renderEnterBirthDate()
          : nextClicked === 2
          ? renderEnterAddress()
          : null}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData,
})(SignupScreen);
