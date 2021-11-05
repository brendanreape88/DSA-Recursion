import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth * 0.7;
const carouselHeightMultiplier = 1.52;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    carouselProductViewContainer: {
      width: width - 30,
      height: carouselHeightMultiplier * width - 90,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      margin: 5,
      elevation: 11,
    },
    carouselProductView: {
      height: '100%',
      width: '100%',
      //borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 7,
    },
    carouselProductViewImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: 7,
    },
    carouselProductViewTitle: {
      textAlign: 'center',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      marginTop: 17,
    },
    carouselProductViewPrice: {
      textAlign: 'center',
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 14,
      fontFamily: AppStyles.fontFamily.mediumFont,
      marginTop: 4,
    },
  });
};

export default dynamicStyles;
