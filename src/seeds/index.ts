import db from "../config/connection.js";
import { User } from "../models/index.js";
import userSeeds from "./seeds.js";

const seedDatabase = async () => {
  try {
    await db();

    await User.deleteMany({});
    console.log("Existing users deleted. Seeding users...");

    await User.insertMany(userSeeds);
    console.log("Users seeded successfully.");

    console.log("Seeding complete. Closing database connection...");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
