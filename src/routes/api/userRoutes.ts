import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

const router = Router();

// Routes for all Users
router.route("/").get(getAllUsers).post(createUser);

// Routes for a specific User
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Routes for a User's Friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Export the `/api/users` routes
export { router as userRouter };
