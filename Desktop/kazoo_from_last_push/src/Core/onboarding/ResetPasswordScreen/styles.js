import { StyleSheet, Dimensions } from 'react-native';
import { I18nManager } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';
import { RFPercentage } from 'react-native-responsive-fontsize';

const dynamicStyles = (appStyles, colorScheme) => {
  const { width, height } = Dimensions.get('window');
  return StyleSheet.create({
    container: {
      flex: 1,
      // marginBottom: 10,
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
    sendContainer: {
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
    sendText: {
      color: '#ffffff',
      fontSize: RFPercentage(2.5),
    },
    InputContainer: {
      height: 0.06 * height,
      borderWidth: 1,
      paddingLeft: 20,
      width: '80%',
      alignSelf: 'center',
      marginTop: '5%',
      alignItems: 'center',
      borderRadius: 8,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      fontSize: RFPercentage(2),
    },
  });
};

export default dynamicStyles;
