import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderWidth: 0.25,
    borderColor: '#545454',
    //borderRadius: 5,
    //padding: 10,
    height: 200,
    backgroundColor: 'white',
  },
  itemprice: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#545454',
    padding: 10,
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
  addItemsText: {
    marginTop: 10,
  },
  wishlistImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  priceContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 0,
    bottom: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  nameContainer: {
    backgroundColor: 'white',
    //height: 40,
    //borderRightWidth: 0.25,
    //borderLeftWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: '#545454',
  },
});

export default styles;
