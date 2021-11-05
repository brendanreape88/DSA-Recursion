import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { firebase } from '../../Core/firebase/config';
import { newFriendship } from './friends';
import { setNotifications } from '../../redux/reducers/app';
import { IMLocalized } from '../../Core/localization/IMLocalization';

export const fetchNotifications = (currUserID) => {
  const notificationsArray = [];
  const notifications = firebase
    .firestore()
    .collection(`users/${currUserID}/notifications`);
  notifications
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notificationsArray.push(data);
      });
    })
    .then(() => {
      setNotifications(notificationsArray);
    });
};

export const friendRequest = (sender, recipient) => {
  const newFriendRequest = {
    type: 'friendRequest',
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    sender: sender.id,
    senderFirstName: sender.firstName,
    senderLastName: sender.lastName,
    seen: false,
  };

  const notifications = firebase
    .firestore()
    .collection(`users/${recipient.id}/notifications`);
  notifications.add(newFriendRequest).then(() => {
    console.log('new friend request notification created!');
  });
};

export const friendAcceptance = (sender, recipient) => {
  const newFriendRequest = {
    type: 'friendAcceptance',
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    recipient: recipient.id,
    recipientFirstName: recipient.firstName,
    recipientLastName: recipient.lastName,
    seen: false,
  };

  const notifications = firebase
    .firestore()
    .collection(`users/${sender.id}/notifications`);
  notifications.add(newFriendRequest).then(() => {
    console.log('new friend acceptance notification created!');
    newFriendship(sender, recipient);
  });
};

export const shoutout = (sender, recipient, referenceID) => {
  const newShoutout = {
    type: 'shoutout',
    referenceID: referenceID,
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    sender: sender.id,
    senderFirstName: sender.firstName,
    senderLastName: sender.lastName,
    seen: false,
  };

  const notifications = firebase
    .firestore()
    .collection(`users/${recipient}/notifications`);
  notifications.add(newShoutout).then(() => {
    console.log('new shoutout notification created!');
  });
};

export const gift = async (sender, recipient, referenceID) => {
  const firebaseRecipientID =
    recipient.friendID || recipient.documentID || recipient.id;

  const newGift = {
    referenceID,
    type: 'gift',
    sender: sender.id,
    senderType:
      recipient.relationshipToCurrentUser !== 'friend' ? 'follower' : 'friend',
    senderFirstName: sender.firstName,
    senderLastName: sender.lastName,
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    seen: false,
  };

  const notifications = firebase
    .firestore()
    .collection(`users/${firebaseRecipientID}/notifications`);
  try {
    await notifications.add(newGift);
  } catch (error) {
    Sentry.captureException(error);
    Alert.Alert(IMLocalized('An error occured please try again later.'));
  }
};

export const followReferringUser = (currentUserID, referringUser) => {
  const newFollowerReferringUser = {
    type: 'followReferringUser',
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    sender: referringUser.id,
    senderFirstName: referringUser.firstName,
    senderLastName: referringUser.lastName,
    seen: false,
  };

  const notifications = firebase
    .firestore()
    .collection(`users/${currentUserID}/notifications`);
  notifications
    .doc(referringUser.id)
    .set(newFollowerReferringUser)
    .then(() => {
      console.log('new follow referring user notification created!');
    });
};
