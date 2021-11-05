import React from 'react';
import { useSelector } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch } from 'react-redux';
import { setPinnedItemID, setPinGiftsFor } from '../../redux/reducers/app';

const ProfileWishlistItem = ({
  item,
  onCardPress,
  pinned,
  friendDocumentID,
  themeBackgroundColor,
  themeElementColor,
}) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setPinnedItemID(item.id));
        dispatch(setPinGiftsFor(friendDocumentID));
        onCardPress(item);
      }}>
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          ...styles.productContainer,
        }}>
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
