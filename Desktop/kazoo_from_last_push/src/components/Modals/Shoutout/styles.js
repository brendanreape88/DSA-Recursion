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
    marginHorizontal: '5%',
    // height: 300,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
  avatarImage: {
    height: 0.25 * width,
    width: 0.25 * width,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#42E2CD',
    marginTop: 5,
  },
  messageText: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    padding: 10,
  },
  video: {
    width: '100%',
    height: '40%',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  button: {
    // borderWidth: 0.5,
    borderRadius: 8,
    // borderColor: '#42E2CD',
    backgroundColor: '#42E2CD',
    padding: 10,
    marginHorizontal: 10,
    width: width * 0.37,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
