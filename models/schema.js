import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const OptimalSchema = new Schema({
    userID: {
        type: String,
    },
    massMeasurement: {
        type: String,
        required: 'Select a unit of mass'
    },
    pressureMeasurement: {
        type: String,
        required: 'Select a unit of pressure'
    },
    ridingStyle: {
        type: String,
        required: 'Select a bicycle type'
    },
    innerRimWidth: {
        type: String,
        required: 'Select your inner rim width'
    },
    wheelDiameter: {
        type: String,
        required: 'Select a unit of mass'
    },
    rimType: {
        type: String,
        required: 'Select your rim holding type'
    },
    riderWeight: {
        type: String,
        required: 'Select your weight'
    },
    tireWidth: {
        type: String,
        required: 'Select your tire rim width'
    },
    roadSurface: {
        type: String,
        required: 'Select your road surface'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// create a new models for the user_data 
// matche models with schema then export then out
// put all the routes in one section
// make the collections match the models
// add all the routes to the index.ejs