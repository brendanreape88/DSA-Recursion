import React, { useCallback, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOtherUserData,
  setProfileView,
  setMemoriesView,
  setMemories,
  setSelectedMemoryIndex,
  setActiveTab,
} from '../redux/reducers/app';
import calendarIcon from '../../assets/icons/calendar.png';
import bagIcon from '../../assets/icons/bag.png';
import giftIcon from '../../assets/icons/gift.png';
import kazooIcon from '../../assets/icons/kazoo-icon.png';
import { connect } from 'react-redux';
import { firebase } from '../Core/firebase/config';

const BottomTabBar = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.app.user);
  const { height, width } = Dimensions.get('window');
  const [activeIndexes] = useState({
    profile: [7, 11, 12, 15, 22, 23, 25, 26, 27, 28, 29, 31, 32, 33, 34],
    calendar: [2, 6, 30],
    birthday: [1, 20, 21],
    shop: [3, 4, 8, 9, 10, 13, 14, 16, 17, 18, 19, 35, 36],
    notifications: [24],
  });
  const isActive = useCallback(
    (section) => activeIndexes[section].indexOf(props.state.index) > -1,
    [props.state.index, activeIndexes],
  );

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';

  const avatar = useSelector((state) => state.app.user.profilePictureURL);
  const tempAvatar = useSelector((state) => state.app.avatar);
  const defaultProfilePhotoURL = 'https://i.ibb.co/fdNPmfT/user.png';

  const { notificationCount } = props;

  useEffect(() => {
    const memoriesDB = firebase
      .firestore()
      .collection(`users/${currentUser.id}/memories`);
    return memoriesDB.orderBy('dateCreated', 'desc').onSnapshot((snapshot) => {
      dispatch(
        setMemories(
          snapshot?.docs?.map((doc) => ({
            id: doc?.id,
            ...doc?.data(),
          })),
        ),
      );
    });
  }, [currentUser.id, dispatch]);

  // '#4AE0CD'

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: height * 0.08,
        backgroundColor: themeBackgroundColor,
        //paddingBottom: 30,
      }}>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          // borderWidth: 1,
        }}
        onPress={() => {
          dispatch(setSelectedMemoryIndex(null));
          dispatch(setProfileView('current user'));
          dispatch(setOtherUserData({}));
          dispatch(setMemoriesView('current user'));
          dispatch(setActiveTab('profile'));
          props.navigation.navigate('User Profile');
        }}>
        <Image
          source={{ uri: tempAvatar || avatar || defaultProfilePhotoURL }}
          style={{
            minWidth: 0.11 * width,
            minHeight: 0.11 * width,
            borderWidth: 2,
            borderColor: isActive('profile') ? '#E5606E' : '#4AE0CD',
            borderRadius: 65,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          // borderWidth: 1,
        }}
        onPress={() => {
          dispatch(setActiveTab('calendar'));
          props.navigation.navigate('Calendar');
        }}>
        <Image
          source={calendarIcon}
          style={{
            tintColor: isActive('calendar') ? '#E5606E' : '#4AE0CD',
            width: 0.1 * width,
            height: 0.1 * width,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          width: 0.14 * width,
          height: 0.14 * width,
          borderWidth: 2,
          borderColor: isActive('birthday') ? '#E5606E' : '#4AE0CD',
          borderRadius: 65,
          backgroundColor: themeBackgroundColor,
          // transform: [{ scaleX: 1.2 }],
          //paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            dispatch(setActiveTab('birthday'));
            props.navigation.navigate('Birthday Party');
          }}>
          <Image
            source={kazooIcon}
            style={{
              tintColor: isActive('birthday') ? '#E5606E' : '#4AE0CD',
              width: 0.07 * width,
              height: 0.1 * width,
              // flex: 1,
              //position: 'absolute',
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          // borderWidth: 1,
        }}
        onPress={() => {
          dispatch(setActiveTab('shop'));
          props.navigation.navigate('Home', {
            type: null,
            item: null,
          });
        }}>
        <Image
          source={bagIcon}
          style={{
            tintColor: isActive('shop') ? '#E5606E' : '#4AE0CD',
            width: 0.1 * width,
            height: 0.12 * width,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          // borderWidth: 1,
        }}
        onPress={() => {
          props.navigation.navigate('Wishlist + Notifications', {
            view: 'current user',
          });
          dispatch(setProfileView('current user'));
          dispatch(setActiveTab('notifications'));
        }}>
        <Image
          source={giftIcon}
          style={{
            tintColor: isActive('notifications') ? '#E5606E' : '#4AE0CD',
            width: 0.1 * width,
            height: 0.1 * width,
          }}
        />
        {notificationCount > 0 && (
          <View
            style={{
              backgroundColor: '#E5606E',
              borderRadius: 65,
              height: 0.05 * width,
              width: 0.05 * width,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: '-15%',
              //left: 0,
              //bottom: 0,
              padding: 1,
            }}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              {notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ app }) => {
  return {
    notificationCount: app.notifications.filter(
      (notification) => !notification.seen,
    ).length,
  };
};

export default connect(mapStateToProps)(BottomTabBar);
