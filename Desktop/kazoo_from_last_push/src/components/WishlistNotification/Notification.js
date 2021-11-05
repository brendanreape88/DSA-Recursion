import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';
import GiftAccepted from '../Modals/GiftAccepted/GiftAccepted';
import FriendRequest from '../Modals/FriendRequest/FriendRequest';
import Shoutout from '../Modals/Shoutout/Shoutout';
import questionMark from '../../../assets/images/question-mark.png';
import FollowReferringUser from '../Modals/FollowReferringUser/FollowReferringUser';

const Notification = ({
  notification,
  currentUser,
  navigation,
  themeBackgroundColor,
  themeElementColor,
}) => {
  const dispatch = useDispatch();
  const [showFriendRequestModal, updateShowFriendRequestModal] = useState(
    false,
  );
  const [showGiftAcceptedModal, updateShowGiftAcceptedModal] = useState(false);
  const [showShoutoutModal, updateShowShoutoutModal] = useState(false);
  const [
    showFollowReferringUserModal,
    updateShowFollowReferringUserModal,
  ] = useState(false);
  const [shoutout, setShoutout] = useState(null);
  const [gift, setGift] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [notificationSender, setNotificationSender] = useState({});
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    if (!notification) {
      return null;
    }
    const users = firebase.firestore().collection('users');
    users
      .where('id', '==', notification.sender)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setNotificationSender(data);
          setAvatar(data.profilePictureURL);
        });
      });
  }, []);

  if (!notification) {
    return null;
  }

  console.log('notification dot sender', notification.sender);

  const onFriendRequest = () => {
    updateShowFriendRequestModal(true);
    dispatch(setProfileView('pending'));
    dispatch(setOtherUserData(notificationSender));
  };

  const onShoutout = () => {
    if (!notification.seen && !shoutout) {
      const notificationDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/notifications`);
      notificationDB
        .doc(notification.id)
        .update({
          seen: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('notification marked seen!');

          const shoutoutDB = firebase
            .firestore()
            .collection(`users/${currentUser.id}/shoutouts`);
          shoutoutDB
            .doc(notification.referenceID)
            .get()
            .then((doc) => {
              const data = doc.data();
              setShoutout({ id: doc.id, ...data });
              updateShowShoutoutModal(true);
              const shoutoutCopy = { ...doc.data() };
              const newMemory = {
                type: 'shoutout',
                senderFirstName: notification.senderFirstName,
                senderLastName: notification.senderLastName,
                referenceID: doc.id,
                ...shoutoutCopy,
              };
              const memoriesDB = firebase
                .firestore()
                .collection(`users/${currentUser.id}/memories`);
              memoriesDB
                .doc(doc.id)
                .set(newMemory)
                .then(() => {
                  console.log('new memory created!');
                });
            });
        });
    } else if (notification.seen && !shoutout) {
      const shoutoutDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/shoutouts`);
      shoutoutDB
        .doc(notification.referenceID)
        .get()
        .then((doc) => {
          const data = doc.data();
          setShoutout({ id: doc.id, ...data });
        })
        .then(() => {
          updateShowShoutoutModal(true);
        });
    } else {
      updateShowShoutoutModal(true);
    }
  };

  const onGift = () => {
    if (!gift) {
      const giftDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/gifts`);
      giftDB
        .doc(notification.referenceID)
        .get()
        .then((doc) => {
          const giftID = doc.id;
          const giftData = doc.data();
          let orderDocID;
          let status;
          const ordersDB = firebase.firestore().collection('shopertino_orders');
          ordersDB
            .where('id', '==', giftData.orderID)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                orderDocID = doc.id;
                status = doc.data().status;
              });
              setGift({
                id: giftID,
                orderDocID: orderDocID,
                status: status,
                ...giftData,
              });
              updateShowGiftAcceptedModal(true);
            });
        });
    } else {
      updateShowGiftAcceptedModal(true);
    }
  };

  // const onGift = () => {
  //   if (!notification.seen && !gift) {
  //     const notificationDB = firebase
  //       .firestore()
  //       .collection(`users/${currentUser.id}/notifications`);
  //     notificationDB
  //       .doc(notification.id)
  //       .update({
  //         seen: firebase.firestore.Timestamp.fromDate(new Date()),
  //       })
  //       .then(() => {
  //         console.log('notification marked seen!');

  //         const giftDB = firebase
  //           .firestore()
  //           .collection(`users/${currentUser.id}/gifts`);
  //         giftDB
  //           .doc(notification.referenceID)
  //           .get()
  //           .then((doc) => {
  //             const data = doc.data();
  //             setGift({ id: doc.id, ...data });
  //             updateShowGiftAcceptedModal(true);
  //             const giftCopy = { ...doc.data() };
  //             const newMemory = {
  //               type: 'gift',
  //               senderFirstName: notification.senderFirstName,
  //               senderLastName: notification.senderLastName,
  //               referenceID: doc.id,
  //               ...giftCopy,
  //             };
  //             const memoriesDB = firebase
  //               .firestore()
  //               .collection(`users/${currentUser.id}/memories`);
  //             memoriesDB
  //               .doc(doc.id)
  //               .set(newMemory)
  //               .then(() => {
  //                 console.log('new memory created!');
  //               });
  //           });
  //       });
  //   } else if (notification.seen && !gift) {
  //     const giftDB = firebase
  //       .firestore()
  //       .collection(`users/${currentUser.id}/gifts`);
  //     giftDB
  //       .doc(notification.referenceID)
  //       .get()
  //       .then((doc) => {
  //         const data = doc.data();
  //         setGift({ id: doc.id, ...data });
  //       })
  //       .then(() => {
  //         updateShowGiftAcceptedModal(true);
  //       });
  //   } else {
  //     updateShowGiftAcceptedModal(true);
  //   }
  // };

  const onFollowReferringUser = () => {
    updateShowFollowReferringUserModal(true);
    dispatch(setProfileView('stranger'));
    dispatch(setOtherUserData(notificationSender));
  };

  let message = '';
  let userStatus = false;
  let onButtonPress = false;

  switch (notification.type) {
    case 'friendRequest':
      message = notification.senderFirstName + ' sent you a friend request!';
      userStatus = 'stranger';
      onButtonPress = onFriendRequest;
      break;

    case 'friendAcceptance':
      message = notification.senderFirstName + ' accepted your friend request!';
      break;

    case 'shoutout':
      message = notification.senderFirstName + ' sent you a shoutout!';
      userStatus = 'friend';
      onButtonPress = onShoutout;
      break;

    case 'gift':
      message = notification.seen
        ? notification.senderFirstName + ' sent you a gift!'
        : 'Someone sent you a gift!';
      userStatus = notification.senderType;
      onButtonPress = onGift;
      break;

    case 'followReferringUser':
      message = 'Do you want to follow ' + notification.senderFirstName;
      userStatus = 'stranger';
      onButtonPress = onFollowReferringUser;
      break;

    default:
      break;
  }

  return (
    <View
      style={{
        backgroundColor: themeBackgroundColor,
        borderColor: themeElementColor,
        ...styles.container,
      }}>
      <FriendRequest
        navigation={navigation}
        notification={notification}
        showFriendRequestModal={showFriendRequestModal}
        updateShowFriendRequestModal={updateShowFriendRequestModal}
      />

      <FollowReferringUser
        navigation={navigation}
        notification={notification}
        showFollowReferringUserModal={showFollowReferringUserModal}
        updateShowFollowReferringUserModal={updateShowFollowReferringUserModal}
      />

      {shoutout && (
        <Shoutout
          shoutout={shoutout}
          showShoutoutModal={showShoutoutModal}
          updateShowShoutoutModal={updateShowShoutoutModal}
          notification={notification}
          currentUser={currentUser}
          avatar={avatar}
        />
      )}

      {gift && (
        <GiftAccepted
          showGiftAcceptedModal={showGiftAcceptedModal}
          gift={gift}
          avatar={avatar}
          notification={notification}
          currentUser={currentUser}
          navigation={navigation}
          updateShowGiftAcceptedModal={updateShowGiftAcceptedModal}
        />
      )}

      <>
        <View style={styles.avatarContainer}>
          {notification?.type === 'gift' && !notification?.seen ? (
            <Image style={styles.avatarImage} source={questionMark} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfileView(userStatus));
                dispatch(setOtherUserData(notificationSender));
                navigation.navigate('Friend Profile');
              }}>
              <Image
                style={styles.avatarImage}
                source={{ uri: avatar || defaultProfilePhotoURL }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={2}
            style={{ color: themeElementColor, ...styles.messageText }}>
            {message}
          </Text>
        </View>
        {onButtonPress && (
          <View
            style={{
              backgroundColor: themeBackgroundColor,
              ...styles.buttonContainer,
            }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: notification.seen
                    ? themeBackgroundColor
                    : '#42E2CD',
                },
              ]}
              onPress={() => onButtonPress(true)}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={[
                  styles.buttonText,
                  {
                    color: notification.seen ? '#42E2CD' : themeElementColor,
                  },
                ]}>
                {notification.seen ? 'View' : 'Open'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </View>
  );
};

export default Notification;
