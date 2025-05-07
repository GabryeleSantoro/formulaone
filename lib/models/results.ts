import mongoose from "mongoose";
import connect from '@/lib/db';
import { Driver } from "./drivers";
import { Constructors } from "./constructors";
import { Status } from "./status";
import { Race } from "./races";

const {Schema} = mongoose;

require('./drivers');
require('./constructors');
require('./status');
require('./races');

export interface Result extends mongoose.Document {
    _id: number;
    raceId: Race;
    driverId: Driver;
    constructorId: Constructors;
    grid: number;
    position: number;
    number: number;
    positionText: string;
    positionOrder: number;
    points: number;
    laps: number;
    time: string;
    milliseconds: number;
    fastestLap: number;
    fastestLapTime: string;
    fastestLapSpeed: string;
    fastestLapRank: number;
    rank: number;
    statusId: Status;
}

const resultSchema = new Schema({
    _id: {
        type: Number,
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
    grid: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    positionText: {
        type: String,
        required: true
    },
    positionOrder: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    laps: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    milliseconds: {
        type: Number,
        required: true
    },
    fastestLap: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    statusId: {
        type: Number,
        required: true,
        ref: 'Status'
    }
}, {
    collection: 'results',
})

const resultModel = mongoose.models.Results || mongoose.model<Result>('Results', resultSchema);

export const findResultByRaceId = async (raceId: number) => {
    try {
        await connect();
        const data = await resultModel.find({ raceId }).populate('driverId').populate('constructorId').populate('statusId').populate('raceId');
        if (!data) {
            throw new Error("No data found");
        }
        return data;
    } catch (error) {
        console.error("Error fetching results", error);
        throw error;
    }
}