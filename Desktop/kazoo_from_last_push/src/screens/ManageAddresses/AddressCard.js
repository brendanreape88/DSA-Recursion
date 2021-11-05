import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../redux/reducers/app';
import { RFPercentage } from 'react-native-responsive-fontsize';
import edit from '../../../assets/icons/edit.png';
import trash from '../../../assets/icons/trash.png';

const AddressCard = ({
  address,
  deleteAddress,
  setShowEditAddressModal,
  shippingAddress,
  setShippingAddress,
}) => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: themeElementColor,
        marginHorizontal: '5%',
        marginVertical: '2.5%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <TouchableOpacity onPress={() => setShippingAddress(address)}>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 65,
              borderColor:
                shippingAddress?.addressDocumentID === address.addressDocumentID
                  ? '#4AE0CD'
                  : 'lightgrey',
            }}>
            <View
              style={{
                backgroundColor:
                  shippingAddress?.addressDocumentID ===
                  address.addressDocumentID
                    ? '#4AE0CD'
                    : themeBackgroundColor,
                height: width * 0.03,
                width: width * 0.03,
                borderRadius: 65,
                margin: 3,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '90%' }}>
        <Text
          style={{
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            marginBottom: 5,
            color: themeElementColor,
          }}>
          {address.addressName}
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(2),
            marginBottom: 5,
            color: themeElementColor,
          }}>
          {address.addressL1} {address.addressL2}
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(2),
            color: themeElementColor,
            marginBottom: 5,
          }}>
          {address.city} {address.zipCode}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setAddress(address));
              setShowEditAddressModal(true);
            }}
            style={{}}>
            <Image
              source={edit}
              style={{
                height: width * 0.05,
                width: width * 0.05,
                tintColor: themeElementColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteAddress(address)}
            style={{ marginLeft: 10 }}>
            <Image
              source={trash}
              style={{
                height: width * 0.05,
                width: width * 0.05,
                tintColor: themeElementColor,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddressCard;
