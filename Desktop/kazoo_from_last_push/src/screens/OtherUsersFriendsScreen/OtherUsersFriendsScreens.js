import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import arrowheadIcon from '../../../assets/icons/arrowhead-icon.png';
import { FlatGrid } from 'react-native-super-grid';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import OtherUsersFriendsButton from './OtherUsersFriendsButton';

const OtherUsersFriendsScreens = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const currentUser = useSelector((state) => state.app.user);
  const otherUser = useSelector((state) => state.app.otherUser);
  const profileView = useSelector((state) => state.app.profileView);
  const [otherUserFriendsIDs, setOtherUserFriendsIDs] = useState([]);
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const friendsIDs = [];
    const friendsDB = firebase
      .firestore()
      .collection(`users/${otherUser.id}/friends`);
    friendsDB
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().friendID !== currentUser.id) {
            friendsIDs.push(doc.data().friendID);
          }
        });
      })
      .then(() => {
        setOtherUserFriendsIDs(friendsIDs);
      });
  }, [otherUser.id]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.headerIcon} source={arrowheadIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{otherUser.firstName}'s Friends</Text>
        <View style={styles.headerIcon} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: themeBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {otherUserFriendsIDs.length === 0 ? (
          <Text style={{ color: '#545454', fontSize: RFPercentage(2) }}>
            {otherUser.firstName} has no friends to show.
          </Text>
        ) : (
          <FlatGrid
            itemDimension={width * 0.2}
            data={otherUserFriendsIDs}
            // style={{ borderWidth: 1 }}
            // staticDimension={300}
            // fixed
            spacing={15}
            renderItem={({ item }) => (
              <OtherUsersFriendsButton
                currentUser={currentUser}
                otherUser={otherUser}
                profileView={profileView}
                navigation={navigation}
                key={item}
                item={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default OtherUsersFriendsScreens;
