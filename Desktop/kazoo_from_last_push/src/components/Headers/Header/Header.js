import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setShowKazooCash } from '../../../redux/reducers/app';
import addIcon from '../../../../assets/icons/add.png';
import addFriendIcon from '../../../../assets/icons/add-friend.png';
import arrowheadIcon from '../../../../assets/icons/arrowhead-icon.png';
import cartIcon from '../../../../assets/icons/shopping-cart.png';
import walletIcon from '../../../../assets/icons/wallet.png';
import kazooHeader from '../../../../assets/images/kazoo-header-logo.png';
import { connect } from 'react-redux';
import styles from './styles';

const Header = ({ navigation, route, passedTitle, shoppingBag, type }) => {
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';
  const currentScreenName = route.name;
  const shoppingBagCount = shoppingBag.length;
  const showKazooCash = useSelector((state) => state.app.showKazooCash);
  const dispatch = useDispatch();

  let title = 'Test';
  let farLeftIcon;
  let farLeftIconVisible = false;
  let farLeftIconOnPress;
  let leftIcon;
  let leftIconVisible = false;
  let leftIconOnPress;
  let middleIcon;
  let middleIconVisible;
  let middleIconOnPress;
  let rightIcon;
  let rightIconVisible = false;
  let rightIconOnPress;

  switch (currentScreenName) {
    case 'Birthday Party':
      title = 'Party Feed';
      leftIcon = addFriendIcon;
      leftIconVisible = true;
      leftIconOnPress = () => {
        navigation.navigate('User Search');
      };
      middleIcon = cartIcon;
      middleIconVisible = true;
      middleIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      rightIcon = walletIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        dispatch(setShowKazooCash(!showKazooCash));
      };
      break;
    case 'Calendar':
      title = 'Calendar';
      // leftIcon = addIcon;
      leftIconVisible = false;
      // leftIconOnPress = navigation.goBack;
      rightIcon = addIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        navigation.navigate('Add Event');
      };
      break;
    case 'Day View':
      title = 'Day View';
      // farLeftIcon = arrowheadIcon;
      // farLeftIconVisible = true;
      // farLeftIconOnPress = () => navigation.goBack();
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      leftIconOnPress = navigation.goBack;
      rightIcon = cartIcon;
      rightIconVisible = false;
      rightIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      break;
    case 'User Search':
      title = 'User Search';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      leftIconOnPress = navigation.goBack;
      rightIcon = cartIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      break;
    case 'Home':
      title = 'Shop';
      leftIcon = null;
      leftIconVisible = false;
      leftIconOnPress = null;
      middleIcon = cartIcon;
      middleIconVisible = true;
      middleIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      rightIcon = walletIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        dispatch(setShowKazooCash(!showKazooCash));
      };
      break;
    case 'CategoryProductGrid':
      title = 'Shop';
      // farLeftIcon = arrowheadIcon;
      // farLeftIconVisible = true;
      // farLeftIconOnPress = () => navigation.goBack();
      leftIcon = null;
      leftIconVisible = false;
      leftIconOnPress = null;
      middleIcon = cartIcon;
      middleIconVisible = true;
      middleIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      rightIcon = walletIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        dispatch(setShowKazooCash(!showKazooCash));
      };
      break;
    case 'Filtered Products':
      title = 'Shop';
      // farLeftIcon = arrowheadIcon;
      // farLeftIconVisible = true;
      // farLeftIconOnPress = () => navigation.goBack();
      leftIcon = null;
      leftIconVisible = false;
      leftIconOnPress = null;
      middleIcon = cartIcon;
      middleIconVisible = true;
      middleIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      rightIcon = walletIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        dispatch(setShowKazooCash(!showKazooCash));
      };
      break;
    case 'Shopping Bag':
      title = 'My Cart';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      leftIconOnPress = navigation.goBack;
      rightIcon = null;
      rightIconVisible = false;
      rightIconOnPress = null;
      break;
    case 'Select Recipient':
      title = type === 'pin gift' ? 'Select Recipients' : 'Select Recipient';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      leftIconOnPress = navigation.goBack;
      rightIcon = null;
      rightIconVisible = false;
      rightIconOnPress = null;
      break;
    case 'Gift Wrapping':
      title = 'Gift Wrapping';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      // leftIconOnPress = navigation.goBack;
      rightIcon = null;
      rightIconVisible = false;
      rightIconOnPress = null;
      break;
    case 'Shout Out Screen':
      title = 'Shoutout';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      // leftIconOnPress = navigation.goBack;
      rightIcon = null;
      rightIconVisible = false;
      rightIconOnPress = null;
      break;
    case 'Order':
      title = 'Order Confirmation';
      leftIcon = arrowheadIcon;
      leftIconVisible = false;
      // leftIconOnPress = navigation.goBack;
      rightIcon = null;
      rightIconVisible = false;
      rightIconOnPress = null;
      break;
    case 'Categories':
      leftIcon = null;
      leftIconVisible = false;
      leftIconOnPress = null;
      middleIcon = cartIcon;
      middleIconVisible = true;
      middleIconOnPress = () => {
        navigation.navigate('Shopping Bag');
      };
      rightIcon = walletIcon;
      rightIconVisible = true;
      rightIconOnPress = () => {
        dispatch(setShowKazooCash(!showKazooCash));
      };
      break;
    // case 12:
    //   title = 'Shout Out';
    //   leftIcon = arrowheadIcon;
    //   leftIconVisible = true;
    //   leftIconOnPress = navigation.goBack();
    //   rightIcon = null;
    //   rightIconVisible = false;
    //   rightIconOnPress = null;
    //   break;
    // case 13:
    //   title = 'Payment Method';
    //   leftIcon = arrowheadIcon;
    //   leftIconVisible = true;
    //   leftIconOnPress = navigation.goBack();
    //   rightIcon = null;
    //   rightIconVisible = false;
    //   rightIconOnPress = null;
    //   break;
    // case 14:
    //   title = 'Checkout';
    //   leftIcon = arrowheadIcon;
    //   leftIconVisible = true;
    //   leftIconOnPress = navigation.goBack();
    //   rightIcon = null;
    //   rightIconVisible = false;
    //   rightIconOnPress = null;
    //   break;
    // case 14:
    //   title = 'Order Confirmation';
    //   leftIcon = arrowheadIcon;
    //   leftIconVisible = true;
    //   leftIconOnPress = navigation.goBack();
    //   rightIcon = null;
    //   rightIconVisible = false;
    //   rightIconOnPress = null;
    //   break;
    // case 15:
    //   title = 'Wishlist';
    //   leftIcon = arrowheadIcon;
    //   leftIconVisible = true;
    //   leftIconOnPress = navigation.goBack();
    //   rightIcon = addIcon;
    //   rightIconVisible = true;
    //   rightIconOnPress = navigation.navigate('Home');
    //   break;
  }

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <Image source={kazooHeader} style={styles.logo} />
      {farLeftIcon && (
        <TouchableOpacity
          onPress={farLeftIconOnPress}
          style={styles.farLeftIconButton}>
          <Image source={farLeftIcon} style={styles.leftIconImage} />
        </TouchableOpacity>
      )}
      <View style={styles.iconContainer}>
        {leftIconVisible && (
          <TouchableOpacity
            onPress={leftIconOnPress}
            style={styles.leftIconButton}>
            <Image source={leftIcon} style={styles.leftIconImage} />
          </TouchableOpacity>
        )}
        {middleIconVisible && (
          <TouchableOpacity
            onPress={middleIconOnPress}
            style={styles.middleIconButton}>
            <Image source={middleIcon} style={styles.middleIconImage} />
            {middleIcon === cartIcon && shoppingBagCount > 0 && (
              <View style={styles.counterContainer}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={styles.counterText}>
                  {shoppingBagCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        {rightIconVisible && (
          <TouchableOpacity
            onPress={rightIconOnPress}
            style={styles.rightIconButton}>
            <Image source={rightIcon} style={styles.rightIconImage} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = ({ products }) => {
  return {
    shoppingBag: products.shoppingBag,
  };
};

export default connect(mapStateToProps)(Header);
