import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import UserBirthday from '../../components/BirthdayParty/UserBirthday';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import Header from '../../components/Headers/Header/Header';
import { firebase } from '../../Core/firebase/config';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

const CalendarScreen = (props) => {
  const isFocused = useIsFocused();
  const currentUserID = props.user.id;
  const [datesToMark, setDatesToMark] = useState({});
  let today = moment();
  let day = today.clone().startOf('month');
  let customDatesStyles = [];
  while (day.add(1, 'day').isSame(today, 'month')) {
    customDatesStyles.push({
      date: day.clone(),
      style: {
        backgroundColor: '#42E2CD',
      },
      textStyle: { color: 'black' }, // sets the font color
      containerStyle: [], // extra styling for day container
    });
  }

  const currentMonth = today.format('M');
  const currentYear = today.format('YYYY');

  const [calendarMonth, setCalendarMonth] = useState(currentMonth);
  const [calendarYear, setCalendarYear] = useState(currentYear);
  const [friendsFilteredByMonth, setFriendsFilteredByMonth] = useState([]);

  const theme = useSelector((state) => state.app.theme);
  const themeBackgroundColor = theme === 'dark' ? 'black' : 'white';
  const themeElementColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    const friendsWhoHaveBirthdaysThisMonth = [];
    const datesToMarkArray = [];
    const searchMonth =
      calendarMonth.length === 1 ? '0' + calendarMonth : calendarMonth;
    const friends = firebase
      .firestore()
      .collection(`users/${currentUserID}/friends`);
    friends
      .where('birthMonth', '==', searchMonth)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          friendsWhoHaveBirthdaysThisMonth.push({ type: 'friend', ...data });
          const wixCalDate = `${calendarYear}-${data.birthMonth}-${data.birthDay}`;
          datesToMarkArray.push(wixCalDate);
          let datesToMarkObj = {};
          datesToMarkArray.forEach((day) => {
            datesToMarkObj[day] = {
              selected: true,
              selectedColor: '#4AE0CD',
            };
          });
          setDatesToMark(datesToMarkObj);
        });
      })
      .then(() => {
        const subUsersDB = firebase
          .firestore()
          .collection(`users/${currentUserID}/subUsers`);
        subUsersDB
          .where('birthMonth', '==', searchMonth)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              friendsWhoHaveBirthdaysThisMonth.push({
                type: 'off-app friend',
                id: doc.id,
                ...data,
              });
              console.log('data', data);
              console.log('month and day', data.month, data.day);
              const wixCalDate = `${calendarYear}-${data.birthMonth}-${data.birthDay}`;
              datesToMarkArray.push(wixCalDate);
              let datesToMarkObj = {};
              datesToMarkArray.forEach((day) => {
                datesToMarkObj[day] = {
                  selected: true,
                  selectedColor: '#4AE0CD',
                };
              });
              setDatesToMark(datesToMarkObj);
            });
          });
      })
      .then(() => {
        setFriendsFilteredByMonth(friendsWhoHaveBirthdaysThisMonth);
      });
  }, [calendarMonth, isFocused]);

  return (
    <View
      style={{ backgroundColor: themeBackgroundColor, ...styles.container }}>
      <Header navigation={props.navigation} route={props.route} />
      <Calendar
        style={styles.calendar}
        key={theme}
        theme={{
          textSectionTitleColor: themeElementColor,
          todayTextColor: '#4AE0CD',
          dayTextColor: themeElementColor,
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#4AE0CD',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: themeElementColor,
          indicatorColor: '#4AE0CD',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          calendarBackground: themeBackgroundColor,
          backgroundColor: themeBackgroundColor,
        }}
        markedDates={datesToMark}
        onDayPress={(day) => {
          props.navigation.navigate('Day View', {
            friendsWithBirthdaysToday: friendsFilteredByMonth.filter(
              (friend) => friend.birthDay == day.day,
            ),
            date: day,
          });
        }}
        onMonthChange={(date) => {
          setCalendarMonth(date.month.toString());
          setCalendarYear(date.year.toString());
        }}
      />
      {friendsFilteredByMonth.length === 0 ? (
        <View style={styles.noFriendsContainer}>
          <View style={styles.noFriendsContentContainer}>
            <Text style={{ color: themeElementColor, ...styles.noFriendsText }}>
              No friends with a birthday on this month.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={friendsFilteredByMonth}
          renderItem={({ item }) => (
            <UserBirthday
              firstName={item.firstName}
              lastName={item.lastName}
              birthdate={item.birthdate}
              profilePictureURL={item.profilePictureURL}
              showBirthdayItems={false}
              id={item.friendID || item.id}
              navigation={props.navigation}
              type={item.type}
              themeElementColor={themeElementColor}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
    friends: app.friends,
  };
};

export default connect(mapStateToProps)(CalendarScreen);
