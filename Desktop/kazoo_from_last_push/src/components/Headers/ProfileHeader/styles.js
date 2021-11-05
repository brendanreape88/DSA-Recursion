import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '10%',
    // backgroundColor: '#34B6A6',
  },
  leftIconButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  leftIconImage: {
    height: width * 0.06,
    width: width * 0.06,
    tintColor: 'white',
  },
  rightIconButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  rightIconImage: {
    height: width * 0.07,
    width: width * 0.07,
    tintColor: 'white',
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFPercentage(4),
  },
  dividerContainer: {
    height: 10,
    // backgroundColor: '#34B6A6',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    // borderColor: 'white',
    width: width * 0.95,
  },
});

export default styles;
