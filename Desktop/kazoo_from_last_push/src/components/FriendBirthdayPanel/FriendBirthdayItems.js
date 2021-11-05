import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProfileItem from '../../components/Profile/ProfileItem';
import styles from './styles';

function FriendBirthdayItems(props) {
  return (
    <View>
      <View style={styles.itemsDefaultMessageContainer}>
        {!props.wishlist || props.wishlist.length === 0 ? (
          <View style={styles.itemsDefaultMessageContentContainer}>
            <Text style={styles.itemsDefaultMessageText}>
              Your friend has no wishlist items.
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={props.wishlist}
            renderItem={({ item }) => {
              return (
                <ProfileItem onCardPress={props.onCardPress} item={item} />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}

export default FriendBirthdayItems;
