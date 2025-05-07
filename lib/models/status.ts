import mongoose from "mongoose";
import connect from '@/lib/db';

const {Schema} = mongoose;

export interface Status extends mongoose.Document {
    _id: number;
    status: string;
}

const statusSchema = new Schema({
    _id: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    }
}, {
    collection: 'status',
})

const statusModel = mongoose.models.Status || mongoose.model<Status>('Status', statusSchema);

