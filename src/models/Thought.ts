// Import Mongoose and the necessary types for defining the schema and model
import { Schema, model, Document } from "mongoose";

// Import the reactionSchema to use as a subdocument in the Thought schema
import { reactionSchema } from "./reactionSchema.js";

// Define the interface for the Thought Document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: Array<{
    reactionBody: string;
    username: string;
    createdAt: Date | string;
  }>;
  reactionCount: number;
}

// Create a new instance of the Mongoose schema to define the Thought Document
const thoughtSchema = new Schema<IThought>(
  {
    // Define the `thoughtText` field: a string that is required, between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Define the `createdAt` field: a date that defaults to the current timestamp
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp when the document is queried
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    // Define the `username` field: a string that is required
    username: {
      type: String,
      required: true,
    },
    // Define the `reactions` field: an array of `reactionSchema` subdocuments
    reactions: [reactionSchema],
  },
  {
    // Include virtual properties when data is requested
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Create a virtual property `reactionCount` to get the length of the reactions array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Compile the Thought model based on the thoughtSchema and create a new instance of the model
const Thought = model<IThought>("Thought", thoughtSchema);

// Export the Thought model for use in other parts of the application
export default Thought;
