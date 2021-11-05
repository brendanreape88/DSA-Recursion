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
    height: 0.3 * height,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  messageText: {
    textAlign: 'center',
    // paddingBottom: 30,
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
});

export default styles;
