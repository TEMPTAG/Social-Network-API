// Import the `Router` function from Express to create a new router instance
import { Router } from "express";

// Import individual route files for users and thoughts
import userRouter from "./userRoutes.js";
import thoughtRouter from "./thoughtRoutes.js";

// Create a new instance of the Express router
const router = Router();

// Mount the user-related routes under the `/users` path
router.use("/users", userRouter);

// Mount the thought-related routes under the `/thoughts` path
router.use("/thoughts", thoughtRouter);

// Export the router instance to be used in the main routes (`/routes/index.ts`)
export default router;
