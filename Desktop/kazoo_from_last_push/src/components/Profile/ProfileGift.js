import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

const ProfileGift = ({ item, onCardPress }) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  return (
    <TouchableOpacity
      onPress={() => {
        onCardPress(item);
      }}>
      <View style={styles.productContainer}>
        <View style={styles.productFlexContainer}>
          <Image
            style={styles.productImage}
            source={{
              uri: item.photo || item.photos[0],
            }}
          />
        </View>
        <View style={styles.productTitleContainer}>
          <Text numberOfLines={2} style={styles.productTitleText}>
            {item.name}
          </Text>

          {item.message ? (
            <Text style={styles.productGiftText} numberOfLines={2}>
              {item.message}
            </Text>
          ) : (
            []
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileGift;
