import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUserMemories } from '../../redux/reducers/app';
import ProfileMemory from './ProfileMemory';
import { firebase } from '../../Core/firebase/config';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const ProfileMemories = ({
  otherUserID,
  view,
  navigation,
  themeBackgroundColor,
  themeElementColor,
}) => {
  const linkCard = { type: 'link', id: 'totallyuniqueid' };
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const dispatch = useDispatch();
  const currentUserMemories = useSelector((state) => state.app.memories);
  const currUserMemsReduced = [...currentUserMemories];
  if (currentUserMemories.length > 10) {
    currUserMemsReduced.length = 10;
  }
  const currUserMemsPlusLink = [...currUserMemsReduced, linkCard];
  const otherUserMemories = useSelector((state) => state.app.otherUserMemories);
  const showNoMemoriesMessage =
    (view !== 'current user' && otherUserMemories.length === 0) ||
    (view === 'current user' && currentUserMemories.length === 0)
      ? true
      : false;

  useEffect(() => {
    if (view !== 'current user') {
      const otherUsersMemoriesArray = [];
      const memoriesDB = firebase
        .firestore()
        .collection(`users/${otherUserID}/memories`);
      memoriesDB
        .orderBy('dateCreated', 'desc')
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            otherUsersMemoriesArray.push({ id: doc.id, ...doc.data() });
          });
        })
        .then(() => {
          dispatch(setOtherUserMemories(otherUsersMemoriesArray));
        });
    }
  }, [dispatch, otherUserID, view]);

  console.log('current user mems reduced plus link', currUserMemsPlusLink);

  return (
    <View
      style={{
        ...styles.itemsContainer,
        paddingBottom: 20,
        backgroundColor: themeBackgroundColor,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Memories')}>
        <Text
          style={{
            color: themeElementColor,
            ...styles.profileSectionTitle,
          }}>
          Memories
        </Text>
      </TouchableOpacity>
      {showNoMemoriesMessage ? (
        <View style={styles.defaultMessageContentContainer}>
          <Text
            style={{
              color: themeElementColor,
              ...styles.defaultMessageText,
            }}>
            No memories to show yet.
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          style={{
            marginLeft: 10,
            // borderWidth: 1,
            height: 150,
          }}
          contentContainerStyle={{ alignItems: 'center' }}>
          {view === 'current user' &&
            currUserMemsPlusLink?.map((mem, idx) => (
              <ProfileMemory
                navigation={navigation}
                memory={mem}
                key={mem.id}
                idx={idx}
                view={view}
                fromProfile={true}
              />
            ))}
          {view !== 'current user' &&
            otherUserMemories?.map((mem, idx) => (
              <ProfileMemory
                otherUserMemories={otherUserMemories}
                navigation={navigation}
                memory={mem}
                key={mem.id}
                idx={idx}
                view={view}
                fromProfile={true}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileMemories;
