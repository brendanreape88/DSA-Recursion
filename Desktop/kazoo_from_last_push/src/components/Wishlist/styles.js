import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCardContainer: {
    height: 180,
    backgroundColor: '#34B6A6',
    paddingTop: 20,
  },
  userCardBackButtonContainer: {
    backgroundColor: '#34B6A6',
    alignItems: 'flex-start',
  },
  userCardBackButtonIcon: {
    height: 30,
    width: 30,
    marginLeft: 20,
    tintColor: 'white',
  },
  userAvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarImage: {
    height: 80,
    width: 80,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: 'white',
  },
  userNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    //color: AppStyles.colorSet[colorScheme].mainTextColor,
    color: 'white',
    //fontFamily: AppStyles.fontFamily.boldFont,
    fontSize: 30,
    //paddingTop: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default styles;
