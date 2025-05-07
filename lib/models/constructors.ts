import mongoose from "mongoose";
import connect from '@/lib/db';

const {Schema} = mongoose;

export interface Constructors extends mongoose.Document {
    _id: string;
    constructorRef: string;
    name: string;
    nationality: string;
}

const constructorsSchema = new Schema({
    _id: {
        type: Number,
    },
    constructorRef: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true   
    },
    nationality: {
        type: String,
        required: true
    }
}, {
    collection: 'constructors',
})

const constructorsModel = mongoose.models.Constructors || mongoose.model<Constructors>('Constructors', constructorsSchema);

export const findAll = async () => {
    try {
        await connect();
        const data = await constructorsModel.find({});
        if (!data) {
            throw new Error("No data found");
        }
        return data;
    } catch (error) {
        console.error("Error fetching constructors:", error);
        throw error;
    }
}

export const findById = async (id: string) => {
    try {
        await connect();
        const data = await constructorsModel.findById(id);
        if (!data) {
            throw new Error("No data found");
        }
        return data;
    } catch (error) {
        console.error("Error fetching constructor by ID:", error);
        throw error;
    }
}