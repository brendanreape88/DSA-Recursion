import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { firebase } from '../../Core/firebase/config';
import ProfileWishlistItem from './ProfileWishlistItem';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const ProfileWishlist = ({
  currentUser,
  otherUser,
  otherUserID,
  onCardPress,
  view,
}) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const currentUserWishlist = useSelector((state) => state.app.wishlist);
  const [otherUserWishlist, setOtherUserWishlist] = useState([]);
  const fetchData = view === 'friend' || view === 'following' ? true : false;
  const showNoWishlistItemsMessage =
    (view !== 'current user' && otherUserWishlist.length === 0) ||
    (view === 'current user' && currentUserWishlist.length === 0)
      ? true
      : false;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (fetchData) {
      const wishlistDB = firebase
        .firestore()
        .collection(`users/${otherUserID}/wishlist`);
      return wishlistDB
        .limit(10)
        .onSnapshot((snapshot) =>
          setOtherUserWishlist(
            snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
          ),
        );
    }
  }, [fetchData, otherUserID]);

  return (
    <View
      style={{
        backgroundColor: themeBackgroundColor,
        ...styles.profileSectionContainer,
      }}>
      <Text style={{ color: themeElementColor, ...styles.profileSectionTitle }}>
        Wishlist
      </Text>
      {showNoWishlistItemsMessage ? (
        <View style={styles.defaultMessageContainer}>
          <View style={styles.defaultMessageContentContainer}>
            <Text
              style={{
                color: themeElementColor,
                ...styles.defaultMessageText,
              }}>
              No wishlist items to show yet.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.scrollViewContainer}>
          <ScrollView horizontal={true}>
            {view === 'current user' &&
              currentUserWishlist &&
              currentUserWishlist.map((item) => (
                <ProfileWishlistItem
                  onCardPress={onCardPress}
                  item={item}
                  key={item.productID}
                />
              ))}
            {view !== 'current user' &&
              otherUserWishlist &&
              otherUserWishlist.map((item) => (
                <ProfileWishlistItem
                  onCardPress={onCardPress}
                  item={item}
                  key={item.productID}
                  purchaseFromWishlistID={otherUser.id}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProfileWishlist;
