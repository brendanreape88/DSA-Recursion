import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import UserSearchResult from '../../components/UserSearch/UserSearchResult';
import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';
import { connect } from 'react-redux';
import Header from '../../components/Headers/Header/Header';
import styles from './styles';
import search from '../../../assets/icons/search.png';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserSearchScreen = (props) => {
  const { width } = Dimensions.get('window');
  const currentUserId = props.user.id;
  const [results, setResults] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const [pendingFriends, setPendingFriends] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const isFocused = useIsFocused();
  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const usersDB = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS);
    usersDB
      .orderBy('firstName')
      .get()
      .then((querySnapshot) => {
        const queryResults = [];
        querySnapshot.forEach((doc) => queryResults.push(doc.data()));
        const filteredQueryResults = queryResults.filter(
          (result) =>
            result.id !== currentUserId && result.firstName !== undefined,
        );
        setResults(filteredQueryResults);
      });
  }, [isFocused, showAllUsers]);

  const handleSearch = (query) => {
    if (query === '') {
      setShowAllUsers(true);
      setSearchStr(query);
    } else {
      setShowAllUsers(false);
      const queryCapitalized = query.charAt(0).toUpperCase() + query.slice(1);
      setSearchStr(queryCapitalized);
      const usersRef = firebase
        .firestore()
        .collection(AppConfig.FIREBASE_COLLECTIONS.USERS);
      usersRef
        .where('firstName', '==', queryCapitalized)
        .get()
        .then((querySnapshot) => {
          const queryResults = [];
          querySnapshot.forEach((doc) => queryResults.push(doc.data()));
          const removedCurrUserArray = queryResults.filter(
            (user) => user.id !== currentUserId,
          );
          setResults(removedCurrUserArray);
        });
    }
  };

  const addPendingFriend = useCallback(
    (newFriendId) => {
      setPendingFriends([...pendingFriends, newFriendId]);
    },
    [pendingFriends],
  );

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <Header navigation={props.navigation} route={props.route} />
      <View
        style={{
          alignItems: 'center',
          // height: '6%',
          borderBottomWidth: 1,
          borderColor: 'lightgrey',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 8,
            width: '92%',
            // height: '5.5%',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          <Image
            source={search}
            style={{
              tintColor: '#545454',
              height: width * 0.05,
              width: width * 0.05,
            }}
          />
          <TextInput
            style={{
              borderRadus: 8,
              backgroundColor: '#D9D9D9',
              padding: 10,
              width: '80%',
            }}
            placeholder={'Search'}
            placeholderTextColor="#545454"
            onChangeText={handleSearch}
            value={searchStr}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: themeBackgroundColor,
          ...styles.searchResultsContainer,
        }}>
        {!results.length ? (
          <View
            style={{
              backgroundColor: themeBackgroundColor,
              ...styles.defaultMessageContainer,
            }}>
            <View
              style={{
                backgroundColor: themeBackgroundColor,
                ...styles.defaultMessageContentContainer,
              }}>
              <Text
                style={{
                  color: themeElementColor,
                  ...styles.defaultMessageText,
                }}>
                Search for your friends!
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <UserSearchResult
                item={item}
                {...props}
                addPendingFriend={addPendingFriend}
              />
            )}
            extraData={props}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
  };
};

export default connect(mapStateToProps)(UserSearchScreen);
