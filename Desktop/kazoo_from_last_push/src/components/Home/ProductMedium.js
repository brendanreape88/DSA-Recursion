import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const Product = ({ product, onCardPress }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themePriceColor = theme === 'dark' ? '#979797' : '#545454';
  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity
      style={{
        height: width * 0.6,
        width: width * 0.45,
        marginRight: width * 0.05,
        borderRadius: 5,
      }}
      onPress={() => onCardPress(product)}>
      <View>
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
          <Image
            style={{
              height: width * 0.45,
              width: '100%',
              resizeMode: 'contain',
              backgroundColor: themeElementColor,
              borderRadius: 5,
            }}
            source={{
              uri: product.details[0],
            }}
          />
        </View>
        <View
          style={{
            padding: 3,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              fontSize: 11,
              color: themeElementColor,
              textAlign: 'center',
              paddingVertical: 2,
            }}>
            {product.name}
          </Text>
          <Text
            style={{
              color: themeElementColor,
              fontSize: 11,
              textAlign: 'center',
            }}>
            {`$${product.price}.00`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
