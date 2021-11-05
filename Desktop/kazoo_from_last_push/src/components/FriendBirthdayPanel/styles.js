import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  itemsDefaultMessageContainer: {
    height: 200,
    marginTop: 0,
    // borderBottomWidth: 0.25,
    borderColor: '#545454',
  },
  itemsDefaultMessageContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsDefaultMessageText: {
    color: '#545454',
  },
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    // borderBottomWidth: 0.25,
    // borderWidth: 1,
  },
  panelFriendButton: {
    flexDirection: 'row',
    flex: 1,
    //borderWidth: 1,
  },
  panelAvatarContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
  },
  panelAvatarImage: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4AE0CD',
  },
  panelBirthdayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelNameContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 1,
    width: width * 0.49,
    // borderWidth: 1,
    marginRight: 5,
  },
  panelNameText: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  panelCountdownContainer: {
    flexDirection: 'row',
    marginRight: 10,
    // borderWidth: 1,
  },
  panelCountdownColumnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2.5,
  },
  panelCountdownNumberContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#CCF9F8',
    borderColor: '#00CAC7',
    // borderWidth: 2,
    height: 0.06 * width,
    width: 0.06 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelCountdownNumberText: {
    fontSize: RFPercentage(1.5),
    fontWeight: 'bold',
  },
  panelCountdownText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(1.5),
    marginTop: -1,
  },
  panelButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 5,
    paddingRight: 9,
  },
  panelButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelButton: {
    borderRadius: 18,
    borderColor: '#4AE0CD',
    borderWidth: 2,
    //height: 40,
    //width: 60,
    height: 0.1 * width,
    width: 0.13 * width,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 11,
    marginRight: 5,
  },
  panelButtonIconPlane: {
    flex: 1,
    width: 0.06 * width,
    height: 0.06 * width,
    resizeMode: 'contain',
    tintColor: '#4AE0CD',
  },
  panelButtonIconTruck: {
    flex: 1,
    width: 0.08 * width,
    height: 0.08 * width,
    resizeMode: 'contain',
    tintColor: '#4AE0CD',
  },
});

export default styles;
