import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  shoutoutContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  shoutoutView: {
    margin: '5%',
    height: 0.3 * height,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  shoutoutText: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: RFPercentage(2),
  },
  shoutoutButton: {
    //borderWidth: 0.5,
    borderRadius: 8,
    //borderColor: '#F17F96',
    backgroundColor: '#4AE0CD',
    padding: 10,
    marginHorizontal: 20,
    width: 0.23 * width,
  },
  shoutoutButtonText: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
