import mongoose from "mongoose";

const databaseConnection = async () => {
  await mongoose.connect(process.env.DATABASE_URL!);
};

export default databaseConnection;
