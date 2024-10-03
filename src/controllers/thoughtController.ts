import { User, Thought } from "../models/index.js";
// import { Thought } from "../models/index.js";

import { Request, Response } from "express";

// `/api/thoughts` routes

// `GET` to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// `GET` to get a single thought by its `_id`
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `POST` to create a new Thought and push the Thought's `_id` to the associated User's `thoughts` array field
export const createThought = async (req: Request, res: Response) => {
  // Check if the request body has a `username` field - a Thought cannot be created without a User
  if (!req.body.username) {
    return res
      .status(400)
      .json({ message: "Thought cannot be created without a User" });
  }

  try {
    // Check if the User exists before creating the Thought
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "No user with that username" });
    }

    // If the User exists, create the Thought
    const thought = await Thought.create(req.body);

    // Push the Thought's `_id` to the associated User's `thoughts` array field
    await User.updateOne(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    // Return the Thought and User
    res.json({ thought, user });
    return;
  } catch (err) {
    console.error("Error creating thought:", err);
    res.status(500).json({ message: "Failed to create thought", error: err });
    return;
  }
};

// `PUT` to update a Thought by its `_id`
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

// `DELETE` to remove a Thought by its `_id`.
// Don't forget to also delete the Thought from the associated User's `thoughts` array field.
export const deleteThought = async (req: Request, res: Response) => {
  try {
    // Find and delete the Thought by its `_id`
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    // If no Thought is found, return a 404 error
    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    // Find the associated User and remove the Thought's `_id` from the User's `thoughts` array field
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } },
      { new: true }
    );

    // If no User is found, return a 404 error
    if (!user) {
      return res.status(404).json({
        message: "Thought deleted, but no User found with that username",
      });
    }

    // If Thought is successfully deleted, return the success message, deleted Thought, and the User
    res.json({
      Message:
        "Thought deleted and Thought ID removed from User's thought's array",
      thought,
      user,
    });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `/api/thoughts/:thoughtId/reactions` routes

// `POST` to create a reaction stored in a single thought's `reactions` array field

// `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
