import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import settingsIcon from '../../../assets/icons/settings.png';
import addFriendIcon from '../../../assets/icons/add-friend.png';

const ProfileSettingsHeader = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: '#34B6A6',
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        height: '10%',
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate('User Search');
        }}>
        <Image
          source={addFriendIcon}
          style={{ height: 30, width: 30, tintColor: 'white' }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Image style={{ height: 30, width: 30 }} source={settingsIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettingsHeader;
