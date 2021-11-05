import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noFriendsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFriendsContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  noFriendsAddFriendsButton: {
    borderWidth: 0.5,
    borderRadius: 65,
    borderColor: '#545454',
    marginTop: 10,
  },
  noFriendsAddFriendsIcon: {
    height: 15,
    width: 15,
    tintColor: '#545454',
    margin: 5,
  },
  birthdayContainer: {},
  birthdayStats: {},
  feedContainer: {
    flex: 1,
    alignItems: 'center',
  },
  friendsOfFriendsContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
});

export default styles;
