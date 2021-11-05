import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, TouchableOpacity, Text } from 'react-native';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import styles from './styles';

const FriendOfFriendAvatar = ({ item, props }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  // const [userStatus, setUserStatus] = useState(null);
  const currentUserID = useSelector((state) => state.app.user.id);
  const [userType, setUserType] = useState(null);
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    const usersDB = firebase.firestore().collection('users');
    usersDB
      .doc(item.friendID)
      .get()
      .then((doc) => {
        setAvatar(doc.data().profilePictureURL);
        setOtherUser(doc.data());

        const followersDB = firebase
          .firestore()
          .collection(`users/${currentUserID}/followers`);
        followersDB
          .doc(item.friendID)
          .get()
          .then((doc) => {
            if (doc.data()) {
              setUserType('follower');
            } else {
              setUserType('stranger');
            }
          });
      });
  }, [currentUserID, item]);

  const viewProfile = () => {
    dispatch(setProfileView(userType));
    dispatch(setOtherUserData(otherUser));
    props.navigation.navigate('Non Friend Profile');
  };

  return (
    otherUser && (
      <TouchableOpacity style={styles.button} onPress={() => viewProfile()}>
        <Image
          source={{ uri: avatar || defaultProfilePhotoURL }}
          style={styles.avatar}
        />
        <Text style={{ color: themeElementColor, ...styles.text }}>
          {item.firstName}
        </Text>
      </TouchableOpacity>
    )
  );
};

export default FriendOfFriendAvatar;
