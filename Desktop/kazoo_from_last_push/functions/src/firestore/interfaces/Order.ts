import { Address } from "./Address";
import { PaymentMethod } from "./PaymentMethod";
import { Product } from "./Product";
import { Recipient } from "./Recipient";
import { Size } from "./Size";

export interface Order {
  id: string; // This is the order code not the document id
  // eslint-disable-next-line camelcase
  user_id: string;
  createdAt: string;
  // eslint-disable-next-line camelcase
  shopertino_products: Product[];
  recipient: Recipient;
  shippingAddress: Address;
  selectedPaymentMethod: PaymentMethod;
  totalPrice: number;
  kazooCash: number;
  confirmedSizes: Size[];
}
