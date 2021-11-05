import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { setPinGiftsFor } from '../../redux/reducers/app';
import close from '../../../assets/icons/close.png';

const ShoppingForHeader = ({ pinGiftsFor }) => {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  return (
    <View
      style={{
        height: '5%',
        width: '100%',
        backgroundColor: '#4AE0CD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: RFPercentage(2),
          color: 'white',
        }}>
        Shopping For {pinGiftsFor.firstName} {pinGiftsFor.lastName}
      </Text>
      <TouchableOpacity onPress={() => dispatch(setPinGiftsFor(null))}>
        <Image
          source={close}
          style={{
            tintColor: 'white',
            height: width * 0.03,
            width: width * 0.03,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingForHeader;
