import { User, Thought } from "../models/index.js";
import { Request, Response } from "express";

// `/api/users` routes

// `GET` all users
export const getAllUsers = async (_req: Request, res: Response) => {
  // res.status(200).json({ message: "GET all users route" });
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// `GET` a single user by its `_id` and populated thought and friend data
export const getUserById = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "GET user by ID route" });
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// 'POST' a new user
export const createUser = async (req: Request, res: Response) => {
  // res.status(201).json({ message: "POST a new user route" });
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// `PUT` to update a user by its `_id`
export const updateUser = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "PUT to update a user route" });
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    res.json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

// `DELETE` to remove a user by its `_id`
export const deleteUser = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "DELETE to remove a user by ID route" });
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: "User and associated thoughts deleted!" });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `/api/users/:userId/friends/:friendId` routes

// `POST` to add a new friend to a user's friend list
export const addFriend = async (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "POST to add a friend to user's friend list route" });
};

// `DELETE` to remove a friend from a user's friend list
export const removeFriend = async (_req: Request, res: Response) => {
  res.status(200).json({
    message: "DELETE to remove a friend from a user's friend list route",
  });
};
