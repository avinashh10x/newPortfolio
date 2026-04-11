import mongoose from "mongoose";
import dns from "dns";

// Bypass local DNS blocking (ECONNREFUSED on querySrv) by using Google DNS for Node's requests.
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
  console.warn("Could not set custom DNS servers", error);
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log("Connected to MongoDB!");
      return mongoose;
    }).catch(err => {
      console.error("MongoDB connection err:", err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
