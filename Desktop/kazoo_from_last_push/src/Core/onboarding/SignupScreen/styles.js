import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const imageSize = height * 0.232;
const photoIconSize = imageSize * 0.27;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingBottom: 10,
    },
    keyboardContainer: {
      flex: 1,
      width: '100%',
    },
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
    birthDate: {
      //height: 0.06 * height,
      //borderWidth: 1,
      // borderColor: appStyles.colorSet[colorScheme].grey3,
      // backgroundColor: 'white',
      // color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 10,
      alignItems: 'center',
      borderRadius: 8,
      //textAlign: I18nManager.isRTL ? 'right' : 'left',
      fontSize: RFPercentage(2),
      marginBottom: 20,
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: appStyles.fontSet.middle,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    loginContainer: {
      width: '80%',
      //height: 0.05 * height,
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#41E1CD',
      borderRadius: 8,
      padding: 10,
      marginTop: '5%',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 0.06 * height,
    },
    loginText: {
      color: '#ffffff',
      fontSize: RFPercentage(2),
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

    smallInputContainer: {
      height: 0.06 * height,
      borderWidth: 1,
      // borderColor: appStyles.colorSet[colorScheme].grey3,
      // backgroundColor: 'white',
      paddingLeft: 20,
      // color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '48%',
      alignSelf: 'center',
      marginTop: '5%',
      alignItems: 'center',
      borderRadius: 8,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      fontSize: RFPercentage(2),
    },

    signupContainer: {
      width: '80%',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#41E1CD',
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
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
  });
};

export default dynamicStyles;
