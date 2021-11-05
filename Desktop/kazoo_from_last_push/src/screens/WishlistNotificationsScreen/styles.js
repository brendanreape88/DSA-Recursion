import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
  },
  defaultMessageContentContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    width: 250,
  },
  defaultMessageText: {
    textAlign: 'center',
    color: '#545454',
  },
});

export default styles;
