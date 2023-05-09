import { Document } from 'mongoose';

export enum Role {
    Customer = 'Customer',
    admin = 'admin',
    Provider = 'Provider',
}

export interface User extends Document {
  created: Date;
  email: String;
  id: String;
  password: String;
  phone: String;
  role: String;
  otp: Number;
}