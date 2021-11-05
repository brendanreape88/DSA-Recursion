import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import addFriendIcon from '../../../assets/icons/add-friend.png';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import AddFriend from '../Modals/AddFriend/AddFriend';

const ProfileBackButtonHeader = ({ navigation, userFromSearch, user }) => {
  const [showModal, updateShowModal] = useState(false);

  const onAdd = () => {
    const newFriendRequest = {
      isAccepted: false,
      isRejected: false,
      requestedBy: user.id,
      requestedDate: firebase.firestore.Timestamp.fromDate(new Date()),
      userIds: [user.id, userFromSearch.id],
    };

    const friendsxRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.FRIENDS_X_REF);
    friendsxRef.add(newFriendRequest).then(() => {
      updateShowModal(false);
    });
  };

  return (
    <>
      <AddFriend
        onAdd={onAdd}
        showModal={showModal}
        updateShowModal={updateShowModal}
        userFromSearch={userFromSearch}
      />
      <View
        style={{
          backgroundColor: '#34B6A6',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '10%',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{ height: 20, width: 20, tintColor: 'white' }}
            source={arrowheadIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            updateShowModal(true);
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
              tintColor: userFromSearch ? 'white' : '#34B6A6',
            }}
            source={addFriendIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileBackButtonHeader;
