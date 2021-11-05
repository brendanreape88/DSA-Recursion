import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import heart from '../../../assets/icons/wishlist-filled.png';

const ProductLarge = ({ product, onCardPress }) => {
  const { width } = Dimensions.get('window');
  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        height: width * 0.6,
        width: width * 0.6,
        marginRight: 20,
        borderRadius: 8,
      }}
      onPress={() => onCardPress(product)}>
      <ImageBackground
        source={{ uri: product.details[0] }}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ borderRadius: 8 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: '#4AE0CD',
              borderRadius: 65,
              height: 35,
              width: 35,
              margin: '2%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {product.number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Image
            source={heart}
            style={{
              tintColor: '#4AE0CD',
              height: 20,
              width: 20,
              margin: '2%',
            }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ProductLarge;
