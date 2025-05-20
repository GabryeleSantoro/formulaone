import connect from "../db";
import mongoose from "mongoose";
import { getNextSequenceValue } from "./counters";

const {Schema} = mongoose;

export interface User {
    _id?: number;
    name: string;
    surname: string;
    password?: string;
    email: string;
    username?: string;
    dob?: Date;
    joinedDate?: Date;
}

const userSchema = new Schema({
    _id: {
        type: Number,   
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true,
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    }
}, {
    versionKey: false,
    collection: 'users',
});

const userModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export async function createUser(user: User): Promise<User> {

    try {

        connect();

        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            user._id = await getNextSequenceValue("users", session);
            const newUser = new userModel(user);
            await newUser.save({ session });
            await session.commitTransaction();
            return newUser;
        } catch (error: any) {
            console.error("Error creating user");
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error: any) {
        throw error;
    }
}

export async function loginUser(username: string): Promise<User | null> {
    try {
        connect();
        const user = await userModel.findOne({ username })
        return user;
    } catch (error: any) {
        console.error("Error logging in user", error);
        throw error;
    }
}

export async function findUserById(id: number): Promise<User | null> {
    try {
        connect();
        const user = await userModel.findById(id);
        return user;
    } catch (error: any) {
        console.error("Error finding user by ID", error);
        throw error;
    }
}

export async function updateUser(id: number, user: User): Promise<User | null> {
    try {
        connect();
        const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    } catch (error: any) {
        console.error("Error updating user", error);
        throw error;
    }
}

export async function deleteUser(id: number): Promise<User | null> {
    try {
        connect();
        const deletedUser = await userModel.findByIdAndDelete(id);
        return deletedUser;
    } catch (error: any) {
        console.error("Error deleting user", error);
        throw error;
    }
}