import express, { type Express } from "express";
import { ENV_CONSTANTS } from "./constants";
import { connectToDatabase } from "./config";

const app: Express = express();
const PORT: number = ENV_CONSTANTS.PORT;

(() => {
  try {
    connectToDatabase()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`SUCCESS - Listening at http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.log("ERROR: Connecting database - MongoDB", error);
        process.exit(1);
      });
  } catch (error) {
    console.log(`ERROR - Listening at http://localhost:${PORT}`, error);
    process.exit(1);
  }
})();
