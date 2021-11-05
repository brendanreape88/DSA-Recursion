import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  calendar: { borderBottomWidth: 1, borderColor: '#D9D9D9' },
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
  noFriendsText: {
    textAlign: 'center',
  },
});

export default styles;
