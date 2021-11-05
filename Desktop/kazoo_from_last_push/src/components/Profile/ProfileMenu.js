import React from 'react';
import { useDispatch } from 'react-redux';
import { setProfileView } from '../../redux/reducers/app';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useColorScheme } from 'react-native-appearance';
import { deleteFriendship, newFriendship } from '../../apis/firebase/friends';
import { blockUser, unBlockUser } from '../../apis/firebase/block';
import dynamicStyles from './styles';
import {
  removeFollowRelationship,
  unfollowUser,
} from '../../apis/firebase/follow';
import { useSelector } from 'react-redux';
import viewFriendsIcon from '../../../assets/icons/view-friends.png';
import pinGiftsIcon from '../../../assets/icons/pin-gifts.png';
import viewWishlistIcon from '../../../assets/icons/view-wishlist.png';
import unfriendIcon from '../../../assets/icons/unfriend.png';
import blockIcon from '../../../assets/icons/block.png';
import setPrivacyLevelIcon from '../../../assets/icons/set-privacy-level.png';

const ProfileMenu = ({
  navigation,
  currentUser,
  otherUser,
  view,
  setShowMenu,
  disabled,
  setDisabled,
}) => {
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeMenuBackgroundColor = theme === 'dark' ? '#2B2B2B' : 'lightgrey';
  const themeMenuElementColor = theme === 'dark' ? 'lightgrey' : '#2B2B2B';

  let showViewFriends;
  let showPinGifts;
  let showViewWishlist;
  let showUnfriendUser;
  let showUnfollowUser;
  let showBlockUser;
  let showUnblockUser;
  let showSetPrivacyLevel;

  switch (view) {
    case 'friend':
      showViewFriends = true;
      showPinGifts = true;
      showViewWishlist = true;
      showUnfriendUser = true;
      showBlockUser = true;
      // showSetPrivacyLevel = true;
      break;

    case 'following':
      showViewFriends = true;
      showPinGifts = true;
      showViewWishlist = true;
      showUnfollowUser = true;
      showBlockUser = true;
      // showSetPrivacyLevel = true;
      break;

    case 'follower':
      showBlockUser = true;
      // showSetPrivacyLevel = true;
      break;

    case 'stranger':
      showBlockUser = true;
      // showSetPrivacyLevel = true;
      break;

    case 'blocked':
      showUnblockUser = true;
      // showSetPrivacyLevel = true;
      break;

    default:
      break;
  }

  return (
    <>
      <View style={styles.menuOverlay} />
      <View
        style={{
          backgroundColor: themeMenuBackgroundColor,
          ...styles.menuContainer,
        }}>
        {showViewFriends && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                navigation.navigate("Other User's Friends");
              }}
              style={styles.menuButton}>
              <Image
                source={viewFriendsIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.07,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                View Friends
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showPinGifts && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Home');
              }}
              style={styles.menuButton}>
              <Image
                source={pinGiftsIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.06,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Pin Gifts
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showViewWishlist && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('Wishlist');
              }}
              style={styles.menuButton}>
              <Image
                source={viewWishlistIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.06,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                View Wishlist
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showUnfriendUser && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfileView('stranger'));
                setShowMenu(false);
                deleteFriendship(currentUser, otherUser);
                // navigation.navigate('Home');
              }}
              style={styles.menuButton}>
              <Image
                source={unfriendIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.067,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Unfriend {otherUser.firstName}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showUnfollowUser && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfileView('stranger'));
                setShowMenu(false);
                unfollowUser(currentUser, otherUser);
              }}
              style={styles.menuButton}>
              <Image
                source={unfriendIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.07,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Unfollow {otherUser.firstName}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showBlockUser && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfileView('blocked'));
                setShowMenu(false);
                if (view === 'friend') {
                  deleteFriendship(currentUser, otherUser);
                }
                if (view === 'following') {
                  unfollowUser(currentUser, otherUser);
                }
                if (view === 'follower') {
                  removeFollowRelationship(currentUser, otherUser);
                }
                blockUser(otherUser, currentUser);
              }}
              style={styles.menuButton}>
              <Image
                source={blockIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.07,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Block {otherUser.firstName}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showUnblockUser && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                dispatch(setProfileView('stranger'));
                unBlockUser(otherUser, currentUser);
              }}
              style={styles.menuButton}>
              <Image
                source={viewFriendsIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.07,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Unblock {otherUser.firstName}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showSetPrivacyLevel && (
          <View
            style={{
              borderColor: themeMenuElementColor,
              ...styles.menuItemContainer,
            }}>
            <TouchableOpacity style={styles.menuButton}>
              <Image
                source={setPrivacyLevelIcon}
                style={{
                  tintColor: themeMenuElementColor,
                  height: width * 0.07,
                  width: width * 0.07,
                  ...styles.menuItemIcon,
                }}
              />
              <Text
                style={{
                  color: themeMenuElementColor,
                  ...styles.menuItemText,
                }}>
                Set Privacy Level
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            setDisabled(false);
            setShowMenu(false);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 5,
              backgroundColor: '#979797',
              borderRadius: 20,
            }}>
            <Text style={{ fontSize: RFPercentage(2.5), color: 'white' }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileMenu;
