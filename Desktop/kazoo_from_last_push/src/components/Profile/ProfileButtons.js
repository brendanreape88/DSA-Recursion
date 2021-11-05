import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import pin from '../../../assets/icons/pin-gifts.png';
import plane from '../../../assets/icons/plane.png';
import sendGiftIcon from '../../../assets/icons/send-gift.png';
import cartIcon from '../../../assets/icons/cart.png';
import addFriendsIcon from '../../../assets/icons/add-friend.png';
import viewFriendsIcon from '../../../assets/icons/view-friends.png';
import walletIcon from '../../../assets/icons/wallet.png';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { newFriendship } from '../../apis/firebase/friends';
import { firebase } from '../../Core/firebase/config';
import { setProfileView } from '../../redux/reducers/app';
import { useDispatch } from 'react-redux';
import { removeFollowRelationship } from '../../apis/firebase/follow';
import { useSelector } from 'react-redux';

const ProfileButtons = ({
  view,
  navigation,
  currentUser,
  otherUser,
  updateShowModal,
}) => {
  const { width, height } = Dimensions.get('window');
  const [
    friendRequestNotificationID,
    setFriendRequestNotificationID,
  ] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (view === 'follower') {
      const notificationsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/notifications`);
      notificationsDB
        .where('type', '==', 'friendRequest')
        .where('sender', '==', otherUser.id)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.data()) {
              setFriendRequestNotificationID(doc.id);
            }
          });
        });
    }
  }, [currentUser, otherUser, view]);

  let showCurrUserButtons;
  let showMultiButtons;
  let showAcceptButton;
  let showAddButton;

  switch (view) {
    case 'current user':
      showCurrUserButtons = true;
      break;

    case 'friend':
      showMultiButtons = true;
      break;

    case 'off-app friend':
      showMultiButtons = true;
      break;

    case 'following':
      showMultiButtons = true;
      break;

    case 'follower':
      showAcceptButton = friendRequestNotificationID ? true : false;
      showAddButton = friendRequestNotificationID ? false : true;
      break;

    case 'stranger':
      showAddButton = true;
      break;

    default:
      break;
  }

  return (
    <View
      style={{
        border: 1,
        backgroundColor: themeBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        marginHorizontal: 10,
      }}>
      {showCurrUserButtons && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('User Search')}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={addFriendsIcon}
              style={{
                height: width * 0.065,
                width: width * 0.065,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('My People');
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={viewFriendsIcon}
              style={{
                height: width * 0.065,
                width: width * 0.065,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (view !== 'off-app friend') {
                navigation.navigate('Kazoo Wallet');
              }
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={walletIcon}
              style={{
                height: width * 0.072,
                width: width * 0.072,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (view !== 'off-app friend') {
                navigation.navigate('Shopping Bag');
              }
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={cartIcon}
              style={{
                height: width * 0.06,
                width: width * 0.07,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
        </>
      )}
      {showMultiButtons && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={pin}
              style={{
                height: width * 0.065,
                width: width * 0.055,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (view !== 'off-app friend') {
                navigation.navigate('Shout Out Screen', {
                  selectedFriendId: otherUser.id,
                });
              }
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={plane}
              style={{
                height: width * 0.065,
                width: width * 0.065,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (view !== 'off-app friend') {
                navigation.navigate('Wishlist');
              }
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={sendGiftIcon}
              style={{
                height: width * 0.065,
                width: width * 0.1,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (view !== 'off-app friend') {
                navigation.navigate('Shopping Bag');
              }
            }}
            style={{
              backgroundColor: '#34B6A6',
              justifyContent: 'center',
              alignItems: 'center',
              height: width * 0.1,
              width: width * 0.2,
              borderRadius: 20,
            }}>
            <Image
              source={cartIcon}
              style={{
                height: width * 0.06,
                width: width * 0.07,
                tintColor: themeBackgroundColor,
              }}
            />
          </TouchableOpacity>
        </>
      )}
      {showAcceptButton && (
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: '#34B6A6',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.5,
          }}
          onPress={() => {
            dispatch(setProfileView('friend'));
            newFriendship(otherUser, currentUser, friendRequestNotificationID);
            removeFollowRelationship(currentUser, otherUser);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: themeBackgroundColor,
              fontSize: RFPercentage(1.5),
            }}>
            Accept Friend Request
          </Text>
        </TouchableOpacity>
      )}
      {showAddButton && (
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: '#34B6A6',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.5,
          }}
          onPress={() => {
            updateShowModal(true);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: themeBackgroundColor,
              fontSize: RFPercentage(2),
            }}>
            Add Friend
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileButtons;
