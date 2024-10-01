// Import the Mongoose library to handle MongoDB connections and data modeling
import mongoose from "mongoose";

// Establish a connection to the MongoDB database
// The URI specifies the protocol (mongodb), the localhost IP address (127.0.0.1), the port number (27017), and the database name (`socialNetworkDB`).  If `socialNetworkDB` does not exist, MongoDB will create it automatically.
mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB");

// Export the Mongoose connection object to be used in other parts of the application
// This export allows other files to use this connection instance to interact with the database.
export default mongoose.connection;
