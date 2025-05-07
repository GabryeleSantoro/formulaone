import mongoose from "mongoose";

const {Schema} = mongoose;

export interface Circuit extends mongoose.Document {
    _id: number;
    circuitRef: string;
    name: string;
    location: string;
    country: string;
    lat: number;
    long: number;
    alt: number;
    url: string;
}

const circuitSchema = new Schema({
    _id: {
        type: Number,
    },
    circuitRef: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    alt: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {collection: 'circuits'});

const circuitModel = mongoose.models.Circuits || mongoose.model<Circuit>('Circuits', circuitSchema);
