import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { firebase } from '../../../Core/firebase/config';
import styles from './styles';
import { useSelector } from 'react-redux';

const Shoutout = ({
  shoutout,
  showShoutoutModal,
  updateShowShoutoutModal,
  notification,
  currentUser,
  avatar,
}) => {
  const { width } = Dimensions.get('window');
  const [posted, setPosted] = useState(shoutout.posted);
  const [referenceID, setReferenceID] = useState(shoutout.id);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  const togglePost = async () => {
    delete shoutout.id;
    delete shoutout.posted;
    delete shoutout.dateCreated;

    const newPost = {
      type: 'shoutout',
      datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
      authorID: currentUser.id,
      authorFirstName: currentUser.firstName,
      authorLastName: currentUser.lastName,
      senderFirstName: notification.senderFirstName,
      senderLastName: notification.senderLastName,
      referenceID,
      ...shoutout,
    };

    setReferenceID(newPost.referenceID);

    if (!posted) {
      const batch = firebase.firestore().batch();
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/posts`)
        .doc(referenceID);
      const friendsTop = firebase
        .firestore()
        .collection('friends')
        .doc(currentUser.id);
      const shoutoutsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/shoutouts`)
        .doc(referenceID);
      const memoriesDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/memories`)
        .doc(referenceID);
      batch.set(postsDB, newPost);
      const friendDoc = {
        lastPost: firebase.firestore.Timestamp.fromDate(new Date()),
        recentPosts: firebase.firestore.FieldValue.arrayUnion({
          postID: newPost.referenceID,
          datePosted: firebase.firestore.Timestamp.fromDate(new Date()),
        }),
      };
      batch.update(friendsTop, friendDoc);
      batch.update(shoutoutsDB, { posted: true });
      batch.update(memoriesDB, { posted: true });
      await batch.commit();
      setPosted(true);
    } else {
      const arrayItemToRemove = firebase.firestore().collection('friends');
      const doc = await arrayItemToRemove.doc(currentUser.id).get();
      const arrayOfRecentPosts = doc.data().recentPosts;
      const filteredRecentPosts = arrayOfRecentPosts.filter(
        (post) => post.postID !== referenceID,
      );

      const batch = firebase.firestore().batch();
      const postsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/posts`)
        .doc(referenceID);
      const shoutoutsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/shoutouts`)
        .doc(referenceID);
      const memoriesDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/memories`)
        .doc(referenceID);
      batch.delete(postsDB);
      batch.update(doc.ref, { recentPosts: filteredRecentPosts });
      batch.update(shoutoutsDB, { posted: false });
      batch.update(memoriesDB, { posted: false });
      await batch.commit();
      setPosted(false);
    }
  };

  return (
    <Modal visible={showShoutoutModal} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            borderColor: themeElementColor,
            ...styles.contentContainer,
          }}>
          <Image
            style={styles.avatarImage}
            source={{ uri: avatar || defaultProfilePhotoURL }}
          />
          <Text style={{ color: themeElementColor, ...styles.messageText }}>
            "{shoutout?.message && shoutout.message}"
          </Text>

          <View style={{ marginBottom: 10 }}>
            {shoutout.video && (
              <VideoPlayer
                source={{ uri: shoutout.video }}
                style={{
                  ...styles.video,
                  width: width * 0.8, //0.81
                  maxHeight: width * 0.7, //0.81
                  // borderRadius: 20,
                }}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                updateShowShoutoutModal(false);
              }}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => togglePost()}>
              <Text style={styles.buttonText}>
                {posted ? 'Unpost' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Shoutout;
