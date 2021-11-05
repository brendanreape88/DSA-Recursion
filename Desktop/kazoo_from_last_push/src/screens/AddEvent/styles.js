import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#34B6A6',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },
  headerText: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  headerIcon: {
    tintColor: 'white',
    height: width * 0.06,
    width: width * 0.06,
  },
  headerButton: {
    flex: 1,
    position: 'absolute',
    left: '2.5%',
    bottom: '23%',
    zIndex: 1000,
  },
});

export default styles;
