import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import ProfileBackButtonHeader from '../../components/Profile/ProfileBackButtonHeader';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import styles from './styles';
import firebase from 'firebase';

function WishlistUserImageCard({ otherUser, navigation }) {
  return (
    <View style={styles.userCardContainer}>
      <View style={styles.userCardBackButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.userCardBackButtonIcon} source={arrowheadIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.userAvatarContainer}>
        <Image
          style={styles.userAvatarImage}
          source={{
            uri: otherUser.profilePictureURL,
          }}
        />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameText}>
          {otherUser.firstName}'s Wishlist
        </Text>
      </View>
    </View>
  );
}

export default WishlistUserImageCard;
