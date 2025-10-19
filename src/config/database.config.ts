import mongoose from "mongoose";
import { ENV_CONSTANTS } from "../constants";

async function connectToDatabase() {
  try {
    if (!ENV_CONSTANTS.MONGODB_URI) {
      console.log(`ERROR: Invalid MongoDB Connection String`);
      process.exit(1);
    }
    await mongoose.connect(ENV_CONSTANTS.MONGODB_URI);
    console.log(`SUCCESS: Connected to MongoDB`);
  } catch (error) {
    console.log(`ERROR: Connecting to MongoDB`, error);
    process.exit(1);
  }
}

export default connectToDatabase;
