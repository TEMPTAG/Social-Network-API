import { Request, Response } from "express";

// `/api/users` routes

// `GET` all users
export const getAllUsers = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "GET all users route" });
};

// `GET` a single user by its `_id` and populated thought and friend data
export const getUserById = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "GET user by ID route" });
};

// 'POST' a new user
export const createUser = async (_req: Request, res: Response) => {
  res.status(201).json({ message: "POST a new user route" });
};

// `PUT` to update a user by its `_id`
export const updateUser = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "PUT to update a user route" });
};

// `DELETE` to remove a user by its `_id`
export const deleteUser = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "DELETE to remove a user by ID route" });
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
