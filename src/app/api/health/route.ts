import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  const start = Date.now();
  try {
    const mongoose = await dbConnect();
    const elapsed = Date.now() - start;

    // Ping the database
    const admin = mongoose.connection.db.admin();
    const pingResult = await admin.ping();

    return NextResponse.json({
      status: "✅ Connected",
      ping: pingResult,
      latency: `${elapsed}ms`,
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState, // 1 = connected
    });
  } catch (error) {
    const elapsed = Date.now() - start;
    return NextResponse.json(
      {
        status: "❌ Failed",
        latency: `${elapsed}ms`,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
