// // Import the Mongoose library to handle MongoDB connections and data modeling
// import mongoose from "mongoose";

// // Import dotenv to load environment variables from the .env file
// import dotenv from "dotenv";
// dotenv.config();

// // Define the MongoDB database connection string
// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

// // Establish a connection to the MongoDB database
// mongoose.connect(MONGODB_URI);

// // Export the Mongoose connection object
// export default mongoose.connection;

import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"
    );
    console.log("Database connected.");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed.");
  }
};

export default db;
