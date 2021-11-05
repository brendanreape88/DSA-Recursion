import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    paddingHorizontal: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
    height: '50%',
    //borderWidth: 1,
  },
  textInput: {
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  wrappingText: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 0,
  },
  gridView: {
    marginTop: 10,
    //flex: 1,
    // borderWidth: 1,
    marginHorizontal: '5%',
  },
  image: {
    height: width * 0.15,
    width: width * 0.15,
    borderRadius: 8,
    //borderColor: '#4AE0CD',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // padding: 10,
    height: width * 0.15,
    width: width * 0.15,
    // marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '200',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  itemSelected: {
    height: width * 0.16,
    width: width * 0.16,
    borderWidth: 2,
    borderColor: '#42E2CD',
  },
  sendButton: {
    backgroundColor: '#4AE0CD',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: '5%',
  },
  sendButtonText: {
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
