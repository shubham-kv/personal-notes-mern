import mongoose from "mongoose";
import { logger } from "../logger";

export async function initiateDbConnection(): Promise<void> {
  const mongoUri =
    process.env.NODE_ENV === "test"
      ? (process.env.TEST_MONGO_URI as string)
      : (process.env.MONGO_URI as string);

  try {
    await mongoose.connect(mongoUri);
    logger.info("Connected to MongoDB!");
  } catch (e) {
    logger.error("Failed to connect to MongoDB");
    throw e
  }
}

export async function terminateDbConnection(): Promise<void> {
  try {
    await mongoose.connection.close();
  } catch (e) {
    logger.error("Failed while disconnecting to MongoDB");
    logger.error(e);
  }
}
