// lib/mongodb.ts
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const options = { replicaSet: process.env.MONGODB_REPLICA_SET };

const connect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(uri + dbName, options);
  } catch (error : any) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

export default connect;