// Define Mongoose
import { Schema, model, Document, Types } from "mongoose";

// Define an interface for the Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: Types.ObjectId[];
  reactionCount: number;
}

// Create the Thought schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Create a virtual property `reactionCount` to get the length of the reactions array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions?.length;
});

// Compile the Thought model using the thoughtSchema
const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
