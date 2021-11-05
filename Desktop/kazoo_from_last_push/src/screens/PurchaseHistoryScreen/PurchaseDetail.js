import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Moment from 'moment';
import { useSelector } from 'react-redux';

const PurchaseDetail = ({ product, date, onCardPress }) => {
  const { width, height } = Dimensions.get('window');
  const momentDate = Moment(date).format('MMM DD YYYY');
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 10,
      }}>
      <Image
        style={{
          borderWidth: 1,
          height: width * 0.4,
          width: width * 0.4,
          marginRight: 10,
          borderColor: themeElementColor,
          borderRadius: 8,
          resizeMode: 'contain',
        }}
        source={{ uri: product.photo }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: RFPercentage(2.5),
            fontWeight: 'bold',
            color: themeElementColor,
          }}>
          {product.name}
        </Text>
        <TouchableOpacity
          onPress={() => onCardPress(product)}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: themeElementColor,
            width: width * 0.27,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFPercentage(2),
              paddingVertical: 5,
              color: themeElementColor,
            }}>
            View Product
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: themeElementColor, fontSize: RFPercentage(2) }}>
            {momentDate}
          </Text>
          <Text style={{ color: themeElementColor, fontSize: RFPercentage(2) }}>
            Qty: {product.quantity}
          </Text>
        </View>
        <Text
          style={{
            fontSize: RFPercentage(2),
            fontWeight: 'bold',
            color: themeElementColor,
          }}>
          ${product.price}
        </Text>
      </View>
    </View>
  );
};

export default PurchaseDetail;
