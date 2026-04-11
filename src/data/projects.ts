import dbConnect from "@/lib/mongoose";
import { Project as MongoProject } from "@/models/project.model";

export type project = {
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  article?: string;
  image: string[];
  video?: string[];
  link: string;
  github?: string;
  time?: string;
  tag?: string[];
  isFeatured?: boolean;
};

export const PROJECTS: project[] = [
  {
    "title": "FreePay",
    "slug": "freepay",
    "subtitle": "Bitcoin payment links built for freelancers and global creators.",
    "description": "A crypto payment link platform that enables freelancers to create shareable payment pages and receive Bitcoin or stablecoin payments instantly with a frictionless checkout experience.",
    "article": "<h3>Overview</h3> FreePay is a modern payment-link platform built to solve one of the biggest problems freelancers face: getting paid quickly and globally without banking friction, delays, or excessive fees. It transforms crypto payments into a familiar experience—create a link, share it, and get paid. <br/> <h3>Tech Stack</h3> Next.js TypeScript Node.js Tailwind CSS Starkzap SDK Starknet Vercel <br/> <h3>The Process</h3> The idea behind FreePay came from a simple pain point many freelancers experience—international payments are often slow, expensive, and unnecessarily complex. Traditional platforms introduce high fees, waiting periods, and regional limitations. FreePay was designed as a faster alternative powered by blockchain rails. <br/>\n\nThe product experience was intentionally kept simple. Users can generate a custom payment link in seconds, define the payment amount, and share it directly with clients. No confusing wallet flows, no technical jargon, and no unnecessary setup barriers.\n\n<br/>\n\nUsing Starkzap SDK, the platform integrates Bitcoin and token payment capabilities through Starknet while maintaining a smooth user experience. The objective was to hide blockchain complexity and make crypto feel as easy as sending an invoice link.\n\n<br/>\n\nThe interface was designed with freelancers and creators in mind—clean layouts, fast loading pages, mobile responsiveness, and trust-focused UI decisions. Every screen was built to reduce hesitation for both the sender and the payer.\n\n<br/>\n\nFreePay demonstrates how Web3 infrastructure can be turned into a practical real-world product. Instead of building for speculation, the platform focuses on utility: helping independent professionals get paid faster across borders.\n\n<br/> <h3>Result</h3> A production-ready hackathon project that showcases fintech product thinking, modern frontend engineering, blockchain integrations, and user-first execution.",
    "image": [
      "https://res.cloudinary.com/dsr8rjhoc/image/upload/q_auto/f_auto/v1775917013/117shots_so_vaiqd1.png"
    ],
    "video": [],
    "link": "https://freepaynow.vercel.app/",
    "github": "https://github.com/avinashh10x/FreePay",
    "time": "march 2026",
    "tag": [
      "Fintech",
      "Crypto",
      "Bitcoin",
      "Payment Links",
      "Web3",
      "Next.js",
      "TypeScript",
      "Starknet",
      "Freelancer Tools",
      "Hackathon"
    ],
    "isFeatured": true
  }
];

export async function getProjects(): Promise<project[]> {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is missing, falling back to static local projects.");
      return PROJECTS;
    }
  
    await dbConnect();
    const docs = await MongoProject.find({}).sort({ order: 1 }).lean();
    
    // Seed database if empty
    if (docs.length === 0 && PROJECTS.length > 0) {
      console.log("Seeding MongoDB with local projects...");
      const seeded = PROJECTS.map((p, ix) => ({ ...p, order: ix }));
      await MongoProject.insertMany(seeded);
      return seeded as unknown as project[];
    }

    return docs.map(doc => {
      // Map MongoDB document to the project type, stripping internal mongoose fields
      const { _id, __v, order, createdAt, updatedAt, ...rest } = doc as any;
      return rest as project;
    });
  } catch (error) {
    console.error("Error connecting to DB:", error);
    // Fallback to static if connection fails
    return PROJECTS;
  }
}

