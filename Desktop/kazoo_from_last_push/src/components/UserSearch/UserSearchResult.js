import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';
import AddFriend2 from '../Modals/AddFriend2/AddFriend2';
import { friendRequest } from '../../apis/firebase/notifications';
import { followUser } from '../../apis/firebase/follow';
import { useIsFocused } from '@react-navigation/native';

const UserSearchResult = ({ item, user, navigation }) => {
  const dispatch = useDispatch();
  const [showModal, updateShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState('stranger');
  const [buttonStatus, setButtonStatus] = useState(null);
  const isFocused = useIsFocused();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const friendsDB = firebase
      .firestore()
      .collection(`users/${user.id}/friends`);
    friendsDB
      .where('friendID', '==', item.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            setUserStatus('friend');
            setButtonStatus('friends');
          }
        });
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const pendingFriendsDB = firebase
      .firestore()
      .collection(`users/${user.id}/pendingFriends`);
    pendingFriendsDB
      .where('IDs', 'array-contains', item.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            setUserStatus('pending');
            setButtonStatus('pending');
          }
        });
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const followingDB = firebase
      .firestore()
      .collection(`users/${user.id}/following`);
    followingDB
      .doc(item.id)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setUserStatus('following');
          setButtonStatus('following');
        }
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const followersDB = firebase
      .firestore()
      .collection(`users/${user.id}/followers`);
    followersDB
      .doc(item.id)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setUserStatus('follower');
          setButtonStatus('follower');
        }
      });
  }, [isFocused]);

  const onAdd = () => {
    setUserStatus('following');
    setButtonStatus('following');
    followUser(user, item);
    friendRequest(user, item);
    updateShowModal(false);
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <AddFriend2
        item={item}
        showModal={showModal}
        updateShowModal={updateShowModal}
        onAdd={onAdd}
      />
      <TouchableOpacity
        style={styles.userProfileButtonContainer}
        onPress={() => {
          dispatch(setProfileView(userStatus));
          dispatch(setOtherUserData(item));
          navigation.navigate('Friend Profile');
        }}>
        <Image
          style={styles.userAvatarImage}
          source={{
            uri: item.profilePictureURL || defaultProfilePhotoURL,
          }}
        />
        <Text
          // adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{ color: themeElementColor, ...styles.userNameText }}>
          {item.firstName} {item.lastName}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {buttonStatus === 'friends' ? (
          <View style={styles.friendsView}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.friendsViewText}>
              friends
            </Text>
          </View>
        ) : buttonStatus === 'pending' ? (
          <View style={styles.sentView}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.sentViewText}>
              pending
            </Text>
          </View>
        ) : buttonStatus === 'following' ? (
          <View style={styles.sentView}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.sentViewText}>
              following
            </Text>
          </View>
        ) : buttonStatus === 'follower' ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(setProfileView('follower'));
              dispatch(setOtherUserData(item));
              navigation.navigate('Friend Profile');
            }}
            style={styles.sentView}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.sentViewText}>
              accept
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              updateShowModal(true);
            }}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.addButtonText}>
              add
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserSearchResult;
