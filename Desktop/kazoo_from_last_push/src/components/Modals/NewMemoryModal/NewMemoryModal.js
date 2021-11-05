import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Sentry from '@sentry/react-native';
import arrowhead from '../../../../assets/icons/arrowhead-icon.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../../Core/firebase/config';
import uuidv4 from 'uuidv4';
import { createThumbnail } from 'react-native-create-thumbnail';
import {
  selectImages,
  selectVideo,
  uploadFile,
} from '../../../Core/helpers/images';
import { useSelector } from 'react-redux';

const NewMemoryModal = ({ showModal, setShowModal, currentUserID }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const { width, height } = Dimensions.get('window');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const [message, setMessage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [memoryLoading, setMemoryLoading] = useState(false);
  const [photoButtonText, setPhotoButtonText] = useState('Upload Photos');
  const [videoButtonText, setVideoButtonText] = useState('Upload Video');
  const [memoryButtonText, setMemoryButtonText] = useState('Create');

  const uploadPhotos = async () => {
    const photosArray = [];

    try {
      const images = await selectImages(
        'Select one or more photos to upload.',
        500, // max width
        500, // max height
        5, // selection limit
      );
      setPhotoLoading(true);
      for (const img of images) {
        const metadata = { cacheControl: 'max-age=31536000' };
        const downloadUrl = await uploadFile(
          `memory-photos/${currentUserID}/${img.uniqueName}`,
          img.storagePath,
          metadata,
        );
        photosArray.push(downloadUrl);
      }
      if (photosArray.length > 0) {
        setPhotoButtonText('Success');
        setPhotos(photosArray);
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Unable to upload photos, please try again.');
      setPhotoButtonText('Upload Photos');
    } finally {
      setPhotoLoading(false);
    }
  };

  const uploadVideo = async () => {
    try {
      const selectedVideo = await selectVideo('Select a video');
      if (selectedVideo) {
        setVideoLoading(true);
        const metadata = { cacheControl: 'max-age=31536000' };
        const downloadUrl = await uploadFile(
          `video-shoutouts/${currentUserID}/${selectedVideo.uniqueName}`,
          selectedVideo.storagePath,
          metadata,
        );
        setVideo(downloadUrl);

        const thumbRes = await createThumbnail({
          url: downloadUrl,
          timeStamp: 1000,
        });
        const thumbFileName = `${uuidv4()}.jpg`;
        const thumbMetadata = {
          cacheControl: 'max-age=31536000',
        };
        const thumbDownloadUrl = await uploadFile(
          thumbFileName,
          thumbRes.path,
          thumbMetadata,
        );
        setThumbnail(thumbDownloadUrl);
        setVideoButtonText('Success');
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Unable to upload videos, please try again.');
    } finally {
      setVideoLoading(false);
    }
  };

  const validateNewMemory = () => {
    if (year?.trim().length !== 4) {
      Alert.alert(
        'Incomplete',
        'Please enter a year',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    } else if (photos === [] && video === null) {
      Alert.alert(
        'Incomplete',
        'Please attach a photo or video',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    } else {
      uploadMemory();
    }
  };

  const uploadMemory = () => {
    setMemoryLoading(true);

    const photoObjArray = photos.map((p) => {
      return { type: 'image', uri: p };
    });

    let media;
    if (video && photoObjArray) {
      media = [
        {
          type: 'video',
          uri: video,
        },
        ...photoObjArray,
      ];
    } else if (!video && photoObjArray) {
      media = photoObjArray;
    } else {
      media = [];
    }

    const newMemory = {
      type: 'custom',
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      posted: false,
      month: month,
      day: day,
      year: year,
      message: message,
      photo: photo,
      photos: photos,
      video: video,
      thumbnail: thumbnail,
      mediaArray: media,
    };

    const memoryDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/memories`);
    memoryDB.add(newMemory).then(() => {
      console.log('new memory uploaded!');

      setMemoryLoading(false);
      setMemoryButtonText('Success');

      setTimeout(() => {
        setShowModal(false);
        setMonth(null);
        setDay(null);
        setYear(null);
        setMessage(null);
        setPhoto(null);
        setPhotos([]);
        setVideo(null);
        setThumbnail(null);
        setPhotoLoading(false);
        setVideoLoading(false);
        setMemoryLoading(false);
        setPhotoButtonText('Upload Photos');
        setVideoButtonText('Upload Video');
        setMemoryButtonText('Create');
      }, 1000);
    });
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            height: height * 0.7,
            width: width * 0.9,
            borderRadius: 20,
            alignItems: 'center',
            // padding: 10,
            borderWidth: 2,
            borderColor: '#4AE0CD',
          }}>
          <View
            style={{
              height: '15%',
              width: '100%',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ position: 'absolute', left: '5%', top: '47%' }}>
              <Image
                source={arrowhead}
                style={{
                  height: width * 0.06,
                  width: width * 0.06,
                  tintColor: themeElementColor,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(4),
                color: themeElementColor,
              }}>
              New Memory
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              height: '80%',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Date
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: '10%',
                  marginRight: '10%',
                  marginBottom: 20,
                }}>
                <TextInput
                  style={{
                    flex: 2,
                    marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: themeElementColor,
                    color: themeElementColor,
                  }}
                  placeholder={'mm'}
                  placeholderTextColor={themeElementColor}
                  onChangeText={(m) => setMonth(m)}
                  value={month}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={2}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
                <TextInput
                  style={{
                    flex: 2,
                    marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: themeElementColor,
                    color: themeElementColor,
                  }}
                  placeholder={'dd'}
                  placeholderTextColor={themeElementColor}
                  onChangeText={(d) => setDay(d)}
                  value={day}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={2}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
                <TextInput
                  style={{
                    flex: 4,
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: themeElementColor,
                    color: themeElementColor,
                  }}
                  placeholder={'yyyy'}
                  placeholderTextColor={themeElementColor}
                  onChangeText={(y) => setYear(y)}
                  value={year}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={4}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  marginBottom: 10,
                  color: themeElementColor,
                }}>
                Message
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: '10%',
                  marginRight: '10%',
                  marginBottom: 20,
                }}>
                <TextInput
                  style={{
                    flex: 2,
                    marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: themeElementColor,
                    color: themeElementColor,
                  }}
                  placeholder={'type your message here...'}
                  placeholderTextColor={themeElementColor}
                  onChangeText={(m) => setMessage(m)}
                  value={message}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={uploadPhotos}
              style={{
                backgroundColor: '#4AE0CD',
                height: '12%',
                width: '100%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {photoLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: RFPercentage(3),
                  }}>
                  {photoButtonText}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => uploadVideo()}
              style={{
                backgroundColor: '#4AE0CD',
                height: '12%',
                width: '100%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {videoLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: RFPercentage(3),
                  }}>
                  {videoButtonText}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => validateNewMemory()}
              disabled={photoLoading || videoLoading || memoryLoading}
              style={{
                backgroundColor: '#4AE0CD',
                height: '12%',
                width: '100%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {memoryLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: RFPercentage(3),
                  }}>
                  {memoryButtonText}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewMemoryModal;
