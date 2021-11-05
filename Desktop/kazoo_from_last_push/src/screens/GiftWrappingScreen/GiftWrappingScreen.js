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
  updateGiftVideo,
  updateGiftThumbnail,
} from '../../redux/reducers/checkout';
import uuid4 from 'uuidv4';
import { createThumbnail } from 'react-native-create-thumbnail';
import Header from '../../components/Headers/Header/Header';
import MediaModal from '../../components/Modals/MediaModal/MediaModal';
import styles from './styles';
import {
  captureVideo,
  selectVideo,
  uploadFile,
} from '../../Core/helpers/images';
import { useSelector } from 'react-redux';
import {} from 'react-native';

const { width } = Dimensions.get('window');

const GiftWrappingScreen = (props) => {
  const { currentUserID } = props;
  const [videoButtonText, setVideoButtonText] = useState('ATTACH VIDEO');
  const [videoURL, setVideoURL] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const items = [
    {
      name: 'wrapping1',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/ygszj9H/wrapping1.png',
    },
    {
      name: 'wrapping2',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/72YJPfV/wrapping-2.png',
    },
    {
      name: 'wrapping3',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/dJf3gfj/wrapping3.png',
    },
    {
      name: 'wrapping4',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/k3zdbH9/wrapping4.png',
    },
    {
      name: 'wrapping5',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/px1Xk27/wrapping2.png',
    },
    {
      name: 'wrapping6',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/ynMjnWp/wrapping6.png',
    },
    {
      name: 'wrapping7',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/GCHMmCP/wrapping7.png',
    },
    {
      name: 'wrapping8',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/4K039vs/wrapping8.png',
    },
    {
      name: 'wrapping9',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/7bCMQYb/wrapping9.png',
    },
    {
      name: 'wrapping10',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/m0L7Z7x/wrapping10.png',
    },
    {
      name: 'wrapping11',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/sVcpkTP/wrapping11.png',
    },
    {
      name: 'wrapping12',
      code: '#1abc9c',
      pictureURI: 'https://i.ibb.co/VYszt29/wrapping12.png',
    },
  ];

  const videoFromDevice = async (source) => {
    try {
      const title = 'Select a video';
      const sourceFunc = source === 'storage' ? selectVideo : captureVideo;
      const video = await sourceFunc(title);
      if (video) {
        setVideoButtonText('ATTACHING...');
        const metadata = { cacheControl: 'max-age=31536000' };
        const downloadUrl = await uploadFile(
          `video-shoutouts/${currentUserID}/${video.uniqueName}`,
          video.storagePath,
          metadata,
        );
        setVideoURL(downloadUrl);
        const thumbnail = await createThumbnail({
          url: downloadUrl,
          timeStamp: 1000,
        });
        const thumbFileName = `${uuid4()}.jpg`;
        const thumbDownloadURL = await uploadFile(
          `video-thumbnails/${currentUserID}/${thumbFileName}`,
          thumbnail.path,
          metadata,
        );
        setVideoThumbnail(thumbDownloadURL);
        setVideoButtonText('SUCCESS');
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Unable to upload video, please try again.');
      setVideoButtonText('ATTACH VIDEO');
    }
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
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
            onChangeText={props.updateGiftMessage}
            value={props.giftMessage}
            placeholder="type a message..."
            placeholderTextColor={themeElementColor}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.wrappingContainer}>
        <Text style={{ color: themeElementColor, ...styles.wrappingText }}>
          Choose wrapping
        </Text>

        <FlatGrid
          itemDimension={width * 0.18}
          data={items}
          style={styles.gridView}
          //staticDimension={300}
          //fixed
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                props.updateGiftWrapping(item.pictureURI);
              }}>
              <View
                style={[
                  styles.itemContainer,
                  item.pictureURI === props.giftWrapping && styles.itemSelected,
                ]}>
                <Image style={styles.image} source={{ uri: item.pictureURI }} />
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={{ ...styles.nextButton, marginBottom: 10 }}
          onPress={() => setShowMediaModal(true)}>
          <Text style={styles.nextButtonText}>{videoButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            props.updateGiftVideo(videoURL);
            props.updateGiftThumbnail(videoThumbnail);
            props.navigation.navigate('PaymentMethod');
            setVideoButtonText('ATTACH VIDEO');
            setVideoURL(null);
          }}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = ({ checkout }) => {
  return {
    giftMessage: checkout.giftMessage,
    giftWrapping: checkout.giftWrapping,
    giftVideo: checkout.giftVideo,
    giftThumbnail: checkout.giftThumbnail,
    currentUserID: checkout.currentUserID,
  };
};

export default connect(mapStateToProps, {
  updateGiftWrapping,
  updateGiftMessage,
  updateGiftVideo,
  updateGiftThumbnail,
})(GiftWrappingScreen);
