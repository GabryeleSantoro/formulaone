// lib/mongodb.ts
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const options = {};

const connect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(uri + dbName, options);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

export default connect;