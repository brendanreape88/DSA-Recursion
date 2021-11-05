import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';

const optionBoxSize = 23;
const optionBoxMargin = 7;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    sizeOptionBox: {
      height: optionBoxSize,
      width: optionBoxSize,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      backgroundColor: 'white',
      margin: optionBoxMargin,
    },
    selectedSizeOptionBox: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    size: {
      textAlign: 'center',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      fontSize: RFPercentage(1),
    },
    selectedSize: {
      color: 'white',
    },
  });
};

export default dynamicStyles;
