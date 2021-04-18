import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const userSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    password: {
        type: Number,
        required: 'Enter numbers 1 to 4'
    },
});

// create a new models for the user_data 
// matche models with schema then export then out
// put all the routes in one section
// make the collections match the models
// add all the routes to the index.ejs