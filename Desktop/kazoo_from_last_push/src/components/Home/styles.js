import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    carouselContainer: {
      marginTop: 18,
    },
    carouselTitleText: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 10,
      marginBottom: 12,
    },
    featuredContainer: {
      marginTop: 20,
      marginLeft: 7,
      //paddingBottom: 20,
      //borderWidth: 1,
      height: '13%',
    },
    unitContainer: {
      marginTop: 20,
      marginLeft: 7,
      //paddingBottom: 20,
      //borderWidth: 1,
      //height: '30%',
    },
    unitTitle: {
      textAlign: 'left',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginLeft: 7,
      marginBottom: 7,
    },
  });
};

export default dynamicStyles;
