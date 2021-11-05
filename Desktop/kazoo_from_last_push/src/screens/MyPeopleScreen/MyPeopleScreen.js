import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import MyPeopleButton from './MyPeopleButton';
import { useSelector } from 'react-redux';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useIsFocused } from '@react-navigation/native';

const MyPeopleScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const isFocused = useIsFocused();
  const currentUser = useSelector((state) => state.app.user);
  const [view, setView] = useState('My People');
  const [gridData, setGridData] = useState(null);
  const [personType, setPersonType] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsPreview, setFriendsPreview] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followersPreview, setFollowersPreview] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingPreview, setFollowingPreview] = useState([]);
  const [generalAccounts, setGeneralAccounts] = useState([]);
  const [generalAccountsPreview, setGeneralAccountsPreview] = useState([]);
  const [offAppFriends, setOffAppFriends] = useState([]);
  const [offAppFriendsPreview, setOffAppFriendsPreview] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [blockedPreview, setBlockedPreview] = useState([]);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const friendsArray = [];
    // const friendIDsPreviewArray = [];
    let friendsPreviewArray;
    const friendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/friends`);
    friendsDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const friendData = {
            friendDocumentID: doc.id,
            id: doc.data().friendID,
            ...doc.data(),
          };
          friendsArray.push(friendData);
        });
      })
      .then(() => {
        setFriends(friendsArray);
        friendsPreviewArray = friendsArray.slice(0, 10);
        setFriendsPreview(friendsPreviewArray);
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const followingArray = [];
    let followingPreviewArray;
    const followingDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/following`);
    followingDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          followingArray.push({
            id: doc.data().userBeingFollowed,
            ...doc.data(),
          });
        });
      })
      .then(() => {
        setFollowing(followingArray);
        followingPreviewArray = followingArray.slice(0, 10);
        setFollowingPreview(followingPreviewArray);
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const followersArray = [];
    let followersPreviewArray;
    const followersDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/followers`);
    followersDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          followersArray.push({ id: doc.data().follower, ...doc.data() });
        });
      })
      .then(() => {
        setFollowers(followersArray);
        followersPreviewArray = followersArray.slice(0, 10);
        setFollowersPreview(followersPreviewArray);
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const offAppFriendsArray = [];
    let offAppFriendsPreviewArray;
    const offAppFriendsDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/subUsers`);
    offAppFriendsDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const offAppFriendData = { id: doc.id, ...doc.data() };
          offAppFriendsArray.push(offAppFriendData);
        });
      })
      .then(() => {
        setOffAppFriends(offAppFriendsArray);
        offAppFriendsPreviewArray = offAppFriendsArray.slice(0, 10);
        setOffAppFriendsPreview(offAppFriendsPreviewArray);
      });
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const blockedUsersArray = [];
    let blockedUsersPreviewArray;
    const blockedUsersDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/blockedUsers`);
    blockedUsersDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const blockedUserData = { id: doc.id, ...doc.data() };
          blockedUsersArray.push(blockedUserData);
        });
      })
      .then(() => {
        setBlocked(blockedUsersArray);
        blockedUsersPreviewArray = blockedUsersArray.slice(0, 10);
        setBlockedPreview(blockedUsersPreviewArray);
      });
  }, [isFocused]);

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            if (view === 'My People') {
              navigation.goBack();
            } else {
              setView('My People');
            }
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{view}</Text>
        <View style={styles.headerIcon} />
      </View>
      {view === 'My People' ? (
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            flex: 1,
            alignItems: 'center',
          }}>
          <ScrollView style={{ width: '100%' }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                height: width * 0.37,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (friends.length > 0) {
                    setView('Friends');
                    setPersonType('friend');
                    setGridData(friends);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                  }}>
                  Friends
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: themeElementColor,
                      marginRight: '3%',
                    }}>
                    {friends.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {friendsPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No friends to show.
                  </Text>
                </View>
              )}
              {friendsPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {friendsPreview.map((friend) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={friend.friendID}
                        person={{ type: 'friend', ...friend }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                height: width * 0.37,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (following.length > 0) {
                    setView('Following');
                    setPersonType('following');
                    setGridData(following);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    color: themeElementColor,
                  }}>
                  Following
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: '3%',
                      color: themeElementColor,
                    }}>
                    {following.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {followingPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No followers to show.
                  </Text>
                </View>
              )}
              {followingPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {followingPreview.map((userBeingFollowed) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={userBeingFollowed.userBeingFollowed}
                        person={{
                          type: 'following',
                          id: userBeingFollowed.userBeingFollowed,
                          ...userBeingFollowed,
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                height: width * 0.37,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (followers.length > 0) {
                    setView('Followers');
                    setPersonType('follower');
                    setGridData(followers);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    color: themeElementColor,
                  }}>
                  Followers
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: themeElementColor,
                      marginRight: '3%',
                    }}>
                    {followers.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {followersPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No followers to show.
                  </Text>
                </View>
              )}
              {followersPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {followersPreview.map((follower) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={follower.follower}
                        person={{
                          type: 'follower',
                          id: follower.follower,
                          ...follower,
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                height: width * 0.37,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (generalAccounts.length > 0) {
                    setView('General Accounts');
                    setPersonType('general account');
                    setGridData(generalAccounts);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    color: themeElementColor,
                  }}>
                  General Accounts
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: themeElementColor,
                      marginRight: '3%',
                    }}>
                    {generalAccounts.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {generalAccountsPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No general accounts to show.
                  </Text>
                </View>
              )}
              {generalAccountsPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {generalAccountsPreview.map((friend) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={friend.friendID}
                        friend={friend}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                height: width * 0.37,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (offAppFriends.length > 0) {
                    setView('Off-App Friends');
                    setPersonType('off-app friend');
                    setGridData(offAppFriends);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: themeElementColor,
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                  }}>
                  Off-App Friends
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: themeElementColor,
                      marginRight: '3%',
                    }}>
                    {offAppFriends.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {offAppFriendsPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No off-app friends to show.
                  </Text>
                </View>
              )}
              {offAppFriendsPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {offAppFriendsPreview.map((offAppFriend) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={offAppFriend.id}
                        person={{ type: 'off-app friend', ...offAppFriend }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: themeElementColor,
                width: '100%',
                height: width * 0.37,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (friends.length > 0) {
                    setView('Blocked Accounts');
                    setPersonType('blocked');
                    setGridData(blocked);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2),
                    color: themeElementColor,
                  }}>
                  Blocked Accounts
                </Text>
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: themeElementColor,
                      marginRight: '3%',
                    }}>
                    {blocked.length}
                  </Text>
                  <Image
                    source={arrowheadIcon}
                    style={{
                      height: width * 0.035,
                      width: width * 0.035,
                      transform: [{ rotateY: '180deg' }],
                      tintColor: themeElementColor,
                    }}
                  />
                </View>
              </TouchableOpacity>
              {blockedPreview.length === 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth: 1,
                    height: height * 0.1,
                  }}>
                  <Text style={{ color: themeElementColor }}>
                    No blocked accounts to show.
                  </Text>
                </View>
              )}
              {blockedPreview.length > 0 && (
                <View
                  style={{
                    marginTop: 5,
                    height: height * 0.1,
                  }}>
                  <ScrollView horizontal>
                    {blockedPreview.map((blockedUser) => (
                      <MyPeopleButton
                        navigation={navigation}
                        key={blockedUser.id}
                        person={{ type: 'blocked', ...blockedUser }}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FlatGrid
            itemDimension={width * 0.2}
            data={gridData}
            // style={{ borderWidth: 1 }}
            // staticDimension={300}
            // fixed
            spacing={15}
            renderItem={({ item }) => (
              <MyPeopleButton
                navigation={navigation}
                key={item.id || item.friendID}
                person={{ type: personType, ...item }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default MyPeopleScreen;
