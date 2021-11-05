import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { firebase } from '../../../Core/firebase/config';
import Moment from 'moment';
import styles from './styles';
import { followUser } from '../../../apis/firebase/follow';
import { friendRequest } from '../../../apis/firebase/notifications';

const FollowReferringUser = ({
  showFollowReferringUserModal,
  updateShowFollowReferringUserModal,
  notification,
  navigation,
}) => {
  const { width, height } = Dimensions.get('window');
  const currentUser = useSelector((state) => state.app.user);
  const otherUser = useSelector((state) => state.app.otherUser);
  const [sender, setSender] = useState({});
  const dispatch = useDispatch();
  const birthdate = Moment(otherUser.birthdate, 'MMDDYYYY');
  const birthdateDisplay = birthdate.format('MMM D');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  useEffect(() => {
    const users = firebase.firestore().collection('users');
    users
      .where('id', '==', notification.sender)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setSender(data);
        });
      });
  }, [notification.sender]);

  const deleteFollowReferringUserNotification = () => {
    const notificationsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/notifications`);
    notificationsDB
      .doc(notification.id)
      .delete()
      .then(() => {
        console.log('follow referring user notification deleted');
      });
  };

  return (
    <Modal visible={showFollowReferringUserModal} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.contentContainer,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Friend Profile');
              updateShowFollowReferringUserModal(false);
            }}>
            <Image
              source={{
                uri: otherUser.profilePictureURL || defaultProfilePhotoURL,
              }}
              style={styles.avatarMedium}
            />
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.leftLine} />
            <Text style={{ color: themeElementColor, ...styles.dividerText }}>
              {birthdateDisplay}
            </Text>
            <View style={styles.rightLine} />
          </View>
          <Text style={{ color: themeElementColor, ...styles.name }}>
            {otherUser.firstName} {otherUser.lastName}
          </Text>

          <View
            style={{
              height: height * 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: themeElementColor, ...styles.dividerText }}>
              Do you want to follow {otherUser.firstName} ?
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => {
                deleteFollowReferringUserNotification();
                updateShowFollowReferringUserModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.noButtonText}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => {
                deleteFollowReferringUserNotification();
                followUser(currentUser, otherUser);
                friendRequest(currentUser, otherUser);
                updateShowFollowReferringUserModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.yesButtonText}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FollowReferringUser;
