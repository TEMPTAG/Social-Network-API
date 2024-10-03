import { Router } from "express";
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController.js";

const router = Router();

// Routes for all Thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Routes for a specific Thought
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route for creating a Reaction to a Thought
router.route("/:thoughtId/reactions").post(addReaction);

// Route for deleting a specific Reaction to a Thought
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export the `/api/thoughts` routes
export default router;
