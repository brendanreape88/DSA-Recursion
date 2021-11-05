import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { View, Alert, Image, Dimensions, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import dynamicStyles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

function ShoppingBagCard(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { item } = props;
  const [itemQty, setItemQty] = useState(
    (props.productPricesByQty.find((product) => product.id === item.id) || {})
      .qty ||
      item.quantity ||
      1,
  );
  const totalPrice = (item.price * itemQty).toFixed(2);
  const { width, height } = Dimensions.get('window');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const product = props.productPricesByQty.find((product) => {
      return product.id === props.item.id;
    });

    if (product) {
      // setItemQty(product.qty);
    }
  }, []);
  useEffect(() => {
    // Update card qty if qty adjusted outside of card
    setItemQty(
      (props.productPricesByQty.find((product) => product.id === item.id) || {})
        .qty || 0,
    );
  }, [props.productPricesByQty, item]);
  useEffect(() => {
    itemQty === 0 && onItemEqualsZero();
  }, [itemQty]);

  const increaseQty = () => {
    const newQty = itemQty + 1;
    setItemQty(newQty);
    setObjForOnQtyChange(newQty);
  };

  const handleQtyValueChange = (newQty) => {
    setItemQty(newQty);
    setObjForOnQtyChange(newQty);
  };

  const setObjForOnQtyChange = (newQty) => {
    const obj = {
      id: props.item.id,
      qty: newQty,
      totalPrice: props.item.price * newQty,
    };

    props.onQtyChange(obj);
  };

  const onItemEqualsZero = () => {
    Alert.alert(
      IMLocalized('Remove Item'),
      IMLocalized('Are you sure you want to remove this item from the cart?'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => props.removeFromShoppingBag(item),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
          onPress: () => increaseQty(),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View
      style={{
        // borderWidth: 1,
        width: '100%',
        // height: '15%',
        flexDirection: 'row',
        // padding: 5,
        paddingLeft: '7.5%',
        paddingRight: '7.5%',
        paddingVertical: 5,
        marginBottom: 5,
      }}>
      <Image
        source={{ uri: item.photo }}
        style={{
          height: width * 0.16,
          width: width * 0.16,
          resizeMode: 'contain',
          borderWidth: 0.5,
          borderColor: themeElementColor,
          borderRadius: 8,
        }}
      />
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'red',
          flex: 1,
          paddingLeft: 10,
        }}>
        <View style={{ borderColor: 'blue' }}>
          <Text
            style={{
              fontSize: RFPercentage(2),
              // fontWeight: 'bold',
              color: themeElementColor,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: themeElementColor,
              fontSize: RFPercentage(1.75),
              marginTop: 5,
            }}>
            Sold by: Vendor Name
          </Text>
        </View>
        <View
          style={{
            // borderWidth: 1,
            borderColor: 'green',
            alignItems: 'flex-end',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: themeElementColor }}>Qty:</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Select Quantity...',
                value: null,
                color: '#9EA0A4',
              }}
              onValueChange={handleQtyValueChange}
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
              value={itemQty}
              items={[
                { label: '0', value: 0 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
                { label: '7', value: 7 },
                { label: '8', value: 8 },
                { label: '9', value: 9 },
                { label: '10', value: 10 },
              ]}
            />
          </View>
          <Text
            style={{
              color: '#B60101',
              // fontWeight: 'bold',
              fontSize: RFPercentage(2),
              marginTop: 5,
            }}>
            ${item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}

ShoppingBagCard.propTypes = {
  onQtyChange: PropTypes.func,
  item: PropTypes.object,
  productPricesByQty: PropTypes.array,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
  onLongPress: PropTypes.func,
  removeFromShoppingBag: PropTypes.func,
};

export default connect()(ShoppingBagCard);
