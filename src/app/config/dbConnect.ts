import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

async function dbConnect() {
  // if (connection.isConnected) {
  //   console.log("Already Connected to the Database");
  //   return;
  // }
  try {
    const db = await mongoose.connect("mongodb+srv://akashpatelsingh9893693091:NDlTj64F5e8ShkXp@cluster0.lprakem.mongodb.net/movieTestDB?retryWrites=true&w=majority&appName=Cluster0");
    // connection.isConnected = db.connections[0].readyState;
    console.log("Database Sucessfully Connected");
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
}

export default dbConnect;
