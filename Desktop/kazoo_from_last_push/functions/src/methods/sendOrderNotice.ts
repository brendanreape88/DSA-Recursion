import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { Order } from "../firestore/interfaces/Order";
import { User } from "../firestore/interfaces/User";

const ACCESS_KEY = functions.config().aws.access_key;
const SECRET_KEY = functions.config().aws.secret_key;

const REGION = "us-west-2";
const sesClient = new SESClient({
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  region: REGION,
});

const ORDER_RECIPIENTS = [
  "James@kazoome.com",
  "Rolandfranklin@gmail.com",
  "Kylecarrmanagement@gmail.com",
];

const ORDER_RECIPIENTS_CC = [
  "opheliabright@gmail.com",
  "lreeves353@hotmail.com",
];

const ORDER_RECIPIENTS_BCC = ["kevin@lethe.com"];

export const sendOrderNotice = async (
  orderId: string,
  order: Order,
  shipOrder: boolean,
): Promise<void> => {
  const userPrivateDocument = await firestore()
    .collection("users_private")
    .doc((order.recipient && order.recipient.documentID) ?? order.user_id)
    .get();
  const userPrivate = userPrivateDocument.data() as User;

  const shippingAddressString = order.shippingAddress
    ? `${order.shippingAddress.addressL1}<br />${order.shippingAddress.addressL2}<br />${order.shippingAddress.city} ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`
    : "Missing";

  const products = order.shopertino_products.map((p) => ({
    productName: p.name,
    quantity: p.quantity,
    price: p.price.toFixed(2),
    productSize: order.confirmedSizes
      ? order.confirmedSizes.filter((s) => s.id == p.id)[0].selectedSize
      : "",
  }));

  const templateData = {
    saleDate: new Date(order.createdAt).toDateString(),
    customerName: `${userPrivate.firstName} ${userPrivate.lastName}`,
    customerEmail: userPrivate.email,
    orderCode: orderId,
    lineItems: products,
    paymentMethod: order.selectedPaymentMethod?.title ?? "",
    total: order.totalPrice.toFixed(2),
    recipientName: order.shippingAddress.name,
    recipientAddress: shipOrder ? shippingAddressString : "Do not ship",
    accepted: shipOrder ? "Accepted" : "Redeemed For Kazoo Cash",
    className: shipOrder ? "accepted" : "cash",
  };

  const params = {
    Destination: {
      ToAddresses: ORDER_RECIPIENTS,
      CcAddresses: ORDER_RECIPIENTS_CC,
      BccAddresses: ORDER_RECIPIENTS_BCC,
    },
    Source: "Kazoo Support <support@kazoome.com>",
    Template: "Sale",
    TemplateData: JSON.stringify(templateData),
    ReplyToAddresses: [],
  };
  await sesClient.send(new SendTemplatedEmailCommand(params));
};
