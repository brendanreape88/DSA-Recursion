import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 13,
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
  button: {
    borderBottomWidth: 1,
    marginBottom: 1,
    borderColor: '#545454',
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  subButton: {
    borderBottomWidth: 1,
    borderColor: '#545454',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#545454',
  },
});

export default styles;
