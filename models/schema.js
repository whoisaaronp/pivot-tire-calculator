import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const OptimalSchema = new Schema({
    userName: {
        type: String,
        required: 'Enter a first name'
    },
    passWord: {
        type: Number,
        required: 'Enter numbers 1 to 4'
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