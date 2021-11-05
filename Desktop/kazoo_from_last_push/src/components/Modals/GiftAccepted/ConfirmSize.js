import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';

const ConfirmSize = ({
  gift,
  item,
  setAcceptDisabled,
  successCount,
  setSuccessCount,
  checkSuccessCount,
  showConfirmSize,
  confirmedSizesForOrder,
  setConfirmedSizesForOrder,
}) => {
  const sizingProfile = useSelector((state) => state.app.sizingProfile);
  const sizingProfileShoeSize = sizingProfile.shoeSize;
  const closestSize = item.sizes.reduce(function (prev, curr) {
    return Math.abs(curr - sizingProfileShoeSize) <
      Math.abs(prev - sizingProfileShoeSize)
      ? curr
      : prev;
  });
  const closestSizeUpIndex = item.sizes.indexOf(closestSize) + 1;
  const closestSizeUp = item.sizes[closestSizeUpIndex];
  const useClosestSizeUp = item.sizes.find(
    (size) => sizingProfileShoeSize === size,
  )
    ? false
    : true;
  const [selectedSize, setSelectedSize] = useState(
    useClosestSizeUp ? closestSizeUp : sizingProfileShoeSize,
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    item.sizes.indexOf(selectedSize),
  );
  const [individualSizeConfirmed, setIndividualSizeConfirmed] = useState(false);
  // const [selectedSizeForOrder, setSelectedSizeForOrder] = useState(null);

  return (
    <>
      {showConfirmSize && (
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}>
            Please confirm or edit your size:
          </Text>
          <RNPickerSelect
            placeholder={{
              label: selectedSize.toString() || 'select a size',
              value: selectedSize || null,
              color: '#9EA0A4',
            }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug
            style={{
              inputIOS: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 4,
                color: 'white',
                paddingRight: 10,
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              },
              inputAndroid: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 4,
                color: 'white',
                paddingRight: 10,
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            }}
            items={item.sizes.map((size) => ({
              label: size.toString(),
              value: size,
            }))}
            value={item.sizes[selectedSizeIndex]}
            onValueChange={(value) => {
              setSuccessCount(
                individualSizeConfirmed === false
                  ? successCount
                  : successCount - 1,
              );
              setSelectedSizeIndex(item.sizes.indexOf(value));
              setSelectedSize(value);
              setIndividualSizeConfirmed(false);
              setAcceptDisabled(true);
              checkSuccessCount(
                individualSizeConfirmed === false
                  ? successCount
                  : successCount - 1,
              );
              // setSelectedSizeForOrder(null);
              setConfirmedSizesForOrder(
                confirmedSizesForOrder.filter(
                  (product) => product.id !== item.id,
                ),
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIndividualSizeConfirmed(true);
              setSuccessCount(successCount + 1);
              checkSuccessCount(successCount + 1);
              // setSelectedSizeForOrder({
              //   id: item.id,
              //   selectedSize: selectedSize,
              // });
              setConfirmedSizesForOrder([
                ...confirmedSizesForOrder,
                {
                  id: item.id,
                  selectedSize: selectedSize,
                },
              ]);
            }}
            style={{
              borderRadius: 8,
              backgroundColor: 'white',
              padding: 10,
              borderWidth: 1,
              borderColor: '#42E2CD',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
            disabled={individualSizeConfirmed}>
            <Text style={styles.buttonText}>
              {!individualSizeConfirmed ? 'Confirm' : 'Success!'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ConfirmSize;
