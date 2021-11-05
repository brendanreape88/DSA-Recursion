import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';
import add from '../../../assets/icons/add.png';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { selectImage, uploadFile } from '../../Core/helpers/images';

const AddEvent = ({ navigation }) => {
  const currentUser = useSelector((state) => state.app.user);
  const { width } = Dimensions.get('window');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [photo, setPhoto] = useState(
    'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg',
  );
  const [newSubUserLoading, setNewSubUserLoading] = useState(false);
  const [newSubUserButtonText, setNewSubUserButtonText] = useState('Create');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [addressL1, setAddressL1] = useState(null);
  const [addressL2, setAddressL2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const validateNewEvent = () => {
    if (firstName === null || lastName === null) {
      Alert.alert(
        'Incomplete',
        'Please enter a name',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    } else if (
      addressL1 === null ||
      city === null ||
      state === null ||
      zipCode === null
    ) {
      Alert.alert(
        'Incomplete',
        'Please enter a shipping address',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    } else if (month === null || day === null) {
      Alert.alert(
        'Incomplete',
        'Please enter an event date',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    } else {
      uploadNewSubUser();
    }
  };

  const uploadPhoto = async () => {
    const image = await selectImage('Select a photo to upload.', 500, 500);
    if (image) {
      const metadata = { cacheControl: 'max-age=31536000' };
      const downloadUrl = await uploadFile(
        `memory-photos/${currentUser.id}/${image.uniqueName}`,
        image.storagePath,
        metadata,
      );
      setPhoto(downloadUrl);
    }
  };

  const uploadNewSubUser = () => {
    setNewSubUserLoading(true);

    const newSubUser = {
      dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
      birthMonth: month.length === 1 ? `0${month}` : month,
      birthDay: day.length === 1 ? `0${day}` : day,
      birthdate: `${month}${day}${2000}`,
      profilePictureURL: photo,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      address: {
        addressL1: addressL1,
        addressL2: addressL2,
        city: city,
        state: state,
        zipCode: zipCode,
      },
    };

    const subUserDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/subUsers`);
    subUserDB.add(newSubUser).then(() => {
      console.log('new sub user uploaded!');

      setNewSubUserLoading(false);
      setNewSubUserButtonText('Success');

      setTimeout(() => {
        navigation.navigate('Calendar');
        setFirstName(null);
        setLastName(null);
        setMonth(null);
        setDay(null);
        setPhoto(null);
        setEmail(null);
        setPhoneNumber(null);
        setAddressL1(null);
        setAddressL2(null);
        setCity(null);
        setState(null);
        setZipCode(null);
        setNewSubUserButtonText('Create');
      }, 1000);
    });
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Event</Text>
      </View>
      <View style={{ width: '100%', height: '90%' }}>
        <View
          style={{
            height: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => uploadPhoto()}
            style={{
              height: width * 0.2,
              width: width * 0.2,
              borderRadius: 65,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: photo ? '#4AE0CD' : 'lightgrey',
            }}>
            <Image
              source={photo ? { uri: photo } : add}
              style={{
                // tintColor: photo ? 'transparent' : themeElementColor,
                height: photo ? '100%' : width * 0.05,
                width: photo ? '100%' : width * 0.05,
                borderRadius: photo ? 65 : 0,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '5%',
          }}>
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'First Name'}
            placeholderTextColor="#545454"
            onChangeText={(f) => setFirstName(f)}
            value={firstName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'Last Name'}
            placeholderTextColor="#545454"
            onChangeText={(l) => setLastName(l)}
            value={lastName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '5%',
          }}>
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'Phone Number'}
            placeholderTextColor="#545454"
            onChangeText={(p) => setPhoneNumber(p)}
            value={phoneNumber}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'E-mail'}
            placeholderTextColor="#545454"
            onChangeText={(e) => setEmail(e)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginHorizontal: '5%' }}>
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '80%',
              color: themeElementColor,
            }}
            placeholder={'Address Line 1'}
            placeholderTextColor="#545454"
            onChangeText={(a) => setAddressL1(a)}
            value={addressL1}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '80%',
              color: themeElementColor,
            }}
            placeholder={'Address Line 2'}
            placeholderTextColor="#545454"
            onChangeText={(a) => setAddressL2(a)}
            value={addressL2}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '80%',
              color: themeElementColor,
            }}
            placeholder={'City'}
            placeholderTextColor="#545454"
            onChangeText={(c) => setCity(c)}
            value={city}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '5%',
          }}>
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'State'}
            placeholderTextColor="#545454"
            onChangeText={(s) => setState(s)}
            value={state}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              // flex: 1,
              borderBottomWidth: 1,
              borderColor: themeElementColor,
              paddingVertical: 10,
              width: '47%',
              color: themeElementColor,
            }}
            placeholder={'Zip Code'}
            placeholderTextColor="#545454"
            onChangeText={(a) => setZipCode(a)}
            value={zipCode}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: themeElementColor,
            paddingVertical: 20,
          }}
        />
        <View style={{ marginHorizontal: '5%', paddingTop: 10 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(2),
              marginBottom: 10,
              color: themeElementColor,
            }}>
            Birthdate
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
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
              placeholderTextColor="#545454"
              onChangeText={(m) => setMonth(m)}
              value={month}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={2}
            />
            <TextInput
              style={{
                flex: 2,
                // marginRight: 10,
                borderWidth: 0.5,
                padding: 10,
                borderColor: themeElementColor,
                color: themeElementColor,
              }}
              placeholder={'dd'}
              placeholderTextColor="#545454"
              onChangeText={(d) => setDay(d)}
              value={day}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={2}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => validateNewEvent()}
          style={{
            backgroundColor: '#4AE0CD',
            height: '7%',
            width: '90%',
            marginHorizontal: '5%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
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
  );
};

export default AddEvent;
