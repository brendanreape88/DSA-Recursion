import { firebase } from '../../Core/firebase/config';

export const followUser = (currentUser, userBeingFollowed) => {
  console.log('currentUser', currentUser);
  console.log('userBeingFollowed', userBeingFollowed);
  const newUserToFollow = {
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    userBeingFollowed: userBeingFollowed.id,
    firstName: userBeingFollowed.firstName,
    lastName: userBeingFollowed.lastName,
    follower: currentUser.id,
  };

  const newFollower = {
    dateCreated: firebase.firestore.Timestamp.fromDate(new Date()),
    userBeingFollowed: userBeingFollowed.id,
    follower: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
  };

  const followingDB = firebase
    .firestore()
    .collection(`users/${currentUser.id}/following`);
  followingDB
    .doc(userBeingFollowed.id)
    .set(newUserToFollow)
    .then(() => {
      console.log(`current user is now following user ${userBeingFollowed.id}`);

      const followersDB = firebase
        .firestore()
        .collection(`users/${userBeingFollowed.id}/followers`);
      followersDB
        .doc(currentUser.id)
        .set(newFollower)
        .then(() => {
          console.log(
            `${userBeingFollowed.id} is being followed by the current user`,
          );
        });
    });
};

export const unfollowUser = (currentUser, following) => {
  const followersDB = firebase
    .firestore()
    .collection(`users/${currentUser.id}/following`);
  followersDB
    .doc(following.id)
    .delete()
    .then(() => {
      console.log(`current user no longer following user: ${following.id}`);

      const followingDB = firebase
        .firestore()
        .collection(`users/${following.id}/followers`);
      followingDB
        .doc(currentUser.id)
        .delete()
        .then(() => {
          console.log(`user ${following.id} no longer following current user`);

          const notificationsDB = firebase
            .firestore()
            .collection(`users/${following.id}/notifications`);
          notificationsDB
            .where('type', '==', 'friendRequest')
            .where('sender', '==', currentUser.id)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                if (doc.data()) {
                  notificationsDB
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                      console.log(
                        `pending friend request from current user to ${following.id} deleted`,
                      );
                    });
                }
              });
            });
        });
    });
};

export const removeFollowRelationship = (currentUser, follower) => {
  const followersDB = firebase
    .firestore()
    .collection(`users/${currentUser.id}/followers`);
  followersDB
    .doc(follower.id)
    .delete()
    .then(() => {
      console.log(
        `current user no longer being followed by user ${follower.id}`,
      );

      const followingDB = firebase
        .firestore()
        .collection(`users/${follower.id}/following`);
      followingDB
        .doc(currentUser.id)
        .delete()
        .then(() => {
          console.log(`user ${follower.id} no longer following current user`);

          const notificationsDB = firebase
            .firestore()
            .collection(`users/${currentUser.id}/notifications`);
          notificationsDB
            .where('type', '==', 'friendRequest')
            .where('sender', '==', follower.id)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                if (doc.data()) {
                  notificationsDB
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                      console.log(
                        `pending friend request to current user from ${follower.id} deleted`,
                      );
                    });
                }
              });
            });
        });
    });
};
