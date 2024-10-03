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
    console.log("Seeded Users.");

    for (const thought of thoughtSeeds) {
      const newThought = await Thought.create({
        thoughtText: thought.thoughtText,
        username: thought.username,
      });

      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: newThought._id } }
      );
    }

    console.log("Thoughts created and associated with the appropriate users.");

    console.log("Seeding complete. Closing database connection...");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
