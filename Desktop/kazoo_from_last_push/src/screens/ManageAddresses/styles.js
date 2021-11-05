import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#34B6A6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: '2.5%',
  },
  headerText: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    tintColor: 'white',
    height: width * 0.06,
    width: width * 0.06,
  },
  headerButton: {
    paddingBottom: 5,
  },
});

export default styles;
