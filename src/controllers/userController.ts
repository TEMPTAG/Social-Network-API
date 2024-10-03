// Import the User and Thought models to perform CRUD operations on the database
import { User, Thought } from "../models/index.js";

// Import the Request and Response types from Express
import { Request, Response } from "express";

// `/api/users` routes:

// `GET` all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Find all users and return the user data
    const users = await User.find();

    // If no users are found, send a 404 error
    if (!users) {
      return res.status(404).json({ message: "No Users found!" });
    }

    res.json(users);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `GET` a single user by its `_id` and populated thought and friend data
export const getUserById = async (req: Request, res: Response) => {
  try {
    // Find a single user by its `_id`, populate associated thoughts and friends, and exclude the `__v` field
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: "No User with that ID" });
    }

    // If the user is found, return the user data
    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// 'POST' a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Create a new user and return the document
    const user = await User.create(req.body);

    // If the user is created, return the message and user data
    res.json({ message: "New User created.", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

// `PUT` to update a user by its `_id`
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Update the user by its `_id` and return the updated document
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: "No User with this id!" });
    }

    // If the user is found and updated, return the message and updated user data
    res.json({ message: "User updated.", user });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

// `DELETE` to remove a user by its `_id`
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Find and delete the user by its `_id` and return the deleted document
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: "No User with that ID" });
    }

    // Delete all thoughts associated with the user and return the message
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: "User and associated Thoughts deleted." });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `/api/users/:userId/friends/:friendId` routes

// `POST` to add a new friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    // Find a user by its `_id` and add a new friend to the `friends` array
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: "No User with that ID" });
    }

    // If the user is found and friend added, return the message and updated user data
    res.json({ message: "Friend added.", user });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `DELETE` to remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    // Find a user by its `_id` and remove a friend from the `friends` array
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    // If no user is found, send a 404 error
    if (!user) {
      return res.status(404).json({ message: "No Friend with that ID" });
    }

    // If the user is found and delete, return the message and updated user data
    res.json({ message: "Friend removed.", user });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
