import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { sendOrderNotice } from "../../../methods/sendOrderNotice";
import { Gift } from "../../interfaces/Gift";
import { Order } from "../../interfaces/Order";

/**
 * Does a shallow comparison between two objects
 * @param {object} a The first object.
 * @param {object} b The second object.
 * @param {array} except Keys to exclude from comparison
 * @return {boolean} True if objects are the same
 */
function areEqualShallow(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  except: Array<string>,
): boolean {
  for (const key in a) {
    if (
      a[key] !== b[key] &&
      !except.includes(key) &&
      typeof a[key] !== "object"
    ) {
      return false;
    }
  }
  return true;
}

export default functions.firestore
  .document("users/{userId}/gifts/{gift}")
  .onUpdate(async (change, context) => {
    try {
      // Only changes to accepted and posted should be allowed on gift object
      if (
        areEqualShallow(change.before.data(), change.after.data(), [
          "accepted",
          "posted",
        ])
      ) {
        // User is redeeming the gift
        // Get previous value before this update
        const previousAcceptedValue = change.before.get("accepted");
        const gift = change.after.data() as Gift;
        if (previousAcceptedValue !== gift.accepted) {
          // accepted has changed
          if (previousAcceptedValue === undefined) {
            // Gift hasn't been previously accepted
            if (!gift.accepted) {
              const orderRef = firestore()
                .collection("shopertino_orders")
                .doc(gift.orderDocumentID);
              const cashRef = firestore()
                .collection("kazoo_cash")
                .doc(context.params.userId);
              const transactionRef = cashRef
                .collection("transactions")
                .doc(gift.orderDocumentID);
              await firestore().runTransaction(async (t) => {
                const orderDocument = await t.get(orderRef);
                const cashDocument = await t.get(cashRef);
                const orderTotal = orderDocument.get("totalPrice");
                const balance = cashDocument.get("balance") ?? 0;
                if (orderTotal >= 0) {
                  // Order total should always be positive
                  const newBalance = balance + orderTotal;
                  const transaction = {
                    giftID: change.before.id,
                    orderID: orderDocument.id,
                    amount: orderTotal,
                    recipient: gift.recipient,
                    sender: gift.sender,
                  };
                  if (cashDocument.exists) {
                    t.update(cashRef, { balance: newBalance });
                  } else {
                    t.create(cashRef, { balance: newBalance });
                  }
                  t.create(transactionRef, transaction);
                } else {
                  functions.logger.warn(
                    "Order total is less than zero",
                    orderDocument,
                    orderTotal,
                  );
                }
              });
            }
            // Send email
            const orderRef = await firestore()
              .collection("shopertino_orders")
              .doc(gift.orderDocumentID)
              .get();
            const order = orderRef.data() as Order;
            await sendOrderNotice(orderRef.id, order, gift.accepted);
          } else {
            functions.logger.warn(
              "Tried to redeem or accepted gift that was already processed",
              gift.accepted,
              context.params.userId,
              context.params.gift,
            );
          }
        }
      } else {
        functions.logger.warn(
          "Invalid update on gift object",
          change.before.data(),
          change.after.data(),
        );
      }
    } catch (error) {
      functions.logger.error(error);
    }
  });
