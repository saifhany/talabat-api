import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role:  {type: String, required: true , default: 'customer' , enum: ['customer', 'admin' , 'provider']},    
  created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    otp : {type: Number , default: null},
});
