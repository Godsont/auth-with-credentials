import mongoose from "mongoose";

export const connectMongoDB = async () => { // Make the connection to MongoDB by using a try ad catch block
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Pass the connection string that we have for the database connection in .env file
    console.log("Connected to MongoDB"); 
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
