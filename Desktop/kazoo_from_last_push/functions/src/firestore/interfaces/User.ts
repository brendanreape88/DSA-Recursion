import { Address } from "./Address";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  pushToken: string;
}
