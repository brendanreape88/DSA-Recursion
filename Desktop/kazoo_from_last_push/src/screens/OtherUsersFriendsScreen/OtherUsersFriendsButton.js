import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';

const OtherUsersFriendsButton = ({
  navigation,
  item,
  otherUser,
  profileView,
  currentUser,
}) => {
  const { width, height } = Dimensions.get('window');
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState('stranger');
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const usersDB = firebase.firestore().collection('users');
    usersDB
      .doc(item)
      .get()
      .then((doc) => {
        setUserData(doc.data());
      });
  }, []);

  useEffect(() => {
    const friendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/friends`);
    friendsDB
      .where('friendID', '==', item)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            setView('friend');
          }
        });
      });
  }, []);

  useEffect(() => {
    const friendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/following`);
    friendsDB
      .doc(item)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setView('following');
        }
      });
  }, []);

  useEffect(() => {
    const friendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/blockedUsers`);
    friendsDB
      .doc(item)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setView('blocked');
        }
      });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        const previousOtherUser = otherUser;
        const previousProfileView = profileView;
        dispatch(setProfileView(view));
        dispatch(setOtherUserData(userData));
        navigation.navigate('Friend Profile', {
          previousOtherUser: previousOtherUser,
          previousProfileView: previousProfileView,
        });
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        height: width * 0.2,
        width: width * 0.2,
      }}>
      {userData && (
        <>
          <Image
            style={{
              borderWidth: 2,
              borderColor: '#4AE0CD',
              borderRadius: 65,
              height: width * 0.12,
              width: width * 0.12,
              marginBottom: 5,
            }}
            source={{ uri: userData.profilePictureURL }}
          />
          <Text
            numberOfLines={1}
            style={{ fontSize: RFPercentage(1.5), color: themeElementColor }}>
            {userData.firstName}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default OtherUsersFriendsButton;
