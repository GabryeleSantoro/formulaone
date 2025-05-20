import mongoose from "mongoose";
import connect from '@/lib/db';

const { Schema } = mongoose;
export interface Counters extends mongoose.Document {
    _id: string;
    sequence_value: number;
}
const countersSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    sequence_value: {
        type: Number,
        default: 0,
    },
}, {
    collection: 'counters',
});

const countersModel = mongoose.models.Counters || mongoose.model<Counters>('Counters', countersSchema);

export function getNextSequenceValue(sequenceName : string, session: any): Promise<number> {

    try {
        connect();
        const updatedCounter = countersModel.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { returnDocument: "after", upsert: true, session }
        );

        return updatedCounter.then((counter) => {
            if (!counter) {
                throw new Error("Counter not found");
            }
            return counter.sequence_value;
        });
        } catch (error) {
    console.error("Error getting next sequence value:", error);
    throw error;
  }
}