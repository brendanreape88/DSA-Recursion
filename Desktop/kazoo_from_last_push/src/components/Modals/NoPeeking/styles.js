import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    height: 0.3 * height,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    textAlign: 'center',
    paddingBottom: 20,
    //fontSize: RFPercentage(2.5),
    //fontSize: 50,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    //borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#42E2CD',
    backgroundColor: '#42E2CD',
    padding: 10,
    marginHorizontal: 20,
    width: 0.23 * width,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
