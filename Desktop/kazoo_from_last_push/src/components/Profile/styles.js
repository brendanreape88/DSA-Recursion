import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const itemIconSize = 26;
const itemNavigationIconSize = 23;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    cardContainer: {
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor: '#34B6A6',
      padding: 10,
      // borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardImageContainer: {
      //flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardImage: {
      height: width * 0.21,
      width: width * 0.21,
      borderRadius: 65,
      borderWidth: 2,
      borderColor: 'white',
    },
    cardNameContainer: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      // borderWidth: 1,
      width: width * 0.45,
      marginHorizontal: 10,
    },
    cardName: {
      color: 'white',
      fontSize: RFPercentage(3),
      fontWeight: 'bold',
    },
    centeredContainer: {
      flexDirection: 'row',
    },
    dateContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateColumn: {
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
    },
    dateNumber: {
      fontSize: RFPercentage(3),
      fontWeight: 'bold',
    },
    dateText: {
      fontSize: RFPercentage(1.5),
      fontWeight: 'bold',
      color: 'white',
    },
    defaultMessageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 1,
    },
    defaultMessageContainer2: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultMessageContentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 215,
    },
    defaultMessageText: {
      textAlign: 'center',
    },
    defaultMessageAddButton: {
      borderWidth: 0.5,
      borderRadius: 65,
      borderColor: '#545454',
      marginTop: 10,
    },
    defaultMessageAddIcon: {
      height: 15,
      width: 15,
      tintColor: '#545454',
      margin: 5,
    },

    numberBox: {
      backgroundColor: 'white',
      borderRadius: 8,
      height: 0.1 * width,
      width: 0.1 * width,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    itemContainer: {
      flexDirection: 'row',
      height: 54,
      width: '85%',
      alignSelf: 'center',
      marginBottom: 10,
    },
    itemIconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      //borderWidth: 1,
    },
    itemIcon: {
      height: itemIconSize,
      width: itemIconSize,
    },
    itemTitleContainer: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    itemTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      fontSize: 17,
      paddingLeft: 20,
    },
    itemNavigationIconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemNavigationIcon: {
      height: itemNavigationIconSize,
      width: itemNavigationIconSize,
      tintColor: AppStyles.colorSet[colorScheme].hairlineColor,
    },
    footerButtonContainer: {
      flex: 2,
      justifyContent: 'flex-start',
      marginTop: 8,
    },
    footerContainerStyle: {
      borderColor: AppStyles.colorSet[colorScheme].hairlineColor,
    },
    blank: {
      flex: 0.5,
    },
    itemsContainer: {
      backgroundColor: 'white',
      flex: 4,
    },
    itemCard: {
      backgroundColor: 'lightgrey',
      borderRadius: 8,
    },
    itemCardImageBox: {
      borderWidth: 1,
      height: 120,
      borderRadius: 8,
    },
    itemCardImage: {
      height: 50,
      width: 50,
    },
    itemCardTextBox: {
      borderWidth: 1,
      height: 90,
    },
    profileSectionTitle: {
      fontSize: RFPercentage(3),
      fontWeight: '500',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
    },
    profileItemContainer: {
      flex: 5.9,
      marginTop: 16,
    },
    productContainer: {
      height: width * 0.43,
      width: width * 0.27,
      marginRight: 20,
      marginTop: 5,
      borderRadius: 15,
      backgroundColor: 'white',
    },
    productFlexContainer: {
      flex: 2,
    },
    productImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    memoryImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    productTitleContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 5,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderBottomWidth: 0.5,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: '#D9D9D9',
    },
    productTitleText: {
      // paddingTop: 2,
      fontSize: RFPercentage(1.5),
      fontWeight: 'bold',
    },
    productGiftText: {
      // paddingTop: 2,
      fontSize: RFPercentage(1.5),
    },
    productPurchasedOverlay: {
      height: width * 0.43,
      width: width * 0.27,
      borderRadius: 15,
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.2,
    },
    profileCardContainer: {
      //flex: 2,
      marginTop: 15,
      height: 0.45 * height,
      maxHeight: 300,
      //borderWidth: 1,
    },
    scrollViewContainer: {
      height: width * 0.47,
      marginTop: 0,
      marginLeft: 20,
      // borderWidth: 1,
    },
    menuOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      opacity: 0.3,
    },
    menuContainer: {
      position: 'absolute',
      zIndex: 10,
      bottom: 0,
      marginHorizontal: '10%',
      width: '80%',
      // height: '40%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
      paddingHorizontal: 5,
    },
    menuItemContainer: {
      borderBottomWidth: 0.25,
    },
    menuButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 30,
      paddingVertical: 10,
    },
    menuItemIcon: {
      marginRight: 20,
    },
    menuItemText: {
      fontSize: RFPercentage(2.5),
    },
  });
};

export default dynamicStyles;
