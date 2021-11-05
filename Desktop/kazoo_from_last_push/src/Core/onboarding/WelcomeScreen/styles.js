import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    background: {
      width: 500,
    },
    logo: {
      width: '30%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 5,
      borderColor: 'red',
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      // tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      //marginBottom: 80,
    },
    titleContainer: {
      paddingBottom: '5%',
    },
    title: {
      fontSize: 25,
      fontStyle: 'italic',
      //fontWeight: 'bold',
      // color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      color: 'white',
      //marginTop: 370,
      marginHorizontal: '5%',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 1)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 2,
    },
    // caption: {
    //   fontSize: 16,
    //   paddingHorizontal: 50,
    //   marginBottom: 20,
    //   textAlign: 'center',
    //   color: appStyles.colorSet[colorScheme].mainTextColor,
    // },
    loginView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    loginContainer: {
      width: '40%',
      //backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#1490CA',
      borderRadius: 10,
      padding: 10,
      marginTop: 30,
      marginLeft: 5,
      alignSelf: 'center',
      justifyContent: 'center',
      height: 45,
    },
    loginText: {
      // color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      color: 'white',
      fontSize: 15,
      fontWeight: '800',
    },
    signupContainer: {
      justifyContent: 'center',
      width: '40%',
      // backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      backgroundColor: '#F17F96',
      borderRadius: 10,
      //borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      //borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      padding: 10,
      marginTop: 30,
      marginRight: 5,
      alignSelf: 'center',
      height: 45,
    },
    signupText: {
      // color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      color: 'white',
      fontWeight: '800',
      fontSize: 15,
    },
    dismissButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
  });
};

export default dynamicStyles;
