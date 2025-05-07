import mongoose from "mongoose";
import connect from '@/lib/db';
import { Circuit } from "./circuits";

const {Schema} = mongoose;

require('./circuits');

export interface Race extends mongoose.Document {
    _id: number;
    year: number;
    round: number;
    circuitId: Circuit;
    name: string;
    date: Date;
    time: string;
    url: string;
    fp1_date: string;
    fp1_time: string;
    fp2_date: string;
    fp2_time: string;
    fp3_date: string;
    fp3_time: string;
    quali_date: string;
    quali_time: string;
    sprint_date: string;
    sprint_time: string;
}

const raceSchema = new Schema({
    _id: {
        type: Number,
    },
    year: {
        type: Number,
        required: true
    },
    round: {
        type: Number,
        required: true
    },
    circuitId: {
        type: Number,
        required: true,
        ref: 'Circuits'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    fp1_date: {
        type: String,
        required: true
    },
    fp1_time: {
        type: String,
        required: true
    },
    fp2_date: {
        type: String,
        required: true
    },
    fp2_time: {
        type: String,
        required: true
    },
    fp3_date: {
        type: String,
        required: true
    },
    fp3_time: {
        type: String,
        required: true
    },
    quali_date: {
        type: String,
        required: true
    },
    quali_time: {
        type: String,
        required: true
    },
    sprint_date: {
        type: String,
        required: true
    },
    sprint_time: {
        type: String,
        required: true
    }
}, {
    collection: 'races' });

export const raceModel = mongoose.models.Races || mongoose.model<Race>('Races', raceSchema);

export const findAllYears = async () => {
    try {
        await connect();
        const data = await raceModel.find({}, "year").distinct('year');
        if (!data) {
            throw new Error("No data found");
        }
        return data.sort((a, b) => b - a);
    } catch (error) {
        console.error("Error");
        throw error;
    }
}

export const findAllRacesByYear = async (year: string) => {
    try {
        await connect();
        const data = await raceModel.find({ year: year }).sort('round').populate('circuitId');
        if (!data) {
            throw new Error("No data found");
        }
        return data;
    } catch (error) {
        console.error("Error");
        throw error;
    }
}