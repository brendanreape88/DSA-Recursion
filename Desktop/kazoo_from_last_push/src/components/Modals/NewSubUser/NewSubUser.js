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
import { uploadFile, selectImage } from '../../../Core/helpers/images';

const NewMemoryModal = ({ showModal, setShowModal, currentUserID }) => {
  const { width, height } = Dimensions.get('window');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [newSubUserLoading, setNewSubUserLoading] = useState(false);
  const [photoButtonText, setPhotoButtonText] = useState('Upload Photo');
  const [newSubUserButtonText, setNewSubUserButtonText] = useState('Create');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const uploadPhoto = async () => {
    try {
      const image = await selectImage(
        'Select a photo to upload',
        500, // max width
        500, // max height
      );

      if (image) {
        setPhotoLoading(true);
        const metadata = { cacheControl: 'max-age=31536000' };

        const downloadUrl = await uploadFile(
          `profile-photos/${currentUserID}/${image.uniqueName}`,
          image.storagePath,
          metadata,
        );

        setPhoto(downloadUrl);
        setPhotoButtonText('Success');
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Unable to upload photo, please try again.');
    } finally {
      setPhotoLoading(false);
    }
  };

  const uploadNewSubUser = () => {
    setNewSubUserLoading(true);

    const newMemory = {
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      month: month,
      day: day,
      year: year,
      photo: photo,
      firstName: firstName,
      lastName: lastName,
    };

    const memoryDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/subUsers`);
    memoryDB.add(newMemory).then(() => {
      console.log('new sub user uploaded!');

      setNewSubUserLoading(false);
      setNewSubUserButtonText('Success');

      setTimeout(() => {
        setShowModal(false);

        setMonth(null);
        setDay(null);
        setYear(null);
        setPhoto(null);
        setPhotoLoading(false);
        setPhotoButtonText('Upload Photo');
        setNewSubUserButtonText('Create');
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
            backgroundColor: 'white',
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
                }}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(4) }}>
              New Custom User
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
                }}>
                Name
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
                    flex: 1,
                    marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                  }}
                  placeholder={'First Name'}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(f) => setFirstName(f)}
                  value={firstName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TextInput
                  style={{
                    flex: 1,
                    // marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                  }}
                  placeholder={'Last Name'}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(l) => setLastName(l)}
                  value={lastName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  marginBottom: 10,
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
                  }}
                  placeholder={'mm'}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(m) => setMonth(m)}
                  value={month}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={2}
                />
                <TextInput
                  style={{
                    flex: 2,
                    marginRight: 10,
                    borderWidth: 0.5,
                    padding: 10,
                  }}
                  placeholder={'dd'}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(d) => setDay(d)}
                  value={day}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={2}
                />
                <TextInput
                  style={{ flex: 4, borderWidth: 0.5, padding: 10 }}
                  placeholder={'yyyy'}
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(y) => setYear(y)}
                  value={year}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={4}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => uploadPhoto()}
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
              onPress={() => uploadNewSubUser()}
              style={{
                backgroundColor: '#4AE0CD',
                height: '12%',
                width: '100%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {newSubUserLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: RFPercentage(3),
                  }}>
                  {newSubUserButtonText}
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
