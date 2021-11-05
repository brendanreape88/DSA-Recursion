import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    height: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  userProfileButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //borderWidth: 1,
    flex: 1,
  },
  userAvatarImage: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4CE1CD',
    marginHorizontal: '5%',
  },
  userNameText: {
    fontSize: RFPercentage(3),
    marginRight: '14%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsView: {
    borderRadius: 8,
    borderColor: '#34B6A6',
    backgroundColor: '#34B6A6',
    padding: 10,
    marginHorizontal: 20,
    width: 0.2 * width,
  },
  friendsViewText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  sentView: {
    borderRadius: 8,
    borderColor: '#42E2CD',
    backgroundColor: 'lightgrey',
    padding: 10,
    marginHorizontal: 20,
    width: 0.2 * width,
  },
  sentViewText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  addButton: {
    borderRadius: 8,
    borderColor: '#42E2CD',
    backgroundColor: '#42E2CD',
    padding: 10,
    marginHorizontal: 20,
    width: 0.2 * width,
  },
  addButtonText: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
