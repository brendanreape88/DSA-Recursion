import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../redux/reducers/app';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import Moment from 'moment';
import getBirthdayCountdown from './getBirthdayCountdown';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import {
  selectImage,
  captureImage,
  uploadFile,
} from '../../Core/helpers/images';
import PhotoModal from '../Modals/MediaModal/PhotoModal';
import FullPictureModal from '../Modals/FullPictureModal/FullPictureModal';

function ProfileImageCard(props) {
  const view = useSelector((state) => state.app.profileView);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { user } = props;
  const birthdate = Moment(user.birthdate, 'MMDDYYYY');
  const birthdateDisplay = birthdate.format('MMM D');
  birthdate.year(new Date().getFullYear());
  if (birthdate.isBefore(new Date())) {
    birthdate.add(1, 'year');
  }
  const birthdayCountdown = getBirthdayCountdown(birthdate.toDate());
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showFullPictureModal, setShowFullPictureModal] = useState(false);

  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : '#27C9B5';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const selectProfilePhoto = async (source) => {
    try {
      const title = source === 'storage' ? 'Select a photo' : 'Take a photo';
      const sourceFunc = source === 'storage' ? selectImage : captureImage;
      const image = await sourceFunc(title, 300, 300);
      if (image) {
        setLoading(true);
        const metadata = { cacheControl: 'max-age=31536000' };
        const downloadUrl = await uploadFile(
          `user-profile-images/${user.id}/${image.uniqueName}`,
          image.storagePath,
          metadata,
        );
        const users = firebase
          .firestore()
          .collection(AppConfig.FIREBASE_COLLECTIONS.USERS);
        await users.doc(user.id).update({ profilePictureURL: downloadUrl });
        const usersPrivate = firebase
          .firestore()
          .collection(AppConfig.FIREBASE_COLLECTIONS.USERS_PRIVATE);
        await usersPrivate
          .doc(user.id)
          .update({ profilePictureURL: downloadUrl });
        setUserProfilePicture(downloadUrl);
        dispatch(setAvatar(downloadUrl));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          borderBottomWidth: 1,
          borderColor: '#27C9B5',
          ...styles.cardContainer,
        }}>
        <PhotoModal
          showPhotoModal={showPhotoModal}
          setShowPhotoModal={setShowPhotoModal}
          selectProfilePhoto={selectProfilePhoto}
        />
        <FullPictureModal
          showFullPictureModal={showFullPictureModal}
          setShowFullPictureModal={setShowFullPictureModal}
          profilePictureURL={
            user.photoURI || user.profilePictureURL || defaultProfilePhotoURL
          }
        />
        <View style={styles.cardImageContainer}>
          {view === 'current user' ? (
            !loading ? (
              <TouchableOpacity
                onPress={() => {
                  setShowPhotoModal(true);
                }}>
                <Image
                  style={styles.cardImage}
                  source={{
                    uri:
                      userProfilePicture ||
                      user.profilePictureURL ||
                      defaultProfilePhotoURL,
                    cache: 'force-cache',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.cardImage}>
                <ActivityIndicator size="large" />
              </View>
            )
          ) : (
            <TouchableOpacity onPress={() => setShowFullPictureModal(true)}>
              <Image
                style={styles.cardImage}
                source={{
                  uri:
                    user.photoURI ||
                    user.profilePictureURL ||
                    defaultProfilePhotoURL,
                  cache: 'force-cache',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardNameContainer}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.cardName}>
            Birthday On:
          </Text>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.cardName}>
            {birthdateDisplay}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.centeredContainer}>
            <View style={styles.dateColumn}>
              <View style={styles.numberBox}>
                <Text style={styles.dateNumber}>
                  {birthdayCountdown.months}
                </Text>
              </View>
              <Text style={styles.dateText}>months</Text>
            </View>
            <View style={styles.dateColumn}>
              <View style={styles.numberBox}>
                <Text style={styles.dateNumber}>{birthdayCountdown.days}</Text>
              </View>
              <Text style={styles.dateText}>days</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

ProfileImageCard.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
};

export default ProfileImageCard;
