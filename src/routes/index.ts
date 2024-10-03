// Import the `Router` function from Express to create a new router instance
import { Router } from "express";

// Import the API routes from the `api` directory
import apiRoutes from "./api/index.js";

// Create a new instance of the Express router
const router = Router();

// Mount all the API routes under the `/api` path
router.use("/api", apiRoutes);

// Catch-all route for invalid endpoints - for client requests to routes that do not exist
router.use((_req, res) => {
  return res.send("This is not a valid route in the Social Network API");
});

// Export the router instance for use in other parts of the application
export default router;
