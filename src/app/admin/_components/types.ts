export type Project = {
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
