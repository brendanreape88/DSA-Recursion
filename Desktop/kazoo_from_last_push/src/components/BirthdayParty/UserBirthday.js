import React from 'react';
import { View } from 'react-native';
import FriendBirthdayItems from '../FriendBirthdayPanel/FriendBirthdayItems';
import FriendBirthdayPanel from '../FriendBirthdayPanel/FriendBirthdayPanel';

function UserBirthday(props) {
  return (
    <View>
      <FriendBirthdayPanel {...props} />
      {props.showBirthdayItems === true && <FriendBirthdayItems {...props} />}
    </View>
  );
}

export default UserBirthday;
