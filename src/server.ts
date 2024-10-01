// Import dotenv to load environment variables from the .env file
import dotenv from "dotenv";
dotenv.config();

// Import the express library to create an Express application
import express from "express";
// Import the Database connection from the config folder
import db from "./config/connection.js";
// import { User } from "./models/index.js";

// Define the port on which the server will listen. Use the environment variable if provided, otherwise default to 3001.
const PORT = process.env.PORT || 3001;
// Initialize the Express application
const app = express();

// Middleware to parse incoming URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON data
app.use(express.json());

// Simple home route to test that the server is running
app.get("/", (_req, res) => {
  res.send("You are connected to the Social Network API!");
});

// Handle database connection errors
db.on("error", (err) => {
  console.error(`Error connecting to the database: ${err}`);
});

// Once the database connection is open, start the Express server
db.once("open", () => {
  app.listen(PORT, () => {
    // Log a message in the console indicating the server is running with a copy-paste-ready or clickable URL
    console.log(
      `Social Network API server running on http://localhost:${PORT}`
    );
  });
});
