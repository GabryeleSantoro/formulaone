import mongoose from "mongoose";
import connect from '@/lib/db';

import { Race } from "./races";
import { Driver } from "./drivers";
import { Constructors } from "./constructors";

require('./drivers');
require('./constructors');
require('./races');

export interface Qualifying extends mongoose.Document {
    _id: number;
    raceId: Race;
    driverId: Driver;
    constructorId: Constructors;
    number: number;
    grid: number;
    position: number;
    q1: string;
    q2: string;
    q3: string;
}

const qualifyingSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    raceId: {
        type: Number,
        required: true,
        ref: 'Races'
    },
    driverId: {
        type: Number,
        required: true,
        ref: 'Drivers'
    },
    constructorId: {
        type: Number,
        required: true,
        ref: 'Constructors'
    },
    number: {
        type: Number,
        required: true
    },
    grid: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    q1: {
        type: String,
        required: true
    },
    q2: {
        type: String,
        required: true
    },
    q3: {
        type: String,
        required: true
    }
}, {
    collection: 'qualifying'
});

const QualifyingModel = mongoose.models.Qualifying || mongoose.model<Qualifying>('Qualifying', qualifyingSchema);

export const getQualifyingByRaceId = async (raceId: number) => {
    try {
        await connect();
        const qualifying = await QualifyingModel.find({ raceId: raceId })
            .populate('driverId')
            .populate('constructorId')
            .populate('raceId');
        if (!qualifying) {
            throw new Error('No qualifying data found');
        }
        return qualifying;  
    } catch (error) {
        console.error('Error fetching qualifying data:', error);
        throw error;
    }
}