// Import the User and Thought models to perform CRUD operations on the database
import { User, Thought } from "../models/index.js";

// Import the Request and Response types from Express
import { Request, Response } from "express";

// `/api/thoughts` routes

// `GET` to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    // Find all thoughts and return the thought data
    const thoughts = await Thought.find();

    // If no thoughts are found, send a 404 error
    if (!thoughts) {
      return res.status(404).json({ message: "No thoughts found!" });
    }

    res.json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// `GET` to get a single thought by its `_id`
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    // Find a single thought by its `_id` and exclude the `__v` field
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    // If no thought is found, send a 404 error
    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    // If the thought is found, return the thought data
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
    res.json({ message: "Thought created.", thought, user });
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
    // Find and update the Thought by its `_id`, run schema validators, and return the updated document
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    // If no Thought is found, send a 404 error
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // If the Thought is found and updated, return the success message and updated
    res.json({ message: "Thought updated.", thought });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
};

// `DELETE` to remove a Thought by its `_id`. Also remove the Thought's `_id` from the associated User's `thoughts` array field
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
export const addReaction = async (req: Request, res: Response) => {
  try {
    // Find a single thought by its `_id` and push the reaction body to the `reactions` array
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    // If no thought is found, send a 404 error
    if (!thought) {
      res.status(404).json({
        message: "Reaction created, but there is no thought with this id!",
      });
    } else {
      // If the thought is found and the reaction is added, return the thought data
      res.json({ message: "Reaction added to thought.", thought });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
export const removeReaction = async (req: Request, res: Response) => {
  try {
    // Find a single thought by its `_id` and pull the reaction by the `reactionId` value
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    // If no thought is found, send a 404 error
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // If the thought is found and the reaction is removed, return the message and thought data
    return res.json({ message: "Reaction deleted.", thought });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
