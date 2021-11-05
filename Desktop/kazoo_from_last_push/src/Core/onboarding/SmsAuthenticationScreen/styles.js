import { StyleSheet, Dimensions } from 'react-native';
import { I18nManager } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';

const width = Dimensions.get('window').width;

const codeInptCellWidth = width * 0.13;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    keyboardContainer: {
      flex: 1,
      width: '100%',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 50,
      alignSelf: 'stretch',
      textAlign: 'center',
      //marginLeft: 35,
    },
    sendContainer: {
      width: '80%',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#41E1CD',
      borderRadius: 8,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    sendText: {
      color: '#ffffff',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 10,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 8,
    },

    flagStyle: {
      width: 35,
      height: 25,
      borderColor: appStyles.colorSet[colorScheme].mainTextColor,
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    phoneInputTextStyle: {
      borderLeftWidth: I18nManager.isRTL ? 0 : 1,
      borderRightWidth: I18nManager.isRTL ? 1 : 0,
      borderLeftWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      height: 42,
      fontSize: 15,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderBottomRightRadius: I18nManager.isRTL ? 0 : 8,
      borderTopRightRadius: 8,
      borderTopRightRadius: I18nManager.isRTL ? 0 : 8,
      borderBottomLeftRadius: I18nManager.isRTL ? 8 : 0,
      borderTopLeftRadius: I18nManager.isRTL ? 8 : 0,
      paddingLeft: 10,
    },
    input: {
      flex: 1,
      borderLeftWidth: 1,
      borderRadius: 3,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontWeight: '700',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    // code input style
    root: {
      padding: 20,
      minHeight: 300,
      alignItems: 'center',
    },
    codeFieldContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    codeInputCell: {
      width: codeInptCellWidth,
      height: codeInptCellWidth,
      lineHeight: 55,
      fontSize: 26,
      fontWeight: '400',
      textAlign: 'center',
      marginLeft: 8,
      borderRadius: 6,
      backgroundColor: appStyles.colorSet[colorScheme].grey3,
    },
    focusCell: {
      borderColor: '#000',
    },
    orTextStyle: {
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    facebookContainer: {
      width: '80%',
      //backgroundColor: '#4267b2',
      backgroundColor: '#205086',
      borderRadius: 8,
      marginTop: 30,
      alignSelf: 'center',
      padding: 10,
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14,
    },
    signWithEmailContainer: {
      marginTop: 20,
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    dividerContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    leftLine: {
      backgroundColor: 'lightgrey',
      height: 2,
      flex: 1,
      alignSelf: 'center',
    },
    dividerText: {
      alignSelf: 'center',
      paddingHorizontal: 20,
      fontSize: 14,
      color: 'lightgrey',
    },
    rightLine: {
      backgroundColor: 'lightgrey',
      height: 2,
      flex: 1,
      alignSelf: 'center',
    },
    signupContainer: {
      width: '80%',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#F17F96',
      borderRadius: 8,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    signupText: {
      color: 'white',
    },
  });
};

export default dynamicStyles;
