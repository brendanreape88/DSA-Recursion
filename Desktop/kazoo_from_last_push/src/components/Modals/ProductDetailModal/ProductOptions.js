import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import RNPickerSelect from 'react-native-picker-select';
import dynamicStyles from './styles';
import { useSelector } from 'react-redux';

function ProductOptions(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { optionContainerStyle, item } = props;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const onSizeSelected = (index) => {
    setSelectedSizeIndex(index);
    props.onSizeSelected(index);
  };

  const onColorSelected = (index) => {
    setSelectedColorIndex(index);
    props.onColorSelected(index);
  };

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  return (
    <>
      {item.sizes?.length > 0 && (
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ color: themeElementColor }}>Size:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select Size',
              value: null,
              color: '#9EA0A4',
            }}
            onValueChange={(value) => {
              onSizeSelected(item.sizes.indexOf(value));
            }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug
            style={{
              inputIOS: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: themeElementColor,
                borderRadius: 4,
                color: themeElementColor,
                paddingRight: 10,
                marginLeft: 5,
              },
              inputAndroid: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: themeElementColor,
                borderRadius: 4,
                color: themeElementColor,
                paddingRight: 10,
                marginLeft: 5,
              },
            }}
            value={item.sizes[selectedSizeIndex]}
            items={item.sizes.map((size) => ({
              label: size.toString(),
              value: size,
            }))}
          />
        </View>
      )}
      {item.colors?.length > 0 && (
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ color: themeElementColor }}>Color:</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select Color',
              value: null,
              color: '#9EA0A4',
            }}
            onValueChange={(value) => {
              onColorSelected(item.colors.indexOf(value));
            }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug
            style={{
              inputIOS: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: themeElementColor,
                borderRadius: 4,
                color: themeElementColor,
                paddingRight: 10,
                marginLeft: 5,
              },
              inputAndroid: {
                fontSize: 14,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: themeElementColor,
                borderRadius: 4,
                color: themeElementColor,
                paddingRight: 10,
                marginLeft: 5,
              },
            }}
            value={item.colors[selectedColorIndex]}
            items={item.colors.map((color) => ({
              label: color.toString(),
              value: color,
            }))}
          />
        </View>
      )}
    </>
  );
}

ProductOptions.propTypes = {
  optionContainerStyle: PropTypes.object,
  item: PropTypes.object,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
};

export default ProductOptions;
