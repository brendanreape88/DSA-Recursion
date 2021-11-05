import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderColor: '#545454',
    alignItems: 'center',
    padding: 10,
  },
  headerAvatar: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#4AE0CD',
  },
  headerUserName: {
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    resizeMode: 'contain',
  },
  senderBannerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E1FFFB',
    borderColor: '#545454',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  senderBannerText: {
    fontStyle: 'italic',
    marginLeft: 5,
    marginRight: 5,
  },
  senderBannerUserName: {
    fontWeight: 'bold',
  },
  senderBannerAvatar: {
    height: 30,
    width: 30,
    borderRadius: 65,
    borderWidth: 1.5,
    borderColor: '#4AE0CD',
    marginRight: 5,
  },
  messageContainer: {
    padding: 10,
  },
  video: {
    height: 300,
  },
  mediaContainer: {
    minWidth: '100%',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
  },
  paginationBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: '100%',
    height: 18,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34B6A6',
    margin: 3,
  },
});

export default styles;
