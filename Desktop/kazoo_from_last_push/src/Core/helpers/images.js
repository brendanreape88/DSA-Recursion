import { Platform, PermissionsAndroid, Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as Sentry from '@sentry/react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid4 from 'uuidv4';
import RNFetchBlob from 'rn-fetch-blob';

export const selectImage = async (title, maxWidth, maxHeight) => {
  const images = await selectImages(title, maxWidth, maxHeight, 1);
  return images[0];
};

export const selectImages = async (title, maxWidth, maxHeight, limit) => {
  return await callImagePicker(false, {
    title: title,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    selectionLimit: limit,
    mediaType: 'photo',
    includeBase64: false,
  });
};

export const captureImage = async (title, maxWidth, maxHeight) => {
  const photos = await callImagePicker(true, {
    title,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    mediaType: 'photo',
    videoQuality: 'low',
    selectionLimit: 1,
    includeBase64: false,
  });
  return photos ? photos[0] : undefined;
};

export const selectVideo = async (title) => {
  const videos = await selectVideos(title, 1);
  return videos[0];
};

export const selectVideos = async (title, limit) => {
  return await callImagePicker(false, {
    title,
    mediaType: 'video',
    videoQuality: 'low',
    selectionLimit: limit,
  });
};

export const captureVideo = async (title) => {
  const videos = await callImagePicker(true, {
    title,
    mediaType: 'video',
    videoQuality: 'low',
    selectionLimit: 1,
  });
  return videos ? videos[0] : undefined;
};

async function callImagePicker(isCapture, options) {
  let granted;
  if (Platform.OS === 'android') {
    if (isCapture && options.mediaType === 'video') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];
      granted = await PermissionsAndroid.requestMultiple(permissions, {
        title: 'Kazoo Media Permission',
        message: 'Needs access to camera and microphone to record a new video',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    } else if (isCapture && options.mediaType === 'photo') {
      const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];
      granted = await PermissionsAndroid.requestMultiple(permissions, {
        title: 'Kazoo Media Permission',
        message: 'Needs access to camera to take a new photo',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Kazoo Media Permission',
          message: 'Grant permission to attach a video from your phone.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
  }
  if (
    !granted ||
    (!isCapture && granted === PermissionsAndroid.RESULTS.GRANTED) ||
    (isCapture &&
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED) ||
    (isCapture && PermissionsAndroid.RESULTS.GRANTED)
  ) {
    const functionName = isCapture ? launchCamera : launchImageLibrary;
    try {
      return await new Promise((resolve, reject) => {
        functionName(options, async (response) => {
          if (response.error) {
            reject(response.error);
          }
          if (response.didCancel) {
            resolve([]);
          } else {
            const assets = await Promise.all(
              response.assets.map(async (a) => {
                const storagePath = await getPathForFirebaseStorage(a.uri);
                const uniqueName = getUniqueFileName(a.fileName ?? storagePath);
                return {
                  uniqueName: uniqueName,
                  storagePath: storagePath,
                  ...a,
                };
              }),
            );
            resolve(assets);
          }
        });
      });
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert(error.message);
    }
  } else {
    Alert.alert('Camera permission denied');
  }
}

function getUniqueFileName(fileName) {
  const fileExtension = fileName.split('.').pop();
  const uuid = uuid4();
  return fileExtension ? `${uuid}.${fileExtension}` : uuid;
}

async function getPathForFirebaseStorage(uri) {
  // The reason we have this function is that on android if the file comes from google photos we can't access it directly
  if (Platform.OS === 'ios') {
    return uri;
  }

  if (!uri.includes('content://com.google')) {
    return uri;
  }

  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
}

export const uploadFile = async (key, source, metadata) => {
  const imageRef = storage().ref(key);
  await imageRef.putFile(source, metadata);
  return await imageRef.getDownloadURL();
};
