import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AppStyles from '../../AppStyles';

const { width, height } = Dimensions.get('window');

const featuredTextPadding = 3;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    productCardConainer: {
      width: 0.35 * width,
      height: 0.35 * height,
      margin: 10,
      overflow: 'visible',
      marginLeft: 7,
      borderWidth: 0.5,
      borderRadius: 8,
    },
    productCardImageConainer: {
      width: '100%',
      height: '75%',
    },
    productCardImage: {
      width: '100%',
      height: '100%',
      borderRadius: 6,
      resizeMode: 'contain',
    },
    productCardPrice: {
      textAlign: 'left',
      fontSize: RFPercentage(1.5),
      fontWeight: 'bold',
      paddingTop: featuredTextPadding,
      marginLeft: 5,
    },
    productCardDescription: {
      textAlign: 'left',
      fontSize: RFPercentage(1.5),
      // fontWeight: 'bold',
      paddingTop: featuredTextPadding,
      marginLeft: 5,
      marginRight: 5,
    },
    purchasedProductOverlay: {
      opacity: 0.2,
      backgroundColor: 'black',
      position: 'absolute',
      borderRadius: 15,
    },
    favorite: {
      width: width * 0.13,
      height: width * 0.13,
      tintColor: '#4AE0CD',
      position: 'absolute',
      top: '1%',
      right: '2%',
    },
  });
};

export default dynamicStyles;
