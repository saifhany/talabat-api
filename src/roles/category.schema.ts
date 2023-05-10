import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    
});
