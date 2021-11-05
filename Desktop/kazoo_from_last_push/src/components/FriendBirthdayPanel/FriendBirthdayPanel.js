import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUserData, setProfileView } from '../../redux/reducers/app';
import MessageIcon from '../../../assets/icons/plane.png';
import sendGiftIcon from '../../../assets/icons/send-gift.png';
import getBirthdayCountdown from './getBirthdayCountdown';
import Moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';

function FriendBirthdayPanel(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  //const colorScheme = useColorScheme();
  //const styles = dynamicStyles(colorScheme);
  const [userStatus, setUserStatus] = useState(
    props.authorIsCurrUser
      ? 'current user'
      : props.type === 'off-app friend'
      ? 'off-app friend'
      : 'friend',
  );
  const [otherUser, setOtherUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const birthdateProps = props.birthdate || props.author.birthdate;
  const birthdate = Moment(birthdateProps, 'MM/DD/YYYY');
  const birthdateDisplay = birthdate.format('MMMM D');
  birthdate.year(new Date().getFullYear());
  if (birthdate.isBefore(new Date())) {
    birthdate.add(1, 'year');
  }
  const birthdayCountdown = getBirthdayCountdown(birthdate.toDate());

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const displaySender =
    props?.post?.type === 'gift' || props?.post?.type === 'shoutout'
      ? true
      : false;

  // const dynamicText = displaySender
  //   ? `from ${props.post?.senderFirstName} ${props.post?.senderLastName}`
  //   : birthdateDisplay;

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    if (!props.author && props.type !== 'off-app friend') {
      const users = firebase.firestore().collection('users');
      users
        .where('id', '==', props.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const userAvatar = data.profilePictureURL;
            setOtherUser(data);
            setAvatar(userAvatar);
          });
        });
    } else if (props.author) {
      setOtherUser(props.author);
      setAvatar(props.author.profilePictureURL);
    } else {
      setOtherUser(props);
      setAvatar(props.profilePictureURL);
    }
  }, [props, isFocused]);

  return (
    <View>
      <View
        style={{
          backgroundColor: props.themeBackgroundColor,
          // borderColor: themeElementColor,
          ...styles.panelContainer,
        }}>
        <TouchableOpacity
          style={styles.panelFriendButton}
          onPress={() => {
            dispatch(setProfileView(userStatus));
            dispatch(setOtherUserData(otherUser));
            props.navigation.navigate('Friend Profile');
          }}>
          <View style={styles.panelAvatarContainer}>
            {avatar ? (
              <Image
                source={{ uri: avatar, cache: 'force-cache' }}
                style={styles.panelAvatarImage}
              />
            ) : (
              <View style={styles.panelAvatarImage} />
            )}
          </View>
          <View style={styles.panelNameContainer}>
            {otherUser && (
              <>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{
                    color: themeElementColor,
                    ...styles.panelNameText,
                  }}>
                  {otherUser.firstName} {otherUser.lastName}
                </Text>
                {displaySender ? (
                  <Text style={{ color: '#979797' }}>
                    from
                    <Text
                      style={{
                        color: '#979797',
                        fontWeight: 'bold',
                      }}>{` ${props.post?.senderFirstName} ${props.post?.senderLastName}`}</Text>
                  </Text>
                ) : (
                  <Text style={{ color: '#979797' }}>{birthdateDisplay}</Text>
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.panelButtonsContainer}>
          <View style={styles.panelButtonContainer}>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={(e) => {
                if (props.type !== 'off-app friend') {
                  props.navigation.navigate('Shout Out Screen', {
                    selectedFriendId: otherUser.id,
                  });
                }
              }}>
              <Image source={MessageIcon} style={styles.panelButtonIconPlane} />
            </TouchableOpacity>
          </View>
          <View style={styles.panelButtonContainer}>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={(e) => {
                if (props.type !== 'off-app friend') {
                  dispatch(setOtherUserData(otherUser));
                  dispatch(setProfileView('friend'));
                  props.navigation.navigate('Friend Wishlist');
                }
              }}>
              <Image
                source={sendGiftIcon}
                style={styles.panelButtonIconTruck}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default FriendBirthdayPanel;
