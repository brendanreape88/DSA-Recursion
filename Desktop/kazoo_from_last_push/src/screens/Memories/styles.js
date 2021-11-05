import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#34B6A6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: 'white',
  },
  headerButton: {
    paddingBottom: 5,
  },
  headerIcon: {
    tintColor: 'white',
    height: width * 0.06,
    width: width * 0.06,
  },
  memoryDate: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  selectedMemoryContainer: {
    marginTop: 20,
    maxWidth: '90%',
    display: 'flex',
    alignItems: 'center',
    // borderWidth: 1,
  },
  memoryMediaContainer: {
    marginTop: 10,
    minWidth: '100%',
    height: 300,
  },
  memoryTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
  memoryDescription: {
    marginTop: 10,
  },
  memoryHistoryContainer: {
    minWidth: '100%',
    display: 'flex',
  },
  yearText: {
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 10,
  },
  video: {
    minHeight: 295,
  },
  selectedMemoryImage: {
    minHeight: 295,
    // minWidth: '100%',
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'red',
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
  noMemoriesMessage: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerContainer: {
    height: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    width: width * 0.95,
  },
  selectedDividerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  leftLine: {
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  dividerText: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontSize: 14,
    color: 'lightgrey',
  },
  rightLine: {
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
});

export default styles;
