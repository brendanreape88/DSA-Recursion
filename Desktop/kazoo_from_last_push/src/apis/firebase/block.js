import { firebase } from '../../Core/firebase/config';

export const blockUser = (blockedUser, currentUser, notificationID) => {
  const newBlockedUser = {
    dateBlocked: firebase.firestore.Timestamp.fromDate(new Date()),
    id: blockedUser.id,
    firstName: blockedUser.firstName,
    lastName: blockedUser.lastName,
  };

  const newBlockingUser = {
    dateBlocked: firebase.firestore.Timestamp.fromDate(new Date()),
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
  };

  const blockedUsersDB = firebase
    .firestore()
    .collection(`users/${currentUser.id}/blockedUsers`);
  blockedUsersDB
    .doc(blockedUser.id)
    .set(newBlockedUser)
    .then(() => {
      console.log('user has just been added to blocked list');

      const userBlockedByDB = firebase
        .firestore()
        .collection(`users/${blockedUser.id}/blockedBy`);
      userBlockedByDB
        .doc(currentUser.id)
        .set(newBlockingUser)
        .then(() => {
          console.log(
            'blocked user subcollection updated with user initiating blocking',
          );

          if (notificationID) {
            const notificationsDB = firebase
              .firestore()
              .collection(`users/${currentUser.id}/notifications`);
            notificationsDB
              .doc(notificationID)
              .delete()
              .then(() => {
                console.log('friend request notification removed');
              });
          }
        });
    });
};

export const unBlockUser = (blockedUser, currentUser) => {
  const blockedUsersDB = firebase
    .firestore()
    .collection(`users/${currentUser.id}/blockedUsers`);
  blockedUsersDB
    .doc(blockedUser.id)
    .delete()
    .then(() => {
      console.log('user has just been removed from blocked list');

      const userBlockedByDB = firebase
        .firestore()
        .collection(`users/${blockedUser.id}/blockedBy`);
      userBlockedByDB
        .doc(currentUser.id)
        .delete()
        .then(() => {
          console.log(
            "current user removed from blocked user's blocked by list",
          );
        });
    });
};
