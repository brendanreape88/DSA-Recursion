import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import {
  updateGiftMessage,
  updateGiftWrapping,
} from '../../redux/reducers/checkout';
import { firebase } from '../../Core/firebase/config';
import ShoutoutSent from '../../components/Modals/ShoutoutSent/ShoutoutSent';
import MediaModal from '../../components/Modals/MediaModal/MediaModal';
import uuid4 from 'uuidv4';
import { createThumbnail } from 'react-native-create-thumbnail';
import { shoutout } from '../../apis/firebase/notifications';
import Header from '../../components/Headers/Header/Header';
import styles from './styles';
import {
  captureVideo,
  selectVideo,
  uploadFile,
} from '../../Core/helpers/images';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const ShoutOutScreen = (props) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const [shoutoutText, setShoutoutText] = useState('');
  const [shoutoutWrapping, setShoutoutWrapping] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [videoButtonText, setVideoButtonText] = useState('ATTACH VIDEO');
  const [videoURL, setVideoURL] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const videoFromDevice = async (source) => {
    const { user } = props;
    try {
      const title = source === 'storage' ? 'Select a video' : 'Record a video';
      const sourceFunc = source === 'storage' ? selectVideo : captureVideo;
      // Seems to be a bug in the image picker library if the modal
      // isn't completely closed before launching the camera
      // https://github.com/react-native-image-picker/react-native-image-picker/issues/1456
      await delay(500);
      const video = await sourceFunc(title);

      if (video) {
        setVideoButtonText('ATTACHING...');
        const metadata = { cacheControl: 'max-age=31536000' };
        const downloadUrl = await uploadFile(
          `video-shoutouts/${user.id}/${video.uniqueName}`,
          video.storagePath,
          metadata,
        );
        setVideoURL(downloadUrl);
        const thumbRes = await createThumbnail({
          url: downloadUrl,
          timeStamp: 1000,
        });
        const thumbFileName = `${uuid4()}.jpg`;
        const thumbDownloadUrl = await uploadFile(
          `video-thumbnails/${user.id}/${thumbFileName}`,
          thumbRes.path,
          metadata,
        );
        setThumbnailURL(thumbDownloadUrl);
        setVideoButtonText('SUCCESS');
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Unable to upload video, please try again.');
      setVideoButtonText('ATTACH VIDEO');
    }
  };

  const onSendShoutout = () => {
    const sender = props.user;
    const recipient = props.route.params.selectedFriendId;

    const newShoutout = {
      message: shoutoutText,
      video: videoURL,
      thumbnail: thumbnailURL,
      recipient: recipient,
      sender: sender.id,
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      wrapping: shoutoutWrapping,
      // userIds: [props.route.params.selectedFriendId, props.user.id],
      // markedRead: false,
      posted: false,
    };

    const shoutoutDB = firebase
      .firestore()
      .collection(`users/${recipient}/shoutouts`);
    shoutoutDB.add(newShoutout).then((docRef) => {
      const referenceID = docRef.id;
      shoutout(sender, recipient, referenceID);
      setShowModal(true);
      setVideoButtonText('ATTACH VIDEO');
      setVideoURL(null);
      setThumbnailURL(null);
    });
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <ShoutoutSent
        showModal={showModal}
        setShowModal={setShowModal}
        setShoutoutText={setShoutoutText}
        setVideoURL={setVideoURL}
        setVideoButtonText={setVideoButtonText}
        navigation={props.navigation}
      />
      <MediaModal
        showMediaModal={showMediaModal}
        setShowMediaModal={setShowMediaModal}
        videoFromDevice={videoFromDevice}
      />
      <Header route={props.route} />

      {videoURL && <Image source={{ uri: videoURL }} />}

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.messageContainer}>
          <TextInput
            style={{
              borderColor: themeElementColor,
              color: themeElementColor,
              ...styles.textInput,
            }}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setShoutoutText(text)}
            defaultValue={shoutoutText}
            placeholder="type a message..."
            placeholderTextColor={themeElementColor}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
        <TouchableOpacity
          style={{ ...styles.sendButton, marginBottom: 10 }}
          onPress={() => setShowMediaModal(true)}>
          <Text style={styles.sendButtonText}>{videoButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => onSendShoutout()}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = ({ app, checkout }) => {
  return {
    user: app.user,
    giftMessage: checkout.giftMessage,
    giftWrapping: checkout.giftWrapping,
  };
};

export default connect(mapStateToProps, {
  updateGiftWrapping,
  updateGiftMessage,
})(ShoutOutScreen);
