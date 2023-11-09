import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://zsecq94:uZghrpbxsODbjAD7@cluster0.4bocnfz.mongodb.net/?retryWrites=true&w=majority"
    );
    if (connection) {
      console.log("connected to db");
    }
  } catch (error) {
    console.log("error in connectToDatabase");
    throw error;
  }
};

export default connectToDatabase;
