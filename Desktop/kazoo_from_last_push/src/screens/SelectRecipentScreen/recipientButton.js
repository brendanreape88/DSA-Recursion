import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';

const RecipientButton = ({
  navigation,
  updateRecipient,
  item,
  screen,
  updateShowFriendRequestModal,
  type,
  friendsToPinGiftsFor,
  setFriendsToPinGiftsFor,
  followingToPinGiftsFor,
  setFollowingToPinGiftsFor,
  subUsersToPinGiftsFor,
  setSubUsersToPinGiftsFor,
  sendGiftTo,
  setSendGiftTo,
}) => {
  const [avatar, setAvatar] = useState('');
  const { width } = Dimensions.get('window');
  const id =
    item.friendID ||
    item.following ||
    item.userBeingFollowed ||
    item.documentID;
  const selected =
    friendsToPinGiftsFor.indexOf(item.documentID) > -1 ||
    followingToPinGiftsFor.indexOf(item.documentID) > -1 ||
    subUsersToPinGiftsFor.indexOf(item.documentID) > -1 ||
    (type === 'send as gift' && sendGiftTo === id);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    if (item.type === 'friend' && item.friendID === sendGiftTo) {
      dispatch(updateRecipient(item));
    }

    if (item.type === 'following' && item.userBeingFollowed === sendGiftTo) {
      dispatch(updateRecipient(item));
    }

    if (item.type === 'sub user' && item.documentID === sendGiftTo) {
      dispatch(updateRecipient(item));
    }

    if (!item?.profilePictureURL) {
      const users = firebase.firestore().collection('users');
      users
        .doc(id)
        .get()
        .then((doc) => {
          setAvatar(doc.data().profilePictureURL);
        });
    }
  }, [item, id]);

  const selectUsers = () => {
    if (!selected && item.type === 'friend') {
      setFriendsToPinGiftsFor([item.documentID, ...friendsToPinGiftsFor]);
    } else if (selected && item.type === 'friend') {
      const selectedFriendRemoved = friendsToPinGiftsFor.filter(
        (userId) => userId !== item.documentID,
      );
      setFriendsToPinGiftsFor(selectedFriendRemoved);
    } else if (!selected && item.type === 'following') {
      setFollowingToPinGiftsFor([item.documentID, ...followingToPinGiftsFor]);
    } else if (selected && item.type === 'following') {
      const selectedFollowingRemoved = followingToPinGiftsFor.filter(
        (userId) => userId !== item.documentID,
      );
      setFollowingToPinGiftsFor(selectedFollowingRemoved);
    } else if (!selected && item.type === 'sub user') {
      setSubUsersToPinGiftsFor([item.documentID, ...subUsersToPinGiftsFor]);
    } else if (selected && item.type === 'sub user') {
      const selectedSubUserRemoved = subUsersToPinGiftsFor.filter(
        (userId) => userId !== item.documentID,
      );
      setSubUsersToPinGiftsFor(selectedSubUserRemoved);
    } else {
      return () => {};
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (screen === 'friend request modal') {
          dispatch(setOtherUserData(item));
          dispatch(setProfileView('friend'));
          navigation.navigate('Friend Profile');
          updateShowFriendRequestModal(false);
        } else if (type === 'pin gift') {
          selectUsers();
        } else {
          dispatch(
            updateRecipient({ relationshipToCurrentUser: item.type, ...item }),
          );
          setSendGiftTo(id);
          // navigation.navigate('Gift Wrapping');
        }
      }}>
      <View
        style={
          screen !== 'friend request modal'
            ? styles.itemContainer
            : {
                height: width * 0.15,
                width: width * 0.15,
                marginBottom: 10,
              }
        }>
        <Image
          style={{
            height: width * 0.12,
            width: width * 0.12,
            borderRadius: 65,
            borderWidth: selected ? 6 : 2,
            borderColor: '#4AE0CD',
          }}
          source={{
            uri: avatar || item.profilePictureURL || defaultProfilePhotoURL,
          }}
        />
        <Text
          numberOfLines={1}
          style={{ color: themeElementColor, ...styles.itemName }}>
          {item.firstName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipientButton;
