// Import the `Router` function from Express to create a new router instance
import { Router } from "express";

// Import controller functions for handling user-related routes
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

// Create a new instance of the Express router
const router = Router();

// Routes for all Users and associated controller functions
router.route("/").get(getAllUsers).post(createUser);

// Routes for a specific User and associated controller functions
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Routes for adding a User's Friend and associated controller functions
router.route("/:userId/friends").post(addFriend);

// Routes for removing a User's Friend and associated controller functions
router.route("/:userId/friends/:friendId").delete(removeFriend);

// Export the `/api/users` router to be used in the main API routes (`/api/index.ts`)
export default router;
