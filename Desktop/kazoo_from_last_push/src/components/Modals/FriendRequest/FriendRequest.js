import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfileView, setOtherUserData } from '../../../redux/reducers/app';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';
import {
  deletePendingFriendship,
  newFriendship,
} from '../../../apis/firebase/friends';
import { blockUser } from '../../../apis/firebase/block';
import { removeFollowRelationship } from '../../../apis/firebase/follow';
import { useSelector } from 'react-redux';
import { firebase } from '../../../Core/firebase/config';
import { FlatGrid } from 'react-native-super-grid';
import RecipientButton from '../../../screens/SelectRecipentScreen/recipientButton';
import Moment from 'moment';
import MyPeopleButton from '../../../screens/MyPeopleScreen/MyPeopleButton';
import styles from './styles';

const FriendRequest = ({
  showFriendRequestModal,
  updateShowFriendRequestModal,
  notification,
  navigation,
}) => {
  const { width, height } = Dimensions.get('window');
  const currentUser = useSelector((state) => state.app.user);
  const otherUser = useSelector((state) => state.app.otherUser);
  const [sender, setSender] = useState({});
  const [mutualFriends, setMutualFriends] = useState([]);
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

  useEffect(() => {
    const currentUserFriendsArray = [];
    const otherUserFriendsArray = [];
    let mutualFriendsArray = [];
    const currentUserFriendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/friends`);
    currentUserFriendsDB
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          currentUserFriendsArray.push(doc.data());
        });
      })
      .then(() => {
        const otherUserFriendsDB = firebase
          .firestore()
          .collection(`users/${otherUser.id}/friends`);
        otherUserFriendsDB
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              otherUserFriendsArray.push(doc.data());
              mutualFriendsArray = currentUserFriendsArray.filter(
                ({ friendID: id1 }) =>
                  otherUserFriendsArray.some(
                    ({ friendID: id2 }) => id2 === id1,
                  ),
              );
            });
          })
          .then(() => {
            if (mutualFriendsArray.length > 10) {
              mutualFriendsArray.splice(0, 10);
              setMutualFriends(mutualFriendsArray);
            } else {
              setMutualFriends(mutualFriendsArray);
            }
          });
      });
  }, [otherUser, currentUser.id]);

  const deleteFriendRequestNotification = () => {
    const notificationsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/notifications`);
    notificationsDB
      .doc(notification.id)
      .delete()
      .then(() => {
        console.log('friend request notification deleted');
      });
  };

  return (
    <Modal visible={showFriendRequestModal} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.contentContainer,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Friend Profile');
              updateShowFriendRequestModal(false);
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
          <View style={styles.mutualFriendContainer}>
            <Text style={{ color: themeElementColor }}>
              {mutualFriends.length === 0 ? 'No ' : null}Mutual Friends
            </Text>
            {mutualFriends.length > 0 && (
              <View
                style={{
                  // borderWidth: 1,
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  // borderWidth: 1,
                  height: height * 0.1,
                  width: '100%',
                }}>
                {mutualFriends.slice(0, 4).map((friend) => (
                  <MyPeopleButton
                    navigation={navigation}
                    key={friend.friendID}
                    person={{ type: 'friend', id: friend.friendID, ...friend }}
                    screen={'friend request'}
                    updateShowFriendRequestModal={updateShowFriendRequestModal}
                  />
                ))}
              </View>
            )}
            {mutualFriends.length > 4 && (
              <View
                style={{
                  // borderWidth: 1,
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  // borderWidth: 1,
                  height: height * 0.1,
                  width: '100%',
                }}>
                {mutualFriends.slice(4, 8).map((friend) => (
                  <MyPeopleButton
                    navigation={navigation}
                    key={friend.friendID}
                    person={{ type: 'friend', id: friend.friendID, ...friend }}
                    screen={'friend request'}
                    updateShowFriendRequestModal={updateShowFriendRequestModal}
                  />
                ))}
              </View>
            )}
            {/* {mutualFriends.length ? (
              <FlatGrid
                itemDimension={width * 0.15}
                data={mutualFriends}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={15}
                renderItem={({ item }) => (
                  <RecipientButton
                    item={item}
                    navigation={navigation}
                    // updateRecipient={updateRecipient}
                    screen={'friend request modal'}
                    updateShowFriendRequestModal={updateShowFriendRequestModal}
                  />
                )}
              />
            ) : null} */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                updateShowFriendRequestModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.acceptButtonText}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => {
                deleteFriendRequestNotification();
                updateShowFriendRequestModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.rejectButtonText}>
                Reject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => {
                removeFollowRelationship(currentUser, sender);
                blockUser(sender, currentUser, notification.id);
                updateShowFriendRequestModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.rejectButtonText}>
                Block
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                removeFollowRelationship(currentUser, sender);
                newFriendship(sender, currentUser, notification.id);
                updateShowFriendRequestModal(false);
              }}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.acceptButtonText}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FriendRequest;
