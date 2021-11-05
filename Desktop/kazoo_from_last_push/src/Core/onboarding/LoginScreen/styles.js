import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const dynamicStyles = (appStyles, colorScheme) => {
  const { width, height } = Dimensions.get('window');
  return StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      //justifyContent: 'center',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingBottom: 10,
    },
    keyboardContainer: {
      flex: 1,
      width: '100%',
    },
    // orTextStyle: {
    //   color: appStyles.colorSet[colorScheme].mainTextColor,
    //   marginTop: 40,
    //   marginBottom: 10,
    //   alignSelf: 'center',
    // },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 1,
      height: 0.175 * height,
    },
    logo: {
      width: 0.15 * height,
      height: 0.15 * height,
      resizeMode: 'contain',
    },
    title: {
      fontSize: RFPercentage(4),
      fontWeight: 'bold',
      // color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: '5%',
      marginBottom: '5%',
      alignSelf: 'stretch',
      textAlign: 'center',
      //marginLeft: 30,
      //borderWidth: 1,
    },
    loginContainer: {
      width: '80%',
      //height: 0.05 * height,
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#41E1CD',
      borderRadius: 8,
      //padding: 10,
      marginTop: '5%',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 0.06 * height,
    },
    loginText: {
      color: '#ffffff',
      fontSize: RFPercentage(2.5),
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 0.06 * height,
      borderWidth: 1,
      // borderColor: appStyles.colorSet[colorScheme].grey3,
      // backgroundColor: 'white',
      paddingLeft: 20,
      // color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: '5%',
      alignItems: 'center',
      borderRadius: 8,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      fontSize: RFPercentage(2),
    },
    forgotPasswordContainer: {
      marginTop: 20,
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
      //borderWidth: 1,
    },
    forgotPasswordText: {
      fontSize: RFPercentage(3),
      padding: 4,
      color: 'white',
    },
    dividerContainer: {
      flexDirection: 'row',
      marginTop: 20,
      //borderWidth: 1,
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
      //padding: 10,
      marginTop: '5%',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 0.06 * height,
    },
    signupText: {
      color: 'white',
      fontSize: RFPercentage(2.5),
    },
  });
};

export default dynamicStyles;
