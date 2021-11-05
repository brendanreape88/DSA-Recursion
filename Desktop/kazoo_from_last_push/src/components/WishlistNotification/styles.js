import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    height: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //borderWidth: 1,
    flex: 1,
    marginRight: 5,
  },
  avatarImage: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4CE1CD',
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 4,
    paddingRight: 5,
  },
  messageText: {
    fontSize: RFPercentage(2.5),
    marginRight: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 2,
  },
  button: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#42E2CD',
    padding: 10,
    // marginHorizontal: 20,
    width: 0.2 * width,
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
