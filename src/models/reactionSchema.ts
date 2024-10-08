// Import Mongoose and the necessary types for defining the schema
import { Schema, Document } from "mongoose";

// Define the interface for the Reaction Document
interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

// Create a new instance of the Mongoose schema to define the Reaction Document
export const reactionSchema = new Schema<IReaction>(
  {
    // Define the `reactionBody` field: a string that is required and has a maximum length of 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Define the `username` field: a string that is required
    username: {
      type: String,
      required: true,
    },
    // Define the `createdAt` field: a date that defaults to the current timestamp
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp when the document is queried
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
  },
  {
    // Include virtual properties when data is requested
    toJSON: { getters: true },
    id: false,
  }
);
