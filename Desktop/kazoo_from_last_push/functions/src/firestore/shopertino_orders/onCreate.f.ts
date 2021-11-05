import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { sendOrderNotice } from "../../methods/sendOrderNotice";
import { User } from "../interfaces/User";
import { Order } from "../interfaces/Order";

const ACCESS_KEY = functions.config().aws.access_key;
const SECRET_KEY = functions.config().aws.secret_key;

const REGION = "us-west-2";
const sesClient = new SESClient({
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  region: REGION,
});

export default functions.firestore
  .document("shopertino_orders/{orderId}")
  .onCreate(async (snapshot, context) => {
    try {
      const order = snapshot.data() as Order;
      const orderDocumentId = context.params.orderId;

      const userDocument = await firestore()
        .collection("users_private")
        .doc(order.user_id)
        .get();

      // Handle kazoo cash
      if (order.kazooCash) {
        if (order.kazooCash < 0) {
          if (order.kazooCash <= order.totalPrice) {
            try {
              const cashRef = firestore()
                .collection("kazoo_cash")
                .doc(order.user_id);
              const transactionRef = cashRef
                .collection("transactions")
                .doc(orderDocumentId);
              await firestore().runTransaction(async (t) => {
                const cashDocument = await t.get(cashRef);
                const balance = cashDocument.get("balance") ?? 0;
                const newBalance = balance + order.kazooCash; // kazoo cash is negative amount, so add it to balance
                if (newBalance >= 0) {
                  const transaction = {
                    orderID: orderDocumentId,
                    amount: order.kazooCash,
                    user: order.user_id,
                  };
                  t.update(cashRef, { balance: newBalance });
                  t.create(transactionRef, transaction);
                } else {
                  functions.logger.warn(
                    "Kazoo cash more than balance",
                    orderDocumentId,
                    order.kazooCash,
                    balance,
                  );
                }
              });
            } catch (error) {
              functions.logger.error(
                "Failed to handle kazoo cash",
                orderDocumentId,
              );
            }
          } else {
            functions.logger.warn(
              "Kazoo cash more than total",
              orderDocumentId,
              order.kazooCash,
              order.totalPrice,
            );
          }
        } else {
          functions.logger.warn(
            "Kazoo cash should be negative amount",
            orderDocumentId,
            order.kazooCash,
          );
        }
      }

      // Assign the shipping address
      // If order has recipient, get their shipping address
      // otherwise use senders address
      const shippingId =
        order.recipient?.friendID ||
        order.recipient?.documentID ||
        order.user_id;
      const recipientAddress = await firestore()
        .collection("users")
        .doc(shippingId)
        .collection("addresses")
        .where("shippingAddress", "==", true)
        .limit(1)
        .get();
      if (!recipientAddress.empty) {
        const newAddress = {
          name: order.shippingAddress?.name || "",
          ...recipientAddress.docs[0].data(),
        };
        snapshot.ref.update({
          shippingAddress: newAddress,
        });
        // order.shippingAddress = newAddress;
      }
      // Email the reciept
      const user = userDocument.data() as User;

      const products = order.shopertino_products.map((p) => ({
        productName: p.name,
        quantity: p.quantity,
        price: p.price.toFixed(2),
      }));

      const templateData = {
        saleDate: new Date(order.createdAt).toDateString(),
        customerName: `${user.firstName} ${user.lastName}`,
        customerEmail: user.email,
        orderCode: order.id,
        lineItems: products,
        paymentMethod: order.selectedPaymentMethod?.title ?? "",
        total: order.totalPrice.toFixed(2),
        recipientName: order.shippingAddress.name,
      };

      const params = {
        Destination: {
          CcAddresses: [],
          ToAddresses: [user.email],
        },
        Source: "Kazoo Support <support@kazoome.com>",
        Template: "Receipt",
        TemplateData: JSON.stringify(templateData),
        ReplyToAddresses: [],
      };
      await sesClient.send(new SendTemplatedEmailCommand(params));
      if (!order.recipient) {
        // Not a gift, so send order notice
        const orderRef = await snapshot.ref.get();
        const finalOrder = orderRef.data() as Order;
        await sendOrderNotice(orderDocumentId, finalOrder, true);
      }
    } catch (error) {
      functions.logger.error(error);
    }
  });
