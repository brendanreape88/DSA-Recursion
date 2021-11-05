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
    margin: '5%',
    height: 0.3 * height,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  messageText: {
    textAlign: 'center',
    paddingBottom: 30,
    fontSize: RFPercentage(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    //borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#F17F96',
    backgroundColor: '#F17F96',
    padding: 10,
    marginHorizontal: '5%',
    width: '30%',
  },
  cancelButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  sendButton: {
    //borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#42E2CD',
    backgroundColor: '#42E2CD',
    padding: 10,
    marginHorizontal: '5%',
    width: '30%',
  },
  sendButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
