import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { firebase } from '../../Core/firebase/config';
import ProfilePinnedGift from './ProfilePinnedGift';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const ProfilePinnedGifts = ({
  currentUser,
  otherUser,
  otherUserID,
  onCardPress,
  view,
  friendDocumentID,
  themeBackgroundColor,
  themeElementColor,
}) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const [pinnedGifts, setPinnedGifts] = useState([]);
  const [followingPinnedGifts, setFollowingPinnedGifts] = useState([]);
  const [offAppUserPinnedGifts, setOffAppUserPinnedGifts] = useState([]);
  const showPinnedGifts =
    (view === 'friend' && pinnedGifts.length > 0) ||
    (view === 'following' && followingPinnedGifts.length > 0) ||
    (view === 'off-app friend' && offAppUserPinnedGifts.length > 0)
      ? false
      : true;

  useEffect(() => {
    if (friendDocumentID) {
      const pinnedGiftsDB = firebase
        .firestore()
        .collection(
          `users/${currentUser.id}/friends/${friendDocumentID}/pinnedGifts`,
        );
      return pinnedGiftsDB.onSnapshot((snapshot) =>
        setPinnedGifts(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    } else {
      return () => {};
    }
  }, [currentUser.id, friendDocumentID]);

  useEffect(() => {
    if (view === 'following') {
      const pinnedGiftsDB = firebase
        .firestore()
        .collection(
          `users/${currentUser.id}/following/${otherUser.id}/pinnedGifts`,
        );
      return pinnedGiftsDB.onSnapshot((snapshot) =>
        setFollowingPinnedGifts(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    } else {
      return () => {};
    }
  }, [view, currentUser.id, otherUser.id]);

  useEffect(() => {
    if (view === 'off-app friend') {
      const pinnedGiftsDB = firebase
        .firestore()
        .collection(
          `users/${currentUser.id}/subUsers/${otherUser.id}/pinnedGifts`,
        );
      return pinnedGiftsDB.onSnapshot((snapshot) =>
        setOffAppUserPinnedGifts(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    } else {
      return () => {};
    }
  }, [view, currentUser.id, otherUser.id]);

  return (
    <View
      style={{
        backgroundColor: themeBackgroundColor,
      }}>
      <Text style={{ color: themeElementColor, ...styles.profileSectionTitle }}>
        Pinned Gifts
      </Text>
      {showPinnedGifts ? (
        <View style={styles.defaultMessageContainer}>
          <View style={styles.defaultMessageContentContainer}>
            <Text
              style={{
                color: themeElementColor,
                ...styles.defaultMessageText,
              }}>
              No pinned gifts to show yet.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.scrollViewContainer}>
          <ScrollView horizontal={true}>
            {view === 'friend' &&
              pinnedGifts?.map((item) => (
                <ProfilePinnedGift
                  onCardPress={onCardPress}
                  item={item}
                  key={item.productID}
                  pinned={true}
                  friendDocumentID={friendDocumentID}
                  themeBackgroundColor={themeBackgroundColor}
                  themeElementColor={themeElementColor}
                />
              ))}
            {view === 'following' &&
              followingPinnedGifts?.map((item) => (
                <ProfilePinnedGift
                  onCardPress={onCardPress}
                  item={item}
                  key={item.productID}
                  pinned={true}
                  friendDocumentID={friendDocumentID}
                  themeBackgroundColor={themeBackgroundColor}
                  themeElementColor={themeElementColor}
                />
              ))}
            {view === 'off-app friend' &&
              offAppUserPinnedGifts?.map((item) => (
                <ProfilePinnedGift
                  onCardPress={onCardPress}
                  item={item}
                  key={item.productID}
                  pinned={true}
                  friendDocumentID={friendDocumentID}
                  themeBackgroundColor={themeBackgroundColor}
                  themeElementColor={themeElementColor}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProfilePinnedGifts;
