import React from 'react';
import { View, Text, FlatList } from 'react-native';
import FriendBirthdayPanel from '../../components/FriendBirthdayPanel/FriendBirthdayPanel';
import Moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Headers/Header/Header';
import { RFPercentage } from 'react-native-responsive-fontsize';

const DayViewScreen = (props) => {
  const friendsWithBirthdaysToday =
    props.route.params.friendsWithBirthdaysToday;
  const dayViewMomentDate = Moment(
    props.route.params.date.dateString,
    'YYYY-MM-DD',
  );
  const dayViewDateFormatted = dayViewMomentDate.format('MMMM D');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header navigation={props.navigation} route={props.route} />
      <View
        style={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#D9D9D9',
        }}>
        <Text
          style={{
            fontSize: RFPercentage(3),
            fontWeight: '700',
            color: '#545454',
          }}>
          {dayViewDateFormatted}
        </Text>
      </View>

      {!friendsWithBirthdaysToday.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //borderWidth: 1,
          }}>
          <View
            style={{
              //flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              //borderWidth: 1,
              width: 250,
            }}>
            <Text style={{ textAlign: 'center', color: '#545454' }}>
              No birthdays on this day.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={friendsWithBirthdaysToday}
          renderItem={({ item }) => {
            return (
              <FriendBirthdayPanel
                firstName={item.firstName}
                lastName={item.lastName}
                birthdate={item.birthdate}
                profilePictureURL={item.profilePictureURL}
                showBirthdayItems={false}
                id={item.friendID || item.id}
                navigation={props.navigation}
                type={item.type}
              />
            );
          }}
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

export default connect(mapStateToProps)(DayViewScreen);
