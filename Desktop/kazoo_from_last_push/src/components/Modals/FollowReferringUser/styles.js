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
    borderColor: '#4AE0CD',
    marginHorizontal: '5%',
    height: 0.5 * height,
    borderRadius: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  noButton: {
    borderWidth: 2,
    borderRadius: 8,
    // borderColor: '#F17F96',
    borderColor: '#E5606E',
    padding: 10,
    marginHorizontal: 5,
    width: 0.35 * width,
  },
  noButtonText: {
    fontSize: RFPercentage(1.5),
    fontWeight: 'bold',
    // color: '#F17F96',
    color: '#E5606E',
    textAlign: 'center',
  },
  yesButton: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#42E2CD',
    padding: 10,
    marginHorizontal: 5,
    width: 0.35 * width,
  },
  yesButtonText: {
    fontSize: RFPercentage(1.5),
    fontWeight: 'bold',
    color: '#42E2CD',
    textAlign: 'center',
  },
  avatarMedium: {
    height: width * 0.18,
    width: width * 0.18,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4AE0CD',
  },
  dividerContainer: {
    flexDirection: 'row',
    marginTop: 5,
    //borderWidth: 1,
  },
  leftLine: {
    backgroundColor: '#4AE0CD',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  dividerText: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontSize: RFPercentage(3),
    // fontWeight: 'bold',
  },
  messageText: {
    alignSelf: 'center',
    fontSize: RFPercentage(3),
    // fontWeight: 'bold',
  },
  rightLine: {
    backgroundColor: '#4AE0CD',
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  name: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
  },
  mutualFriendContainer: {
    // borderWidth: 1,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '15%',
  },
});

export default styles;
