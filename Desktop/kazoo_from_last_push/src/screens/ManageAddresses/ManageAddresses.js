import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setAddresses } from '../../redux/reducers/app';
import AddAddressModal from './AddAddressModal';
import EditAddressModal from './EditAddressModal';
import AddressCard from './AddressCard';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import addIcon from '../../../assets/icons/add.png';
import { firebase } from '../../Core/firebase/config';
import styles from '../ManageAddresses/styles';

const ManageAddresses = ({ navigation }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const currentUser = useSelector((state) => state.app.user);
  const addresses = useSelector((state) => state.app.addresses);
  const addressToEdit = useSelector((state) => state.app.addressToEdit);
  const shippingAddressFromDB = addresses.find(
    (add) => add.shippingAddress === true,
  );
  const [shippingAddress, setShippingAddress] = useState(
    shippingAddressFromDB ? shippingAddressFromDB : null,
  );

  const deleteAddress = (address) => {
    const addressDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/addresses`);
    addressDB
      .doc(address.addressDocumentID)
      .delete()
      .then(() => {
        console.log('address deleted');
        const newAddressArray = addresses.filter(
          (add) => add.addressDocumentID !== address.addressDocumentID,
        );
        if (newAddressArray.length > 0) {
          dispatch(setAddresses(newAddressArray));
        } else {
          dispatch(setAddresses([]));
        }
      });
  };

  const changeShippingAddress = () => {
    const previousShippingAddress = addresses.find(
      (add) => add.shippingAddress === true,
    );

    const addressDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/addresses`);
    addressDB
      .doc(shippingAddress.addressDocumentID)
      .update({ shippingAddress: true })
      .then(() => {
        console.log('shipping address updated in DB!');

        if (previousShippingAddress) {
          addressDB
            .doc(previousShippingAddress.addressDocumentID)
            .update({ shippingAddress: false })
            .then(() => {
              console.log('previous shipping address set to false');
            });
        }
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
            if (shippingAddress) {
              changeShippingAddress();
            }
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Addresses</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            setShowAddAddressModal(true);
          }}>
          <Image style={styles.headerIcon} source={addIcon} />
        </TouchableOpacity>
      </View>
      <AddAddressModal
        showAddAddressModal={showAddAddressModal}
        setShowAddAddressModal={setShowAddAddressModal}
        currentUser={currentUser}
        addresses={addresses}
      />
      {addressToEdit && (
        <EditAddressModal
          showEditAddressModal={showEditAddressModal}
          setShowEditAddressModal={setShowEditAddressModal}
          currentUser={currentUser}
          addresses={addresses}
        />
      )}
      {addresses?.length > 0 ? (
        <ScrollView>
          {addresses.map((address) => (
            <AddressCard
              address={address}
              key={address.addressDocumentID}
              setShowEditAddressModal={setShowEditAddressModal}
              deleteAddress={deleteAddress}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={{ color: '#545454' }}>
            Add your address so you can receive gifts!
          </Text>
        </View>
      )}
    </View>
  );
};

export default ManageAddresses;
