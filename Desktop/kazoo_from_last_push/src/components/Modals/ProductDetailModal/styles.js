import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    modalStyle: {
      margin: 0,
    },
    transparentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewContainer: {
      width: width * 0.9,
      height: height * 0.9,
      borderWidth: 2,
      borderColor: '#4AE0CD',
      borderRadius: 20,
      // justifyContent: 'center',
      alignItems: 'center',
    },
    swiperContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 9,
      width: width * 0.8,
    },
    imageBackgroundContainer: {
      flex: 1.9,
      // backgroundColor: 'white',
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'contain',
    },
    activeDot: {
      backgroundColor: '#4AE0CD',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    headerContainer: {
      flexDirection: 'row',
    },
    headerContainerStyle: {
      width: '96%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      height: '4%',
      position: 'absolute',
      top: '2%',
      paddingHorizontal: 5,
    },
    headerIconContainer: {
      justifyContent: 'center',
    },
    headerIconspace: {
      // flex: 6,
      borderWidth: 1,
      borderColor: 'white',
    },
    favouriteIconContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      marginBottom: 2,
    },
    favouriteContainerStyle: {
      width: '15%',
      height: '10%',
      position: 'absolute',
      top: '18%',
      right: '5%',
      // borderWidth: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      // borderWidth: 1,
      // borderColor: 'white',
    },
    checkBox: {
      height: 24,
      width: 24,
    },
    // favouriteIconCircleContainer: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: 38,
    //   width: 38,
    //   borderRadius: 19,
    //   backgroundColor: 'white',
    // },
    favouriteIcon: {
      width: width * 0.15,
      height: width * 0.15,
      tintColor: '#4AE0CD',
    },
    optionContainerStyle: {
      width: '20%',
      position: 'absolute',
      top: height * 0.43,
      right: '2%',
    },
    optionContainer: {
      flexDirection: 'row',
    },
    sizeContainer: {
      flex: 0.5,
    },
    colorContainer: {
      flex: 0.5,
    },
    descriptionContainer: {
      // flex: 1.6,
      paddingBottom: '2%',
      justifyContent: 'flex-start',
      width: width * 0.8,
      height: width * 0.4,
    },
    footerContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 20,
      //borderWidth: 2,
      paddingTop: '5%',
      //height: '10%',
      borderTopWidth: 0.5,
      borderColor: '#d9d9d9',
    },
    title: {
      fontFamily: AppStyles.fontFamily.regularFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingTop: '5%',
      paddingLeft: 15,
      fontSize: RFPercentage(2),
      //borderWidth: 1,
    },
    price: {
      fontFamily: AppStyles.fontFamily.regularFont,
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      paddingTop: 7,
      //paddingBottom: 15,
      paddingLeft: 15,
      fontSize: RFPercentage(2),
      //borderWidth: 1,
    },
    // borderLine: {
    //   width: '97%',
    //   height: 0.5,
    //   alignSelf: 'center',
    //   marginTop: 10,
    //   backgroundColor: '#d9d9d9',
    // },
    addToBagContainerStyle: {
      //backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#4CE1CD',
      flex: 2.5,
      height: '40%',
      // alignSelf: "flex-end"
    },
    buttonSpace: {
      flex: 0.01,
    },
    payContainerStyle: {
      backgroundColor: 'white',
      flex: 2.5,
      height: '40%',
      // alignSelf: "flex-end"
    },
    footerIconStyle: {
      width: 0.05 * width,
      height: 0.05 * width,
      marginRight: 3,
    },
  });
};

export default dynamicStyles;
