import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
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
  order: number; // to maintain custom order like in arrays
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    article: { type: String },
    image: { type: [String], default: [] },
    video: { type: [String], default: [] },
    link: { type: String, required: true },
    github: { type: String },
    time: { type: String },
    tag: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
