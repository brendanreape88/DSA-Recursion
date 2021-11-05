import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  logo: {
    height: width * 0.1,
    width: width * 0.3,
    marginBottom: 5,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // paddingBottom: 5,
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: '#4AE0CD',
    padding: 10,
  },
  farLeftIconButton: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    position: 'absolute',
    left: 0,
  },
  leftIconButton: {
    // position: 'absolute',
    padding: 10,
  },
  leftIconImage: {
    height: width * 0.06,
    width: width * 0.06,
    tintColor: '#4AE0CD',
  },
  middleIconButton: {
    padding: 10,
  },
  middleIconImage: {
    height: width * 0.06,
    width: width * 0.06,
    tintColor: '#4AE0CD',
  },
  rightIconButton: {
    // position: 'absolute',
    marginRight: 5,
    padding: 10,
  },
  rightIconImage: {
    height: width * 0.06,
    width: width * 0.06,
    tintColor: '#4AE0CD',
  },
  counterContainer: {
    backgroundColor: '#E5606E',
    borderRadius: 65,
    height: 0.04 * width,
    width: 0.04 * width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '10%',
    left: '100%',
    padding: 1,
  },
  counterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
