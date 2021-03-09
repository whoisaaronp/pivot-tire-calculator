import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const OptimalSchema = new Schema({
    userName: {
        type: String,
        required: 'Enter a first name'
    },
    passWord:{
        type: Number,
        required: 'Enter numbers 1 to 4'
    },
    massMeasurement:{
        type: String,
        required: 'Select a unit of mass'
    },
    pressureMeasurement:{
        type: String,
        required: 'Select a unit of pressure'
    },
    ridingStyle:{
        type: String,
        required: 'Select a bicycle type'
    },
    // calculator structure as one thing as a array, inside would be an object
    // measurements:[
        // objects go in here
    riderWeight:{
        type: String,
        required: 'Select your weight'
        // repeating measurements
    },
    tireWidth:{
        type: String,
        required: 'Select your tire rim width'
    },
    innerRimWidth:{
        type: String,
        required: 'Select your inner rim width'
    },
    wheelDiameter:{
        type: String,
        required: 'Select a unit of mass'
    },
    rimType:{
        type: String,
        required: 'Select your rim holding type'
    },
    created_date:{
        type: Date,
        default: Date.now
    }
// ]

});