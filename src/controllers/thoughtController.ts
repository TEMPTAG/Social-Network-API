// import { User, Thought } from "../models/index.js";
import { Thought } from "../models/index.js";

import { Request, Response } from "express";

// `/api/thoughts` routes

// `GET` to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  // res.status(200).json({ message: "GET all thoughts route" });
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// `GET` to get a single thought by its `_id`
export const getThoughtById = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "GET thought by ID route" });
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

// `POST` to create a new thought.
// Don't forget to push the created thought's `_id` to the associated user's `thoughts` array field.
export const createThought = async (req: Request, res: Response) => {
  // res.status(201).json({ message: "POST a new thought route" });
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// `PUT` to update a thought by its `_id`
export const updateThought = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "PUT to update a thought route" });
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

// `DELETE` to remove a thought by its `_id`.
// Don't forget to also delete the thought from the associated user's `thoughts` array field.
export const deleteThought = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "DELETE to remove a thought by ID route" });
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

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

// `/api/thoughts/:thoughtId/reactions` routes

// `POST` to create a reaction stored in a single thought's `reactions` array field

// `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
