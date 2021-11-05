import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

function ProfileItem({ item, onCardPress }) {
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
              uri:
                typeof item.photo === 'string'
                  ? item.photo
                  : item.photo && item.photo.length > 0
                  ? item.photo[0]
                  : item.photos && item.photos.length > 0
                  ? item.photos[0]
                  : undefined,
            }}
          />
        </View>
        <View style={styles.productTitleContainer}>
          <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 11 }}>
            {item.name}
          </Text>

          {item.message ? (
            <Text style={styles.productTitleText} numberOfLines={2}>
              {item.message}
            </Text>
          ) : (
            []
          )}
        </View>
        {item.purchased ? (
          <View style={styles.productPurchasedOverlay} />
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ProfileItem;
