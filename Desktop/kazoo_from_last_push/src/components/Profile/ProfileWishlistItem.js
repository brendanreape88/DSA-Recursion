import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

const ProfileWishlistItem = ({ item, onCardPress, purchaseFromWishlistID }) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  return (
    <TouchableOpacity
      onPress={() => {
        onCardPress(item, purchaseFromWishlistID);
      }}>
      <View style={styles.productContainer}>
        <View style={styles.productFlexContainer}>
          <Image
            style={styles.productImage}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <View style={styles.productTitleContainer}>
          <Text numberOfLines={2} style={styles.productTitleText}>
            {item.name}
          </Text>
        </View>
        {item.purchased ? (
          <View style={styles.productPurchasedOverlay} />
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileWishlistItem;
