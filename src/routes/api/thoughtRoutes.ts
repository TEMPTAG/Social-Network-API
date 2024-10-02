import { Router } from "express";
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
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

// Export the `/api/thoughts` routes
export default router;
