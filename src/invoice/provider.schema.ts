import * as mongoose from 'mongoose';

export const ProviderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categories: {type: mongoose.Schema.Types.ObjectId,ref: 'Category'},
    subCategories: [String],
    name: String,
    rating: Number,
    products: [{
        name: String,
        price: Number,
        description: String,
        quantity: Number,
        subCategory: String,
        createdAt: Date,
        updatedAt: Date,
    }],
    address: String,
} , {timestamps: true});