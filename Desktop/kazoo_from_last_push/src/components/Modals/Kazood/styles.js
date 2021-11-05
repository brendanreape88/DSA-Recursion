import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5606E',
  },
  titleContainer: {
    borderWidth: 1,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
  avatarContainer: {
    borderWidth: 1,
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: 'white',
    // marginRight: 10,
    // marginLeft: 10,
  },
  wrappingContainer: {
    //borderWidth: 5,
    borderColor: 'blue',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrappingImage: {
    //borderWidth: 1,
    height: 200,
    width: '80%',
    borderRadius: 30,
    //marginHorizontal: 20,
    //marginTop: 50,
  },
  wrappingMessageContainer: {
    //borderWidth: 5,
    borderColor: 'yellow',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrappingMessageContentContainer: {
    borderWidth: 10,
    borderColor: '#02A8A8',
    backgroundColor: 'white',
    height: 150,
    width: 250,
    borderRadius: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  wrappingMessageText: {
    fontSize: 30,
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //borderWidth: 2,
    paddingBottom: 30,
  },
  viewLaterButton: {
    //borderWidth: 0.5,
    borderRadius: 8,
    //borderColor: '#F17F96',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    width: 160,
  },
  viewLaterButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#CE404D',
    textAlign: 'center',
  },
  viewNowButton: {
    //borderWidth: 0.5,
    borderRadius: 8,
    //borderColor: '#42E2CD',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    width: 150,
  },
  viewNowButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34B6A6',
    textAlign: 'center',
  },
});

export default styles;
