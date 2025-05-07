import mongoose from "mongoose";

const {Schema} = mongoose;

export interface Driver extends mongoose.Document {
    _id: Number;
    driverRef: string;
    number: Number;
    code: string;
    forename: string;
    surname: string;
    dob: string;
    nationality: string;
    url: string;
}

const driversSchema = new Schema({
    _id: {
        type: Number,
    },
    driverRef: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true   
    },
    code: {
        type: String,
        required: true
    },
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    collection: 'drivers',
})

const driversModel = mongoose.models.Drivers || mongoose.model<Driver>('Drivers', driversSchema);