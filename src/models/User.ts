// Import Mongoose and the necessary types for defining the schema and model
import { Schema, model, Document, Types } from "mongoose";

// Define the interface for the User Document
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount: number;
}

// Create a new instance of the Mongoose schema to define the User Document
const userSchema = new Schema<IUser>(
  {
    // Define the `username` field: a string that is required, unique, and trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the `email` field: a string that is required, unique, and matches the email format
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    // Define the `thoughts` field: an array of `Thought` documents
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Define the `friends` field: an array of `User` documents
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Include any virtual properties when data is requested
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual property `friendCount` that retrieves the length of the `friends` array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Compile User model based on the userSchema and create a new instance of the model
const User = model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
