import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully", conn.connection.host);
  } catch (error) {
    console.log("Error while connection db:", error);
  }
};

export default connectToDB;
