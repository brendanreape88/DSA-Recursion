import { firebase } from '../../Core/firebase/config';
import { followUser } from './follow';

export const newFriendship = (sender, recipient, notificationID) => {
  const newFriendForRecipient = {
    friendID: sender.id,
    sender: sender.id,
    recipient: recipient.id,
    dateAccepted: firebase.firestore.Timestamp.fromDate(new Date()),
    firstName: sender.firstName,
    lastName: sender.lastName,
    birthdate: sender.birthdate,
    birthMonth: sender.birthMonth,
    birthDay: sender.birthDay,
  };

  const friends = firebase
    .firestore()
    .collection(`users/${recipient.id}/friends`);
  friends
    .doc(sender.id)
    .set(newFriendForRecipient)
    .then(() => {
      console.log('recipient has a new friend!');

      const friendsTopLevel = firebase.firestore().collection('friends');
      friendsTopLevel.doc(recipient.id).update({
        friends: firebase.firestore.FieldValue.arrayUnion(sender.id),
      });

      const newFriendForSender = {
        friendID: recipient.id,
        sender: sender.id,
        recipient: recipient.id,
        dateAccepted: firebase.firestore.Timestamp.fromDate(new Date()),
        firstName: recipient.firstName,
        lastName: recipient.lastName,
        birthdate: recipient.birthdate,
        birthMonth: recipient.birthMonth,
        birthDay: recipient.birthDay,
        birthYear: recipient.birthYear,
      };

      const friends = firebase
        .firestore()
        .collection(`users/${sender.id}/friends`);
      friends
        .doc(recipient.id)
        .set(newFriendForSender)
        .then(() => {
          console.log('sender has a new friend!');

          const friendsTopLevel = firebase.firestore().collection('friends');
          friendsTopLevel.doc(sender.id).update({
            friends: firebase.firestore.FieldValue.arrayUnion(recipient.id),
          });

          const notifications = firebase
            .firestore()
            .collection(`users/${recipient.id}/notifications`);
          notifications
            .doc(notificationID)
            .delete()
            .then(() => {
              console.log('friend request notification deleted');
            });
        });
    });
};

export const deleteFriendship = (currentUser, otherUser) => {

  const friendsTopDB = firebase.firestore().collection('friends');
  friendsTopDB
    .doc(currentUser.id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(otherUser.id),
    })
    .then(() => {
      console.log(
        "other user ID removed from current user's top level friend document",
      );

      friendsTopDB.doc(otherUser.id).update({
        friends: firebase.firestore.FieldValue.arrayRemove(currentUser.id),
      });
    })
    .then(() => {
      console.log(
        "current user ID removed from other user's top level friend document",
      );

      let otherUserFriendDocID;
      let currentUserFriendDocID;

      const friendsDB = firebase
        .firestore()
        .collection(`users/${currentUser.id}/friends`);
      friendsDB
        .where('friendID', '==', otherUser.id)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            otherUserFriendDocID = doc.id;
          });

          const pinnedGiftsIDArray = [];

          const pinnedGiftsDB = firebase
            .firestore()
            .collection(
              `users/${currentUser.id}/friends/${otherUserFriendDocID}/pinnedGifts`,
            );
          pinnedGiftsDB
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                pinnedGiftsIDArray.push(doc.id);
              });
            })
            .then(() => {
              pinnedGiftsIDArray.map((id) => pinnedGiftsDB.doc(id).delete());
            })
            .then(() => {
              console.log('deleted pinned gifts pinned to other user');
            });

          friendsDB.doc(otherUserFriendDocID).delete();
        })
        .then(() => {
          console.log(
            "other user removed from current user's friend sub collection",
          );

          const friendsDB = firebase
            .firestore()
            .collection(`users/${otherUser.id}/friends`);
          friendsDB
            .where('friendID', '==', currentUser.id)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                currentUserFriendDocID = doc.id;
              });

              const pinnedGiftsIDArray = [];

              const pinnedGiftsDB = firebase
                .firestore()
                .collection(
                  `users/${otherUser.id}/friends/${currentUserFriendDocID}/pinnedGifts`,
                );
              pinnedGiftsDB
                .get()
                .then((docs) => {
                  docs.forEach((doc) => {
                    pinnedGiftsIDArray.push(doc.id);
                  });
                })
                .then(() => {
                  pinnedGiftsIDArray.map((id) =>
                    pinnedGiftsDB.doc(id).delete(),
                  );
                })
                .then(() => {
                  console.log('deleted pinned gifts pinned to current user');
                });

              friendsDB.doc(currentUserFriendDocID).delete();
            })
            .then(() => {
              console.log(
                "current user removed from other user's friend sub collection",
              );

              followUser(otherUser, currentUser);
            });
        });
    });
};
