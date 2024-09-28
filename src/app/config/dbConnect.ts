import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected to the Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DB_URL || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Sucessfully Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnect;
