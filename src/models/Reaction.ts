// Define Mongoose
import { Schema, model, Document } from "mongoose";

// Define an interface for the Reaction document
interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

// Create the Reaction schema
const reactionSchema = new Schema<IReaction>(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

// Create and export the Reaction model
const Reaction = model<IReaction>("Reaction", reactionSchema);

export default Reaction;
