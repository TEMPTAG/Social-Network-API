import db from "../config/connection.js";
import { User, Thought } from "../models/index.js";
import { userSeeds, thoughtSeeds } from "./seeds.js";

const seedDatabase = async () => {
  try {
    await db();

    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Existing Users and Thoughts deleted.");

    await User.insertMany(userSeeds);
    await Thought.insertMany(thoughtSeeds);
    console.log("Seeded Users and Thoughts successfully.");

    console.log("Seeding complete. Closing database connection...");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
