import { Router } from "express";
import apiRoutes from "./api/index.js";

const router = Router();

// Import the API routes from the `api` directory
router.use("/api", apiRoutes);

// If the route is not valid, return a 404 status
router.use((_req, res) => {
  return res.send("This is not a valid route in the Social Network API");
});

export default router;
