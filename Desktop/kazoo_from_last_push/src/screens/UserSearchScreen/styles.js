import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
  },
  searchBarInput: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
  },
  searchBarContainer: {
    borderRadius: 5,
    //paddingTop: 40,
  },
  searchResultsContainer: {
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
  },
});

export default styles;
