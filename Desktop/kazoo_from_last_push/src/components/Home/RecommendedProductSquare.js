import React from 'react';
import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const RecommendedProductSquare = ({ product, onCardPress }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <TouchableOpacity
      onPress={() => onCardPress(product)}
      style={{
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        alignItems: 'center',
        height: width * 0.4,
        width: width * 0.5,
      }}>
      <Text
        numberOfLines={1}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          fontWeight: 'bold',
        }}>
        {product.name}
      </Text>
      <Image
        source={{
          uri: product.details[0],
        }}
        style={{
          height: width * 0.3,
          width: width * 0.3,
          resizeMode: 'contain',
          marginBottom: 1,
        }}
      />
    </TouchableOpacity>
  );
};

export default RecommendedProductSquare;
