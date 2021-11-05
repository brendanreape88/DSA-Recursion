import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, setAddresses } from '../../redux/reducers/app';
import arrowhead from '../../../assets/icons/arrowhead-icon.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../../Core/firebase/config';

const EditAddressModal = ({
  showEditAddressModal,
  setShowEditAddressModal,
  currentUser,
  addresses,
}) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.app.addressToEdit);
  const { width, height } = Dimensions.get('window');
  const [addressName, setAddressName] = useState(address.addressName);
  const [addressL1, setAddressL1] = useState(address.addressL1);
  const [addressL2, setAddressL2] = useState(address.addressL2);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [zipCode, setZipCode] = useState(address.zipCode);
  const [shippingAddress, setShippingAddress] = useState(
    address.shippingAddress,
  );
  const [buttonText, setButtonText] = useState('Save');

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const editAddress = () => {
    const editedAddress = {
      addressDocumentID: address.addressDocumentID,
      addressName: addressName,
      addressL1: addressL1,
      addressL2: addressL2,
      city: city,
      state: state,
      zipCode: zipCode,
      shippingAddress: shippingAddress,
    };

    const addressDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/addresses`);
    addressDB
      .doc(address.addressDocumentID)
      .update({
        addressName: addressName,
        addressL1: addressL1,
        addressL2: addressL2,
        city: city,
        state: state,
        zipCode: zipCode,
        shippingAddress: shippingAddress,
      })
      .then(() => {
        console.log('address updated in DB!');
        dispatch(setAddress(null));
        const removedAddressArray = addresses.filter(
          (add) => add.addressDocumentID !== address.addressDocumentID,
        );
        const newAddressesArray = [
          {
            addressDocumentID: address.addressDocumentID,
            ...editedAddress,
          },
          ...removedAddressArray,
        ];
        dispatch(setAddresses(newAddressesArray));
        setButtonText('Success!');
      });

    // .delete()
    // .then(() => {
    //   addressDB
    //     .doc(address.addressDocumentID)
    //     .set(editedAddress)
    //     .then(() => {
    //       console.log('address updated!');
    //       dispatch(setAddress(null));
    //       const removedAddressArray = addresses.filter(
    //         (add) => add.addressDocumentID !== address.addressDocumentID,
    //       );
    //       const newAddressesArray = [
    //         {
    //           addressDocumentID: address.addressDocumentID,
    //           ...editedAddress,
    //         },
    //         ...removedAddressArray,
    //       ];
    //       dispatch(setAddresses(newAddressesArray));
    //       setButtonText('Success!');
    //     });
    // });
  };

  return (
    <Modal visible={showEditAddressModal} transparent={true}>
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
            height: height * 0.5,
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
              onPress={() => {
                dispatch(setAddress(null));
                setShowEditAddressModal(false);
              }}
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
                fontSize: RFPercentage(3.5),
                color: themeElementColor,
              }}>
              Edit Address
            </Text>
          </View>

          <View style={{ width: '95%', alignItems: 'center' }}>
            <TextInput
              style={{
                // flex: 1,
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                paddingVertical: 10,
                width: '80%',
                color: themeElementColor,
              }}
              placeholder={'Address Name'}
              placeholderTextColor={themeElementColor}
              onChangeText={(addressName) => setAddressName(addressName)}
              value={addressName}
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
              placeholder={'Address Line 1'}
              placeholderTextColor={themeElementColor}
              onChangeText={(addressL1) => setAddressL1(addressL1)}
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
              placeholderTextColor={themeElementColor}
              onChangeText={(addressL2) => setAddressL2(addressL2)}
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
              placeholderTextColor={themeElementColor}
              onChangeText={(city) => setCity(city)}
              value={city}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: '5%',
              width: '95%',
            }}>
            <TextInput
              style={{
                // flex: 1,
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                paddingVertical: 10,
                width: '40%',
                color: themeElementColor,
              }}
              placeholder={'State'}
              placeholderTextColor={themeElementColor}
              onChangeText={(state) => setState(state)}
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
                width: '40%',
                color: themeElementColor,
              }}
              placeholder={'Zip Code'}
              placeholderTextColor={themeElementColor}
              onChangeText={(zipCode) => setZipCode(zipCode)}
              value={zipCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          {buttonText === 'Save' ? (
            <TouchableOpacity
              onPress={() => {
                editAddress();
              }}
              style={{
                backgroundColor: '#4AE0CD',
                height: '10%',
                width: '90%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                position: 'absolute',
                bottom: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: '#4AE0CD',
                height: '10%',
                width: '90%',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                position: 'absolute',
                bottom: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                }}>
                {buttonText}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditAddressModal;
