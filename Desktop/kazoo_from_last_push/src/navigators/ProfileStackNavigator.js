import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen, ProfileScreen, WishlistScreen } from '../screens';
import FirebaseOrderAPIManager from '../apis/OrderAPIManager/FirebaseOrderAPIManager';
import { IMLocalized } from '../Core/localization/IMLocalization';
import AppStyles from '../AppStyles';

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="My Profile">
      <ProfileStack.Screen name="My Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="My Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Wishlist" component={WishlistScreen} />
    </ProfileStack.Navigator>
  );
};
export default ProfileStackNavigator;
