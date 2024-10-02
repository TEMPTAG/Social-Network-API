import { Request, Response } from "express";

// `/api/thoughts` routes

// `GET` to get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "GET all thoughts route" });
};

// `GET` to get a single thought by its `_id`
export const getThoughtById = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "GET thought by ID route" });
};

// `POST` to create a new thought. Don't forget to push the created thought's `_id` to the associated user's `thoughts` array field.
export const createThought = async (_req: Request, res: Response) => {
  res.status(201).json({ message: "POST a new thought route" });
};

// `PUT` to update a thought by its `_id`
export const updateThought = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "PUT to update a thought route" });
};

// `DELETE` to remove a thought by its `_id`. Don't forget to also delete the thought from the associated user's `thoughts` array field.
export const deleteThought = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "DELETE to remove a thought by ID route" });
};
