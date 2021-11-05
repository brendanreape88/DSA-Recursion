import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileView } from '../../redux/reducers/app';
import PropTypes from 'prop-types';
import { View, StatusBar, ScrollView } from 'react-native';
import ProfileImageCard from './ProfileImageCard';
import ProfileWishlist from './ProfileWishlist';
import ProfileGifts from './ProfileGifts';
import ProfileMemories from './ProfileMemories';
import ProfileHeader from '../Headers/ProfileHeader/ProfileHeader';
import { firebase } from '../../Core/firebase/config';
import { friendRequest } from '../../apis/firebase/notifications';
import { followUser } from '../../apis/firebase/follow';
import AddFriend from '../Modals/AddFriend/AddFriend';
import ProfilePinnedGifts from './ProfilePinnedGifts';
import ProfileMenu from './ProfileMenu';
import ProfileButtons from './ProfileButtons';
import PrivateProfileMessage from './ProfilePrivateMessage';
import { useIsFocused } from '@react-navigation/native';

function Profile(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.app.user);
  const otherUser = useSelector((state) => state.app.otherUser);
  const view = useSelector((state) => state.app.profileView);
  const { navigation, onCardPress } = props;
  const [showModal, updateShowModal] = useState(false);
  const [friendDocumentID, setFriendDocumentID] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const isFocused = useIsFocused();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    setDisabled(false);
  }, [isFocused]);

  useEffect(() => {
    if ((view === 'friend' || 'off-app friend') && otherUser.id) {
      const friendsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/friends`);
      friendsDB
        .where('friendID', '==', otherUser.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setFriendDocumentID(doc.id);
          });
        });
    } else if ((view === 'friend' || 'off-app friend') && otherUser.friendID) {
      const friendsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/friends`);
      friendsDB
        .where('friendID', '==', otherUser.friendID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setFriendDocumentID(doc.id);
          });
        });
    } else {
      return () => {};
    }
  }, [view, otherUser, currentUser.id]);

  const onAdd = () => {
    dispatch(setProfileView('following'));
    followUser(currentUser, otherUser);
    friendRequest(currentUser, otherUser);
    updateShowModal(false);
  };

  let showPinnedGifts;
  let showWishlist;
  let showGifts;
  let showMemories;
  let showPrivateProfileMessage;

  switch (view) {
    case 'current user':
      showWishlist = true;
      showGifts = true;
      showMemories = true;
      break;

    case 'friend':
      showPinnedGifts = true;
      showWishlist = true;
      showGifts = true;
      showMemories = true;
      break;

    case 'off-app friend':
      showPinnedGifts = true;
      showGifts = true;
      break;

    case 'following':
      showPinnedGifts = true;
      showWishlist = true;
      break;

    case 'follower':
      showPrivateProfileMessage = true;
      break;

    case 'stranger':
      showPrivateProfileMessage = true;
      break;

    default:
      break;
  }

  return (
    <View style={{ flex: 1, backgroundColor: themeBackgroundColor }}>
      <AddFriend
        onAdd={onAdd}
        showModal={showModal}
        updateShowModal={updateShowModal}
        otherUser={otherUser}
        view={view}
      />
      <StatusBar hidden />

      <ProfileHeader
        navigation={navigation}
        currentUser={currentUser}
        otherUser={otherUser}
        view={view}
        setShowMenu={setShowMenu}
        previousOtherUser={props.previousOtherUser}
        previousProfileView={props.previousProfileView}
        disabled={disabled}
        setDisabled={setDisabled}
      />

      <ProfileImageCard
        user={view === 'current user' ? currentUser : otherUser}
        view={view}
      />

      <ProfileButtons
        view={view}
        navigation={navigation}
        currentUser={currentUser}
        otherUser={otherUser}
        updateShowModal={updateShowModal}
        themeBackgroundColor={themeBackgroundColor}
        themeElementColor={themeElementColor}
      />

      {showPrivateProfileMessage && <PrivateProfileMessage />}

      <ScrollView style={{ backgroundColor: themeBackgroundColor }}>
        {showPinnedGifts && (
          <ProfilePinnedGifts
            currentUser={currentUser}
            otherUserID={otherUser.id}
            otherUser={otherUser}
            onCardPress={onCardPress}
            friendDocumentID={friendDocumentID}
            view={view}
            themeBackgroundColor={themeBackgroundColor}
            themeElementColor={themeElementColor}
          />
        )}
        {showWishlist && (
          <ProfileWishlist
            currentUser={currentUser}
            otherUserID={otherUser.id}
            otherUser={otherUser}
            onCardPress={onCardPress}
            view={view}
          />
        )}
        {showGifts && (
          <ProfileGifts
            currentUser={currentUser}
            otherUserID={otherUser.id}
            otherUser={otherUser}
            onCardPress={onCardPress}
            view={view}
            themeBackgroundColor={themeBackgroundColor}
            themeElementColor={themeElementColor}
          />
        )}
        {showMemories && (
          <ProfileMemories
            navigation={navigation}
            otherUserID={otherUser.id}
            otherUser={otherUser}
            currentUser={currentUser}
            view={view}
            themeBackgroundColor={themeBackgroundColor}
            themeElementColor={themeElementColor}
          />
        )}
      </ScrollView>

      {showMenu && (
        <ProfileMenu
          navigation={props.navigation}
          currentUser={currentUser}
          otherUser={otherUser}
          view={view}
          setShowMenu={setShowMenu}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      )}
    </View>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
  ProfileScreen: PropTypes.array,
  navigation: PropTypes.object,
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onItemPress: PropTypes.func,
};

export default Profile;
