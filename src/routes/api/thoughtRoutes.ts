// Import the `Router` function from Express to create a new router instance
import { Router } from "express";

// Import controller functions for handling thought-related routes
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController.js";

// Create a new instance of the Express router
const router = Router();

// Routes for all Thoughts and associated controller functions
router.route("/").get(getAllThoughts).post(createThought);

// Routes for a specific Thought and associated controller functions
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route for creating a Reaction to a Thought and associated controller function
router.route("/:thoughtId/reactions").post(addReaction);

// Route for deleting a specific Reaction to a Thought and associated controller function
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export the `/api/thoughts` router to be used in the main API routes (`/api/index.ts`)
export default router;
