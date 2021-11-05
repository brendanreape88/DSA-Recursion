import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ShoppingBagScreen,
  CategoryProductGridScreen,
  SettingsScreen,
  ContactUsScreen,
  EditProfileScreen,
  ShippingAddressScreen,
  ShippingMethodScreen,
  PaymentMethodScreen,
  AddACardScreen,
  CheckoutScreen,
  BirthdayPartyScreen,
  SelectRecipientScreen,
  ProfileScreen,
  CalendarScreen,
  ShopScreen,
  UserSearchScreen,
  DayViewScreen,
  HomeScreen,
  GiftWrappingScreen,
  WishlistScreen,
  OrderScreen,
  ShoutOutScreen,
  MemoriesScreen,
  FollowAndInviteFriendsScreen,
  SizingScreen,
  PurchaseHistoryScreen,
  AddEventScreen,
  ManageAddresses,
  MyPeopleScreen,
  OtherUsersFriendsScreens,
  KazooWalletScreen,
  FilteredProductsScreen,
  CategoriesScreen,
} from '../screens';

import FirebaseOrderAPIManager from '../apis/OrderAPIManager/FirebaseOrderAPIManager';
import appStyles from '../AppStyles';
import WishlistNotificationsScreen from '../screens/WishlistNotificationsScreen/WishlistNotificationsScreen';
import appConfig from '../ShopertinoConfig';
import messaging from '@react-native-firebase/messaging';
import BottomTabBar from './BottomTabBar';
import { ResetPasswordScreen } from '../Core/onboarding';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('token', token);
      }
    }
    requestUserPermission();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Birthday Party"
      tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Add A Card"
        component={AddACardScreen}
      />
      <Tab.Screen
        initialParams={{
          appStyles,
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Birthday Party"
        component={BirthdayPartyScreen}
      />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="CategoryProductGrid"
        component={CategoryProductGridScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Checkout"
        component={CheckoutScreen}
      />
      <Tab.Screen name="Contact" component={ContactUsScreen} />
      <Tab.Screen name="Day View" component={DayViewScreen} />
      <Tab.Screen name="Edit Profile" component={EditProfileScreen} />
      <Tab.Screen name="Gift Wrapping" component={GiftWrappingScreen} />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="PaymentMethod"
        component={PaymentMethodScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="User Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Friend Profile"
        component={ProfileScreen}
      />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Select Recipient" component={SelectRecipientScreen} />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Shipping Address"
        component={ShippingAddressScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Shipping Method"
        component={ShippingMethodScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Shop"
        component={ShopScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Shopping Bag"
        component={ShoppingBagScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Shout Out Screen"
        component={ShoutOutScreen}
      />
      <Tab.Screen name="User Search" component={UserSearchScreen} />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Wishlist"
        component={WishlistScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Friend Wishlist"
        component={WishlistScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
          appStyles,
        }}
        name="Wishlist + Notifications"
        component={WishlistNotificationsScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Non Friend Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Memories"
        component={MemoriesScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Follow And Invite Friends"
        component={FollowAndInviteFriendsScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
          appStyles,
        }}
        name="Reset Password"
        component={ResetPasswordScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Sizing"
        component={SizingScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Purchase History"
        component={PurchaseHistoryScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Add Event"
        component={AddEventScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Manage Addresses"
        component={ManageAddresses}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="My People"
        component={MyPeopleScreen}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Other User's Friends"
        component={OtherUsersFriendsScreens}
      />
      <Tab.Screen
        initialParams={{
          appConfig,
        }}
        name="Kazoo Wallet"
        component={KazooWalletScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Filtered Products"
        component={FilteredProductsScreen}
      />
      <Tab.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
          appConfig,
        }}
        name="Categories"
        component={CategoriesScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
