import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  image: {
    marginBottom: 20,
    width: 150,
    height: 150,
  },
  paymentText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',

    marginBottom: 20,
  },
  orderText: {
    fontSize: RFPercentage(3),
  },
  orderIdText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: RFPercentage(3),
  },
  emailText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4AE0CD',
    borderRadius: 8,
    padding: 10,
    margin: 20,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
});

export default styles;
