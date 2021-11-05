import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Notification from '../../components/WishlistNotification/Notification';
import { firebase } from '../../Core/firebase/config';
import { connect } from 'react-redux';
import Moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TNActivityIndicator from '../../Core/truly-native/TNActivityIndicator';
import { useSelector } from 'react-redux';
import styles from './styles';

const Notifications = ({ user, navigation, appStyles }) => {
  const [notifications, setNotifications] = useState([]);
  const canOpenGift = true;
  const [loading, setLoading] = useState(false);
  const currentUserID = user.id;

  const birthdate = user.birthdate;
  const momentBirthdate = Moment(birthdate, 'MM/DD/YYYY');
  momentBirthdate.year(new Date().getFullYear());

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    setLoading(true);
    const notificationsDB = firebase
      .firestore()
      .collection(`users/${currentUserID}/notifications`);
    setLoading(false);
    return notificationsDB
      .orderBy('seen', 'asc')
      .orderBy('dateCreated', 'desc')
      .onSnapshot((snapshot) =>
        setNotifications(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ),
      );
  }, [currentUserID]);

  return (
    <>
      {loading ? (
        <TNActivityIndicator appStyles={appStyles} />
      ) : !notifications.length ? (
        <View
          style={{
            flex: 1,
            backgroundColor: themeBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              color: themeElementColor,
            }}>
            No notfications to show at this time.
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: themeBackgroundColor,
            ...styles.container,
          }}>
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <Notification
                notification={item}
                currentUser={user}
                navigation={navigation}
                canOpenGift={canOpenGift}
                themeBackgroundColor={themeBackgroundColor}
                themeElementColor={themeElementColor}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
    notificationCollection: app.notifications,
  };
};

export default connect(mapStateToProps)(Notifications);
