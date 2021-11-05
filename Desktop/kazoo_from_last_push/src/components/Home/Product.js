import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

const Product = ({ product, onCardPress }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themePriceColor = theme === 'dark' ? '#979797' : '#545454';
  return (
    <TouchableOpacity onPress={() => onCardPress(product)}>
      <View style={{ height: 160, width: 100, marginRight: 20 }}>
        <Image
          style={{
            height: 100,
            width: '100%',
            resizeMode: 'contain',
            backgroundColor: themeElementColor,
            borderRadius: 5,
          }}
          source={{
            uri: product.details[0],
          }}
        />
        <View style={{ height: 60, padding: 3 }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: 11,
              color: themeElementColor,
            }}>
            {product.name}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: themePriceColor,
              fontSize: 11,
            }}>
            ${product.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
