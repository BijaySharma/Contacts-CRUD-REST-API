import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName : {
        type: String,
        required : true,
    }, 

    lastName : {
        type: String,
        required : true,
    }, 

    email : {
        type: String
    }, 

    company : {
        type: String
    }, 

    phone : {
        type: Number
    },
    
    created_date:{
        type: Date,
        default: Date.now
    }
});