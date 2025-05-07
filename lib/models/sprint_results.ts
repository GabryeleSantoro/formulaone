import mongoose from "mongoose";
import connect from '@/lib/db';
import { Driver } from "./drivers";
import { Race } from "./races";
import { Constructors } from "./constructors";
import { Status } from "./status";

export interface SprintResults extends mongoose.Document {
    _id: number;
    raceId: Race;
    driverId: Driver;
    constructorId: Constructors;
    grid: number;
    number: number;
    position: number;
    positionText: string;
    positionOrder: number;
    points: number;
    laps: number;
    time: string;
    milliseconds: number;
    fastestLap: number;
    fastestLapTime: string;
    rank: number;
    statusId: Status;
}

const sprintResultsSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    raceId: {
        type: Number,
        required: true,
        ref: "Races",
    },
    driverId: {
        type: Number,
        required: true,
        ref: "Drivers",
    },
    constructorId: {
        type: Number,
        required: true,
        ref: "Constructors",
    },
    grid: {
        type: Number,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    positionText: {
        type: String,
        required: true,
    },
    positionOrder: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    laps: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    milliseconds: {
        type: Number,
        required: true,
    },
    fastestLap: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    statusId: {
        type: Number,
        required: true,
        ref: "Status",
    },
}, {
    collection: "sprint_results",
});

const SprintResultsModel = mongoose.models.SprintResults || mongoose.model<SprintResults>("SprintResults", sprintResultsSchema);

export const findSprintResultByRaceId = async (raceId: number) => {
    try {
        await connect();
        const sprintResults = await SprintResultsModel.find({ raceId: raceId })
            .populate("driverId")
            .populate("constructorId")
            .populate("raceId")
            .populate("statusId");
        if (!sprintResults) {
            throw new Error("No sprint results found");
        }
        return sprintResults;
    } catch (error) {
        console.error("Error fetching sprint results:", error);
        throw error;
    }
};