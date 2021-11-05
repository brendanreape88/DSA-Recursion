import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';

const MyPeopleButton = ({
  navigation,
  person,
  screen,
  updateShowFriendRequestModal,
}) => {
  const { width, height } = Dimensions.get('window');
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    if (person.id && person.type !== 'off-app friend') {
      const usersDB = firebase.firestore().collection('users');
      usersDB
        .doc(person.id)
        .get()
        .then((doc) => {
          setUserData(doc.data());
        });
    } else if (person.id && person.type === 'off-app friend') {
      setUserData(person);
    } else {
      return () => {};
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setOtherUserData(userData));
        dispatch(setProfileView(person.type));
        navigation.navigate('Friend Profile');
        if (screen === 'friend request') {
          updateShowFriendRequestModal(false);
        }
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
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
            source={{
              uri: userData.profilePictureURL || defaultProfilePhotoURL,
            }}
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

export default MyPeopleButton;
