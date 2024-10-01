// Define Mongoose
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
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Compile User model based on the userSchema and create a new instance of the model
const User = model("User", userSchema);

// Export the User model
export default User;
