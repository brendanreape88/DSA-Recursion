import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../../redux/reducers/app';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import addFriendIcon from '../../../../assets/icons/add-friend.png';
import arrowheadIcon from '../../../../assets/icons/arrowhead-icon.png';
import settingsIcon from '../../../../assets/icons/settings.png';
import hamburger from '../../../../assets/icons/hamburger.png';
import { friendRequest } from '../../../apis/firebase/notifications';
import { newPendingFriendship } from '../../../apis/firebase/friends';
import AddFriend from '../../Modals/AddFriend/AddFriend';
import styles from './styles';

const ProfileHeader = ({
  otherUser,
  navigation,
  setShowMenu,
  previousOtherUser,
  previousProfileView,
  disabled,
  setDisabled,
}) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.app.user);
  const view = useSelector((state) => state.app.profileView);
  const user = view === 'current user' ? loggedInUser : otherUser;
  const [showModal, updateShowModal] = useState(false);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : '#27C9B5';
  const themeElementColor = theme === 'dark' ? '#27C9B5' : 'white';

  let leftIcon;
  let leftIconVisible = false;
  let leftIconOnPress;
  let rightIcon;
  let rightIconVisible = false;
  let rightIconOnPress;

  switch (view) {
    case 'current user':
      leftIconVisible = false;
      rightIcon = settingsIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        navigation.navigate('Settings');
      };
      break;
    case 'friend':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;
    case 'off-app friend':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setShowMenu(true);
      };
      break;
    case 'pending':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;
    case 'following':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;
    case 'follower':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;
    case 'stranger':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;
    case 'blocked':
      leftIcon = arrowheadIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        if (previousOtherUser && previousProfileView) {
          dispatch(setOtherUserData(previousOtherUser));
          dispatch(setProfileView(previousProfileView));
        }
        navigation.goBack();
      };
      rightIcon = hamburger;
      rightIconVisible = true;
      rightIconOnPress = () => {
        setDisabled(true);
        setShowMenu(true);
      };
      break;

    default:
      break;
  }

  const onAdd = () => {
    newPendingFriendship(loggedInUser, otherUser);
    friendRequest(loggedInUser, otherUser);
    updateShowModal(false);
  };

  return (
    <>
      <AddFriend
        onAdd={onAdd}
        showModal={showModal}
        updateShowModal={updateShowModal}
        otherUser={otherUser}
        view={view}
      />
      <View
        style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
        {leftIconVisible && (
          <TouchableOpacity
            onPress={leftIconOnPress}
            style={styles.leftIconButton}>
            <Image source={leftIcon} style={styles.leftIconImage} />
          </TouchableOpacity>
        )}
        {user && (
          <View
            style={{
              width: '80%',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <Text numberOfLines={1} style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        )}
        {rightIconVisible && (
          <TouchableOpacity
            disabled={disabled}
            onPress={rightIconOnPress}
            style={styles.rightIconButton}>
            <Image source={rightIcon} style={styles.rightIconImage} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          ...styles.dividerContainer,
        }}>
        <View style={{ borderColor: themeElementColor, ...styles.divider }} />
      </View>
    </>
  );
};

export default ProfileHeader;
