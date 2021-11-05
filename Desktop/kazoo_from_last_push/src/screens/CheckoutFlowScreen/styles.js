import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  checkoutContainer: {
    flex: 1,
  },
  checkoutFooterContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '-4%',
  },
  checkoutFooterContainerStyle: {
    //backgroundColor: currentTheme.mainThemeForegroundColor,
    backgroundColor: '#42E2CD',
    borderRadius: 8,
  },
  paymentMethodKeyboardContainer: {
    flex: 1,
  },
  paymentMethodNextButton: {
    backgroundColor: '#4AE0CD',
    borderRadius: 8,
    padding: 10,
    margin: 20,
  },
  paymentMethodNextButtonText: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
});

export default styles;
