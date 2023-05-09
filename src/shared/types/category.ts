import { Document } from 'mongoose';



export interface Category extends Document {
 
    name: String;
    description: String;
    created: Date;
    updated: Date;
    
}