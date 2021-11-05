import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const paddingLeft = 13;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyViewContainer: {
      marginTop: height / 6,
    },
    cardContainer: {
      width: width * 0.98,
      height: height * 0.12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      borderRadius: 8,
      // borderColor: AppStyles.colorSet[colorScheme].ghostWhite,
      // backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginVertical: 5,
    },
    imageContainer: {
      flex: 1,
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: '#545454',
    },
    cardImage: {
      width: width * 0.25,
      height: width * 0.25,
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: '#545454',
      resizeMode: 'contain',
    },
    contentContainer: {
      flex: 3.2,
      borderWidth: 1,
      justifyContent: 'flex-start',
      padding: 5,
    },
    titleContainer: {
      // flex: 2,
      justifyContent: 'center',
      //borderWidth: 1,
    },
    optionContainer: {
      flex: 4,
      //borderWidth: 1,
    },
    colorOptionContainer: {
      flexDirection: 'row',
      //borderWidth: 1,
    },
    colorOptionTitleContainer: {
      flex: 1.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkBoxContainer: {
      flexDirection: 'row',
      flex: 3,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    sizeOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 3,
    },
    title: {
      color: '#545454',
      fontWeight: 'bold',
      // fontFamily: AppStyles.fontFamily.semiBoldFont,
      paddingLeft: 5,
      fontSize: RFPercentage(1.5),
    },
    color: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      fontSize: RFPercentage(1.5),
      paddingRight: 3,
      paddingLeft: paddingLeft,
    },
    size: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      fontSize: RFPercentage(1.5),
      paddingLeft: paddingLeft - 7,
    },
    priceContainer: {
      flex: 0.8,
      justifyContent: 'flex-end',
    },
    price: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      fontSize: RFPercentage(1.5),
      paddingRight: 3,
      paddingLeft: paddingLeft,
      paddingBottom: 33,
    },
    quantityControlContainer: {
      flex: 0.5,
      height: '85%',
      alignSelf: 'center',
    },
    quantityControlIconContainer: {
      height: 25,
      width: 25,
      borderRadius: 5,
      //borderWidth: 1.5,
      borderColor: AppStyles.colorSet[colorScheme].ghostWhite,
      alignItems: 'center',
      justifyContent: 'center',
    },
    increaseIconContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countContainer: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    decreaseIconContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    quantityCount: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      fontSize: 16,
    },
    quantityControlIcon: {
      height: 10,
      width: 10,
      tintColor: '#bdbdc2',
    },
    checkBox: {
      margin: 4,
      height: 15,
      width: 15,
    },
    // checkBoxContainer: {
    //   flexDirection: "row",
    //   flexWrap: "wrap"
    // },
    footerContainer: {
      width: width,
      height: height * 0.05,
      backgroundColor: 'white',
      alignSelf: 'flex-end',
      // alignItems: 'flex-end',
      justifyContent: 'center',
      borderWidth: 1,
      flexDirection: 'row',
      // borderTopColor: "#f2f2f3",
      // borderTopColor: AppStyles.colorSet[colorScheme].grey6,
      // borderTopWidth: 1.5,
    },
    totalContainer: {
      flexDirection: 'row',
      height: height * 0.05,
      justifyContent: 'center',
    },
    totalTitleContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      fontSize: RFPercentage(2),
    },
    titleCostSpace: {
      flex: 5,
    },
    totalCostContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalCost: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      fontSize: RFPercentage(2),
    },
    footerButtonContainer: {
      //backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      backgroundColor: '#42E2CD',
    },
    footerTitle: {
      color: 'white',
    },
    sendAsGiftButton: {
      backgroundColor: '#42E2CD',
      width: '40%',
      height: '45%',
    },
    purchaseButton: {
      backgroundColor: '#42E2CD',
      width: '40%',
      height: '45%',
    },
  });
};

export default dynamicStyles;
