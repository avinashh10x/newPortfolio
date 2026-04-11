import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Project } from "@/models/project.model";

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get("admin_session");
  return cookie?.value === "authenticated";
}

// GET: return the current projects from MongoDB
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    // Sort by order field
    const projects = await Project.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error reading projects from DB:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

// PUT: update the entire projects array (Bulk Sync)
export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { projects } = await request.json();

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Projects must be an array" },
        { status: 400 }
      );
    }

    await dbConnect();

    // The simplest way to keep it perfectly synced with the array order
    // is to clear and replace, or bulk upsert.
    // We'll clear and insert them with the explicit array index as order.
    
    // First, map array index to the order property
    const projectsWithOrder = projects.map((p, ix) => ({
      ...p,
      order: ix,
    }));

    // Clear existing
    await Project.deleteMany({});
    
    // Insert new
    if (projectsWithOrder.length > 0) {
      await Project.insertMany(projectsWithOrder);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing projects to DB:", error);
    return NextResponse.json(
      { error: "Failed to write projects" },
      { status: 500 }
    );
  }
}
