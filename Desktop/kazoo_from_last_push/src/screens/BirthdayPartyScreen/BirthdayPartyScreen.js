import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import { connect } from 'react-redux';
import {
  setUserData,
  setNotifications,
  setWish,
  setGifts,
  setSizingProfile,
  setAddresses,
  setKazooCashBalance,
} from '../../redux/reducers/app';
import addIcon from '../../../assets/icons/add.png';
import Header from '../../components/Headers/Header/Header';
import Post from '../../components/Post/Post';
import FriendOfFriendAvatar from '../../components/FriendOfFriendAvatar/FriendOfFriendAvatar';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { followReferringUser } from '../../apis/firebase/notifications';

const BirthdayPartyScreen = (props) => {
  const currentUserID = props.user.id;
  const [friends, setFriends] = useState([]);
  const [friendsOfFriends, setFriendsOfFriends] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const kazooCash = useSelector((state) => state.app.kazooCashBalance);
  const showKazooCash = useSelector((state) => state.app.showKazooCash);
  const showAddFriends =
    recentPosts.length === 0 && friends.length === 0 ? true : false;
  const showNoPostsMessage =
    recentPosts.length === 0 && friends.length > 0 ? true : false;
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const referringUserId = useSelector((state) => state.app.referringUserId);

  useEffect(() => {
    if (!currentUserID || !referringUserId) {
      return () => {};
    }

    const referringUserRelationship = async () => {
      try {
        const friendsRef = firebase
          .firestore()
          .collection(`users/${currentUserID}/friends`);
        const isFriend = await friendsRef
          .doc(referringUserId)
          .get()
          .then((doc) => {
            if (doc.data()) {
              return 'yes';
            }
          });

        const followersRef = firebase
          .firestore()
          .collection(`users/${currentUserID}/followers`);
        const isFollower = await followersRef
          .doc(referringUserId)
          .get()
          .then((doc) => {
            if (doc.data()) {
              return 'yes';
            }
          });

        const followingRef = firebase
          .firestore()
          .collection(`users/${currentUserID}/following`);
        const isBeingFollowed = await followingRef
          .doc(referringUserId)
          .get()
          .then((doc) => {
            if (doc.data()) {
              return 'yes';
            }
          });

        const blockedRef = firebase
          .firestore()
          .collection(`users/${currentUserID}/blockedUsers`);
        const isBlocked = await blockedRef
          .doc(referringUserId)
          .get()
          .then((doc) => {
            if (doc.data()) {
              return 'yes';
            }
          });

        const blockingRef = firebase
          .firestore()
          .collection(`users/${currentUserID}/blockedBy`);
        const isBlocking = await blockingRef
          .doc(referringUserId)
          .get()
          .then((doc) => {
            if (doc.data()) {
              return 'yes';
            }
          });

        if (
          !isFriend &&
          !isFollower &&
          !isBeingFollowed &&
          !isBlocked &&
          !isBlocking
        ) {
          const referringUserRef = firebase
            .firestore()
            .collection('users')
            .doc(referringUserId);
          const referringUserData = await referringUserRef.get().then((doc) => {
            return doc.data();
          });

          followReferringUser(currentUserID, referringUserData);
        } else {
          return () => {};
        }
      } catch (error) {
        alert(error);
      }
    };

    referringUserRelationship();
  }, [currentUserID, referringUserId]);

  useEffect(() => {
    if (!currentUserID) {
      return () => {};
    }
    const kazooCashDB = firebase
      .firestore()
      .collection('kazoo_cash')
      .doc(currentUserID);
    return kazooCashDB.onSnapshot((doc) => {
      const data = doc.data();
      if (data) {
        dispatch(setKazooCashBalance(data.balance));
      }
    });
  }, [currentUserID, dispatch]);

  useEffect(() => {
    if (!currentUserID) {
      return () => {};
    }
    const notificationsDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/notifications`);
    return notificationsDB.onSnapshot((snapshot) => {
      props.setNotifications(snapshot.docs.map((doc) => doc.data()));
    });
  }, [currentUserID, props.setNotifications, props]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    async function getFriendsOfFriends() {
      const friendsAndFollowing = new Set();
      const friendSuggestions = new Set();
      const friendsArray = [];

      // Get user's friends
      const friendsDB = firebase
        .firestore()
        .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
        .doc(currentUserID);
      await friendsDB
        .collection(AppConfig.FIREBASE_COLLECTIONS.FRIENDS)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            friendsAndFollowing.add(doc.id);
            friendsArray.push(doc.id); // will select random friend from this array
          });
        });
      setFriends(friendsArray);

      // Get user's following
      await friendsDB
        .collection(AppConfig.FIREBASE_COLLECTIONS.FOLLOWING)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            friendsAndFollowing.add(doc.id);
          });
        });

      // Pick a random friend to get suggestion from
      const randomFriendID =
        friendsArray[Math.floor(Math.random() * friendsArray.length)];

      // Get friend's friends
      const randomFriendDb = firebase
        .firestore()
        .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
        .doc(randomFriendID)
        .collection(AppConfig.FIREBASE_COLLECTIONS.FRIENDS);
      const usersFriends = await randomFriendDb.limit(50).get();

      // If their friend is not in users friend or following
      usersFriends.forEach((doc) => {
        if (!friendsAndFollowing.has(doc.id) && doc.id !== currentUserID) {
          friendSuggestions.add({
            friendDocumentID: doc.id,
            friendID: doc.get('friendID'),
            firstName: doc.get('firstName'),
          });
        }
      });

      setFriendsOfFriends(Array.from(friendSuggestions));
    }
    getFriendsOfFriends(currentUserID);
  }, [currentUserID, isFocused]);

  useEffect(() => {
    if (!currentUserID || !isFocused) {
      return () => {};
    }
    // Fetch posts of friends who have been recently active
    const fetchRecentUserPosts = async () => {
      const recentFriends = await firebase
        .firestore()
        .collection('friends')
        .where('friends', 'array-contains', currentUserID)
        .orderBy('lastPost', 'desc')
        .limit(100)
        .get();
      const recentFriendsData = recentFriends.docs.map((doc) => doc.data());

      const unsortedPosts = recentFriendsData.reduce(
        (acc, cur) => acc.concat(cur.recentPosts),
        [],
      );

      const unsortedPostsConvertedDate = unsortedPosts.map((p) => ({
        convertedDate: p.datePosted.toDate(),
        ...p,
      }));

      const sortedPosts = unsortedPostsConvertedDate.sort(
        (a, b) => b.convertedDate - a.convertedDate,
      );

      setRecentPosts(sortedPosts);
    };
    fetchRecentUserPosts();
  }, [currentUserID, isFocused]);

  // console.log('sorted posts', recentPosts);

  useEffect(() => {
    const wishlistDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/wishlist`);
    return wishlistDB.limit(10).onSnapshot((snapshot) => {
      dispatch(
        setWish(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    });
  }, [currentUserID, dispatch]);

  useEffect(() => {
    const giftsDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/gifts`);
    return giftsDB.limit(10).onSnapshot((snapshot) => {
      dispatch(
        setGifts(
          snapshot?.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() })),
        ),
      );
    });
  }, [currentUserID, dispatch]);

  useEffect(() => {
    const sizingDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/sizing`);
    sizingDB.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id) {
          dispatch(setSizingProfile(doc.data()));
        }
      });
    });
  }, [currentUserID, dispatch]);

  useEffect(() => {
    const addressArray = [];
    const addressesDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/addresses`);
    addressesDB
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id) {
            addressArray.push({ addressDocumentID: doc.id, ...doc.data() });
          }
        });
      })
      .then(() => {
        if (addressArray.length > 0) {
          dispatch(setAddresses(addressArray));
        }
      });
  }, [currentUserID, dispatch]);

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <Header navigation={props.navigation} route={props.route} />
      {showKazooCash && (
        <View
          style={{
            position: 'absolute',
            right: 9,
            top: '11%',
            borderWidth: 1,
            borderColor: '#E5606E',
            borderRadius: 20,
            backgroundColor: themeBackgroundColor,
            zIndex: 100,
            padding: 5,
          }}>
          <Text style={{ color: themeElementColor }}>${kazooCash}</Text>
        </View>
      )}
      <>
        {friendsOfFriends.length > 0 && (
          <View
            style={{
              backgroundColor: themeBackgroundColor,
              ...styles.friendsOfFriendsContainer,
            }}>
            <FlatList
              data={friendsOfFriends}
              extraData={props}
              horizontal={true}
              keyExtractor={(item) => item.friendID}
              renderItem={({ item }) => (
                <FriendOfFriendAvatar props={props} item={item} />
              )}
            />
          </View>
        )}
        {showAddFriends && (
          <View
            style={{
              backgroundColor: themeBackgroundColor,
              ...styles.noFriendsContainer,
            }}>
            <View
              style={{
                backgroundColor: themeBackgroundColor,
                ...styles.noFriendsContentContainer,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#545454',
                }}>
                Add your friends!
              </Text>
              <TouchableOpacity
                style={styles.noFriendsAddFriendsButton}
                onPress={() => {
                  props.navigation.navigate('User Search');
                }}>
                <Image
                  source={addIcon}
                  style={styles.noFriendsAddFriendsIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showNoPostsMessage && (
          <View
            style={{
              flex: 1000,
              backgroundColor: themeBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: themeElementColor,
              }}>
              No posts to display right now.
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.feedContainer,
          }}>
          {recentPosts.length > 0 && (
            <FlatList
              data={recentPosts}
              keyExtractor={(item) => item.postID}
              renderItem={({ item }) => (
                <Post
                  recentPost={item}
                  props={props}
                  themeBackgroundColor={themeBackgroundColor}
                  themeElementColor={themeElementColor}
                />
              )}
            />
          )}
        </View>
      </>
    </View>
  );
};

const mapStateToProps = ({ app, checkout, products }) => {
  return {
    user: app.user,
    wishlist: app.user.wishlist,
    friends: app.friends,
    shippingMethods: checkout.shippingMethods,
    stripeCustomer: app.stripeCustomer,
    shoppingBag: products.shoppingBag,
  };
};

export default connect(mapStateToProps, {
  setUserData,
  setNotifications,
})(BirthdayPartyScreen);
