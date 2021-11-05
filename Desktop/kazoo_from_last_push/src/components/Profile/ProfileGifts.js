import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { firebase } from '../../Core/firebase/config';
import ProfileGift from './ProfileGift';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const ProfileGifts = ({
  currentUser,
  otherUserID,
  otherUser,
  view,
  onCardPress,
  themeBackgroundColor,
  themeElementColor,
}) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const currentUserGifts = useSelector((state) => state.app.gifts);
  const [otherUserGifts, setOtherUserGifts] = useState([]);
  const showNoGiftsMessage =
    (view !== 'current user' && otherUserGifts.length === 0) ||
    (view === 'current user' && currentUserGifts.length === 0)
      ? true
      : false;

  useEffect(() => {
    if (view === 'friend') {
      const giftsDB = firebase
        .firestore()
        .collection(`users/${otherUserID}/gifts`);
      return giftsDB
        .limit(10)
        .onSnapshot((snapshot) =>
          setOtherUserGifts(
            snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
          ),
        );
    }
  }, [view, otherUserID]);

  useEffect(() => {
    if (view === 'off-app friend') {
      const giftsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/subUsers/${otherUser.id}/gifts`);
      return giftsDB
        .limit(10)
        .onSnapshot((snapshot) =>
          setOtherUserGifts(
            snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
          ),
        );
    }
  }, [view, currentUser, otherUser]);

  return (
    <View style={{ backgroundColor: themeBackgroundColor }}>
      <Text style={{ color: themeElementColor, ...styles.profileSectionTitle }}>
        Gifts
      </Text>
      {showNoGiftsMessage ? (
        <View style={styles.defaultMessageContainer}>
          <View style={styles.defaultMessageContentContainer}>
            <Text
              style={{
                color: themeElementColor,
                ...styles.defaultMessageText,
              }}>
              No gifts to show yet.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.scrollViewContainer}>
          <ScrollView horizontal={true}>
            {view === 'current user' &&
              currentUserGifts &&
              currentUserGifts.map((gift) =>
                gift.items ? (
                  gift.items.map((item) => (
                    <ProfileGift
                      onCardPress={onCardPress}
                      item={item}
                      key={item.id}
                    />
                  ))
                ) : (
                  <ProfileGift
                    onCardPress={onCardPress}
                    item={gift}
                    key={gift.productID}
                  />
                ),
              )}
            {view !== 'current user' &&
              otherUserGifts &&
              otherUserGifts.map((gift) =>
                gift.items ? (
                  gift.items.map((item) => (
                    <ProfileGift
                      onCardPress={onCardPress}
                      item={item}
                      key={item.id}
                    />
                  ))
                ) : (
                  <ProfileGift
                    onCardPress={onCardPress}
                    item={gift}
                    key={gift.productID}
                  />
                ),
              )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProfileGifts;
