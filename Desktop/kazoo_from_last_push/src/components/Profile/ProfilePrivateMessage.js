import React from 'react';
import { View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

const ProfilePrivateMessage = () => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeTextColor = theme === 'dark' ? 'white' : 'black';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeBackgroundColor,
      }}>
      <Text
        style={{
          color: themeTextColor,
          fontSize: RFPercentage(3),
          fontWeight: 'bold',
        }}>
        This profile is private
      </Text>
    </View>
  );
};

export default ProfilePrivateMessage;
