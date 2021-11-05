import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    // borderRadius: 65,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  avatar: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4AE0CD',
  },
  text: {
    fontSize: RFPercentage(1.4),
    textAlign: 'center',
    marginTop: 3,
  },
});

export default styles;
