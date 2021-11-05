import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import ProfileItem from './ProfileItem';
import dynamicStyles from './styles';
import addIcon from '../../../assets/icons/add.png';

function ProfileWishlistGifts({
  navigation,
  user,
  isCurrentUser,
  appConfig,
  onCardPress,
  products,
  userFromSearch,
}) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  return (
    <>
      {userFromSearch ? (
        <View style={styles.itemsContainer}>
          {/* <ScrollView scrollEventThrottle={16}> */}
          <View>
            <Text style={styles.profileSectionTitle}>Wishlist</Text>
            {!userFromSearch ||
            !userFromSearch.wishlist ||
            userFromSearch.wishlist.length === 0 ? (
              <View style={styles.defaultMessageContainer2}>
                <View style={styles.defaultMessageContentContainer}>
                  <Text style={styles.defaultMessageText}>
                    No wishlist items to show.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true}>
                  {userFromSearch.wishlist.map((item) => (
                    <ProfileItem
                      onCardPress={onCardPress}
                      item={item}
                      key={item.id}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.profileSectionTitle}>Gifts</Text>
            {!userFromSearch.giftItems ||
            userFromSearch.giftItems.length === 0 ? (
              <View style={styles.defaultMessageContainer}>
                <View style={styles.defaultMessageContentContainer}>
                  <Text style={styles.defaultMessageText}>
                    No gifts to show yet.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true}>
                  {userFromSearch.giftItems.map((item) => (
                    <ProfileItem
                      onCardPress={onCardPress}
                      item={item}
                      key={item.orderDate}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      ) : (
        <View style={styles.itemsContainer}>
          {/* <ScrollView scrollEventThrottle={16}> */}
          <View>
            <Text style={styles.profileSectionTitle}>Wishlist</Text>
            {!user || !user.wishlist || user.wishlist.length === 0 ? (
              <View style={styles.defaultMessageContainer2}>
                <View style={styles.defaultMessageContentContainer}>
                  <Text style={styles.defaultMessageText}>
                    {isCurrentUser
                      ? 'Add items to your wishlist!'
                      : 'No wishlist items to show.'}
                  </Text>
                  {isCurrentUser && (
                    <TouchableOpacity
                      style={styles.defaultMessageAddButton}
                      onPress={() => {
                        navigation.navigate('Home');
                      }}>
                      <Image
                        source={addIcon}
                        style={styles.defaultMessageAddIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true}>
                  {user.wishlist.map((item) => (
                    <ProfileItem
                      onCardPress={onCardPress}
                      item={item}
                      key={item.id}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.profileSectionTitle}>Gifts</Text>
            {!user.giftItems || user.giftItems.length === 0 ? (
              <View style={styles.defaultMessageContainer}>
                <View style={styles.defaultMessageContentContainer}>
                  <Text style={styles.defaultMessageText}>
                    No gifts to show yet.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.scrollViewContainer}>
                <ScrollView horizontal={true}>
                  {user.giftItems.map((item) => (
                    <ProfileItem
                      onCardPress={onCardPress}
                      item={item}
                      key={item.orderDate}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      )}
    </>
  );
}

export default ProfileWishlistGifts;
