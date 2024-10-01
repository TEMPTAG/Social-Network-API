import { Router } from "express";
import userRoutes from "./userRoutes.js";
// import thoughtRoutes from "./thoughtRoutes.js";

const router = Router();

// Add the User routes to the router
router.use("/users", userRoutes);

// Add the Thought routes to the router
// router.use("/thoughts", thoughtRoutes);

export default router;
