import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { updateRecipient } from '../../redux/reducers/checkout';
import sortBy from 'lodash.sortby';
import Header from '../../components/Headers/Header/Header';
import { firebase } from '../../Core/firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import RecipientButton from './recipientButton';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

function SelectRecipientScreen({ navigation, route }) {
  const currentUserID = useSelector((state) => state.app.user.id);
  const [friends, setFriends] = useState([]);
  const [friendsToPinGiftsFor, setFriendsToPinGiftsFor] = useState([]);
  const [followingToPinGiftsFor, setFollowingToPinGiftsFor] = useState([]);
  const [subUsersToPinGiftsFor, setSubUsersToPinGiftsFor] = useState([]);
  const [buttonText, setButtonText] = useState('Pin Gift');
  const type = route.params.type;
  const [sendGiftTo, setSendGiftTo] = useState(route.params.sendGiftTo);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }

    const usersArray = [];
    const friendsDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/friends`);
    friendsDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const friend = { type: 'friend', documentID: doc.id, ...doc.data() };
          usersArray.push(friend);
        });
      })
      .then(() => {
        const followingDB = firebase
          .firestore()
          .collection(`users/${currentUserID}/following`);
        followingDB
          .orderBy('firstName')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const following = {
                type: 'following',
                documentID: doc.id,
                ...doc.data(),
              };
              usersArray.push(following);
            });
          });
      })
      .then(() => {
        const subUsersDB = firebase
          .firestore()
          .collection(`users/${currentUserID}/subUsers`);
        subUsersDB
          .orderBy('firstName')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.id) {
                const subUser = {
                  type: 'sub user',
                  documentID: doc.id,
                  ...doc.data(),
                };
                usersArray.push(subUser);
              }
            });
          })
          .then(() => {
            usersArray.sort(function (a, b) {
              if (a.firstName < b.firstName) {
                return -1;
              }
              if (a.firstName > b.firstName) {
                return 1;
              }
              return 0;
            });
            setFriends(usersArray);
          });
      });
  }, [isFocused]);

  const pinGifts = () => {
    console.log('pin gift ran');
    const giftCopy = { ...route.params.item };
    console.log('gift copy', giftCopy);
    if (giftCopy.purchaseFromWishlistID === undefined) {
      delete giftCopy.purchaseFromWishlistID;
    }
    setButtonText('Pinning...');
    console.log('friends to pin gifts for', friendsToPinGiftsFor);
    console.log('following to pin gifts for', followingToPinGiftsFor);
    console.log('subUsers to pin gifts for', subUsersToPinGiftsFor);
    if (friendsToPinGiftsFor.length > 0) {
      friendsToPinGiftsFor.map((friendDocumentID) => {
        const pinnedGiftsDB = firebase
          .firestore()
          .collection(
            `users/${currentUserID}/friends/${friendDocumentID}/pinnedGifts`,
          );
        pinnedGiftsDB
          .doc(giftCopy.id)
          .set(giftCopy)
          .then(() => {
            console.log(
              `item pinned to friend document ID : ${friendDocumentID}`,
            );
          });
      });
    }
    if (followingToPinGiftsFor.length > 0) {
      followingToPinGiftsFor.map((documentID) => {
        const pinnedGiftsDB = firebase
          .firestore()
          .collection(
            `users/${currentUserID}/following/${documentID}/pinnedGifts`,
          );
        pinnedGiftsDB
          .doc(giftCopy.id)
          .set(giftCopy)
          .then(() => {
            console.log(
              `item pinned to user being followed document ID : ${documentID}`,
            );
          });
      });
    }
    if (subUsersToPinGiftsFor.length > 0) {
      subUsersToPinGiftsFor.map((documentID) => {
        const pinnedGiftsDB = firebase
          .firestore()
          .collection(
            `users/${currentUserID}/subUsers/${documentID}/pinnedGifts`,
          );
        pinnedGiftsDB
          .doc(giftCopy.id)
          .set(giftCopy)
          .then(() => {
            console.log(`item pinned to sub user document ID : ${documentID}`);
          });
      });
    }
    setButtonText('Success!');
    setFriendsToPinGiftsFor([]);
    setFollowingToPinGiftsFor([]);
    setSubUsersToPinGiftsFor([]);
    navigation.navigate('Home');
  };

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <Header navigation={navigation} route={route} type={route.params.type} />
      {friends && (
        <FlatGrid
          itemDimension={width * 0.25}
          data={friends}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={20}
          renderItem={({ item }) => (
            <RecipientButton
              item={item}
              navigation={navigation}
              updateRecipient={updateRecipient}
              type={route.params.type}
              itemToPin={route.params.item}
              currentUserID={currentUserID}
              friendsToPinGiftsFor={friendsToPinGiftsFor}
              setFriendsToPinGiftsFor={setFriendsToPinGiftsFor}
              followingToPinGiftsFor={followingToPinGiftsFor}
              setFollowingToPinGiftsFor={setFollowingToPinGiftsFor}
              subUsersToPinGiftsFor={subUsersToPinGiftsFor}
              setSubUsersToPinGiftsFor={setSubUsersToPinGiftsFor}
              sendGiftTo={sendGiftTo}
              setSendGiftTo={setSendGiftTo}
            />
          )}
        />
      )}
      {route.params.type === 'pin gift' && (
        <TouchableOpacity
          onPress={() => {
            pinGifts();
          }}
          style={{
            backgroundColor: '#4AE0CD',
            height: '6%',
            width: '90%',
            marginHorizontal: '5%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
            }}>
            Pin Gift
          </Text>
        </TouchableOpacity>
      )}
      {route.params.type === 'send as gift' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Gift Wrapping');
          }}
          style={{
            backgroundColor: '#4AE0CD',
            height: '6%',
            width: '90%',
            marginHorizontal: '5%',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
            }}>
            Confirm Gift Recipient
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const mapStateToProps = ({ app }) => {
  return {
    friends: sortBy(app.friends, 'firstName'),
  };
};

export default connect(mapStateToProps, { updateRecipient })(
  SelectRecipientScreen,
);
