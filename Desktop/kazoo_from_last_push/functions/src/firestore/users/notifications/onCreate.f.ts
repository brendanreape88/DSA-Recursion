import * as functions from "firebase-functions";
import { firestore, messaging } from "firebase-admin";
import { User } from "../../interfaces/User";
import { NotificationType, Notification } from "../../interfaces/Notification";

export default functions.firestore
  .document("users/{userId}/notifications/{notificationId}")
  .onCreate(async (snapshot, context) => {
    try {
      const notification = snapshot.data() as Notification;

      const recipientDocument = await firestore()
        .collection("users_private")
        .doc(context.params.userId)
        .get();
      const recipient = recipientDocument.data() as User;
      const type = NotificationType[notification.type];
      const payload = {
        notification: {
          title: "You Just Got Kazoo'd",
          body: `${notification.senderFirstName} ${notification.senderLastName} sent you a ${type}.`,
          sound: "default",
        },
      };

      const token = recipient.pushToken;
      const response = await messaging().sendToDevice(token, payload);
      functions.logger.info("Sent notification:", response);
    } catch (error) {
      functions.logger.error(error);
    }
  });
