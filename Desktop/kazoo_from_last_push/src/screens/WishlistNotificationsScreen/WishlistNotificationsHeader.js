import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';

const WishlistNotificationsHeader = ({
  view,
  onChangeToNotifications,
  onChangeToWishlist,
}) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const themeSelectedTextColor = theme === 'dark' ? '#4AE0CD' : '#02A8A8';

  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'flex-end',
        height: '10%',
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: themeBackgroundColor,
      }}>
      <View
        style={{
          //borderWidth: 1,
          borderRightWidth: 1,
          borderColor: '#D9D9D9',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          // backgroundColor: view === 'wishlist' ? 'white' : '#F6F4F4',
          backgroundColor: themeBackgroundColor,
        }}>
        <TouchableOpacity
          style={{ marginHorizontal: 5, width: '100%' }}
          onPress={() => onChangeToWishlist()}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: RFPercentage(3),
              paddingBottom: 8,
              paddingTop: 30,
              color:
                view === 'wishlist'
                  ? themeSelectedTextColor
                  : themeElementColor,
              fontWeight: view === 'wishlist' ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
            Wishlist
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //borderWidth: 1,
          //borderLeftWidth: 0.5,
          borderColor: '#545454',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: themeBackgroundColor,
        }}>
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            width: '100%',
          }}
          onPress={() => onChangeToNotifications()}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: RFPercentage(3),
              paddingBottom: 8,
              paddingTop: 30,
              color:
                view === 'notifications'
                  ? themeSelectedTextColor
                  : themeElementColor,
              fontWeight: view === 'notifications' ? 'bold' : 'normal',
              textAlign: 'center',
            }}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistNotificationsHeader;
