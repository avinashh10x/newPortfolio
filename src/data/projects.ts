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
};

export const PROJECTS: project[] = [
  {
    title: "Plingo",
    slug: "plingo-the-social-media-scheduler",
    subtitle: "The Ultimate Social Media Scheduling Tool",
    description:
      "A comprehensive social media management platform that empowers users to plan, schedule, and automate posts across multiple channels, driving consistent engagement and online growth.",
    article:
      "In the fast-paced world of digital marketing, consistency is everything. Plingo was born from a simple frustration: juggling multiple social media accounts while trying to maintain a cohesive brand voice across platforms. This project set out to solve that pain point with an elegant, all-in-one scheduling solution.<br/><br/>At its core, Plingo enables users to compose, schedule, and automate posts across Twitter (X) and LinkedIn from a single dashboard. The intuitive calendar interface provides a bird's-eye view of your content pipeline, making it effortless to spot gaps and optimize posting times for maximum engagement.<br/><br/>The technical architecture leverages Next.js for a seamless user experience, backed by MongoDB for flexible data modeling and Node.js for handling OAuth integrations with social platforms. Real-time preview functionality ensures every post looks exactly as intended before it goes live.<br/><br/>Beyond basic scheduling, Plingo incorporates smart features like timezone-aware posting, draft management, and post analytics to help users understand what resonates with their audience. The platform was designed with scalability in mind, ready to support additional platforms and team collaboration features as it evolves.",
    image: ["/projects/plingo.webp"],
    // video: [
    //   "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    // ],
    link: "https://plingo.byavi.in",
    github: "https://github.com/avinashh10x/plingo",
    time: "Jan 2026",
    tag: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "twitter",
      "framer-motion",
      "gsap",
      "linkedIn",
      "Tailwind CSS",
    ],
  },
  {
    title: "DZINR",
    slug: "dzinr-brand-design-agency",
    subtitle: "Mumbai's Premier Brand Design Agency",
    description:
      "The official digital presence for DZINR, a Mumbai-based creative agency led by Anik Jain, specializing in brand identity, visual storytelling, and strategic design solutions.",
    article:
      "DZINR is more than a website—it's a digital manifesto for one of Mumbai's most compelling creative agencies. The challenge was clear: translate the agency's bold visual identity and meticulous craft into an immersive web experience that commands attention from the first scroll.<br/><br/>The site architecture was designed around storytelling. Each section unfolds with purpose, guiding visitors through the agency's philosophy, notable works, and the team behind the magic. Heavy emphasis was placed on showcasing the portfolio through high-impact imagery and video content that mirrors the quality of DZINR's output.<br/><br/>From a technical standpoint, the project demanded performance without compromise. GSAP and Framer Motion power the cinematic transitions and micro-interactions that give the site its distinctive character. Every animation serves a purpose—drawing attention, revealing content, or reinforcing brand personality.<br/><br/>The result is a digital experience that feels as premium as the brand it represents. Fast, fluid, and uncompromising in its execution, the DZINR website stands as a testament to what's possible when design and development work in perfect harmony.",
    image: ["/projects/dzinr.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],
    link: "https://dzinr.in",
    github: "#",
    time: "Sep 2025",
    tag: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "framer-motion",
      "gsap",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tingy",
    slug: "tingy-smart-image-compression",
    subtitle: "Smart Image Compression Without Quality Loss",
    description:
      "A powerful image optimization tool that significantly reduces file sizes while maintaining visual fidelity, ensuring faster load times and improved web performance.",
    article:
      "Web performance matters. Studies show that even a one-second delay in page load time can significantly impact conversion rates. Tingy was created to tackle one of the biggest culprits of slow websites: unoptimized images.<br/><br/>Unlike generic compression tools that sacrifice quality for smaller file sizes, Tingy employs intelligent algorithms powered by Sharp to analyze each image and determine the optimal compression strategy. The result? File sizes reduced by up to 80% with virtually imperceptible quality loss.<br/><br/>The user experience was designed for efficiency. Simply drag and drop your images, and Tingy handles the rest—automatically detecting the best format, compression level, and dimensions for your use case. Batch processing support makes it easy to optimize entire folders in seconds.<br/><br/>Under the hood, the platform leverages Next.js for the frontend with Node.js handling the computationally intensive image processing on the server side. The architecture was built to handle high concurrency, ensuring fast processing even during peak usage. Tingy proves that powerful tools don't need to be complicated—sometimes the best solution is the one that just works.",
    image: ["/projects/tingy.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],
    link: "https://tingy.byavi.in",
    github: "https://github.com/avinashh10x/tingy",
    time: "Oct 2025",
    tag: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "sharp",
      "Tailwind CSS",
    ],
  },
  {
    title: "Anik Portfolio",
    slug: "anik-jain-portfolio",
    subtitle: "A Digital Showcase for Designer Anik Jain",
    description:
      "A bespoke portfolio website highlighting the creative works of Anik Jain. Built with immersive animations and a clean aesthetic to showcase design expertise.",
    article:
      "A designer's portfolio is their most important project. For Anik Jain, the brief was to create a digital presence that would stand out in a sea of template-based portfolios while letting the work speak for itself.<br/><br/>The design philosophy centered on controlled sophistication. A refined color palette, generous whitespace, and thoughtful typography create a gallery-like atmosphere where each project can breathe. The layout adapts fluidly across devices, ensuring the experience remains impactful whether viewed on a 4K display or a mobile screen.<br/><br/>Interactivity plays a crucial role in engagement. Smooth scroll-based animations powered by GSAP create a sense of depth and progression as visitors explore the portfolio. Hover states and transitions are carefully choreographed to feel natural yet intentional—never gratuitous.<br/><br/>The technical implementation prioritizes performance alongside aesthetics. Images are lazy-loaded and optimized, animations are GPU-accelerated, and the entire site is server-rendered for optimal SEO. The result is a portfolio that loads fast, ranks well, and leaves a lasting impression on potential clients and collaborators.",
    image: ["/projects/anik.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],
    link: "https://anikjain.com/",
    github: "#",
    time: "Dec 2025",
    tag: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "framer-motion",
      "gsap",
      "Tailwind CSS",
    ],
  },
  {
    title: "CrazyUi",
    slug: "crazyui-one-click-ui-components",
    subtitle: "One-Click UI Components for Figma & Framer",
    description:
      "A comprehensive UI library designed to accelerate the design-to-development process. Copy and paste premium logic components directly into Figma and Framer with a single click.",
    article:
      "The gap between design and development has always been a source of friction. CrazyUI was built to bridge that divide by providing a curated library of production-ready components that work seamlessly in both Figma and Framer.<br/><br/>What sets CrazyUI apart is its focus on logic components—not just static UI elements, but fully interactive pieces with built-in functionality. Accordions that actually expand, tabs that switch content, carousels that slide smoothly. These components are designed to be dropped into projects and work immediately, no coding required.<br/><br/>The library covers essential UI patterns: navigation systems, form elements, content displays, and interactive widgets. Each component is meticulously crafted with attention to accessibility, responsiveness, and customization. Design tokens make it easy to adapt components to any brand identity.<br/><br/>For Framer users, CrazyUI represents a significant productivity boost. Instead of spending hours building complex interactions from scratch, designers can focus on what matters most—creating unique experiences. The component architecture ensures consistency across projects while still allowing for creative flexibility.",
    image: ["/projects/crazyui.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],
    link: "https://crazyui.in",
    github: "https://github.com/avinashh10x/crazyui",
    time: "Jan 2026",
    tag: ["Framer", "logic components"],
  },
  {
    title: "Stacky",
    slug: "stacky-the-productivity-platform",
    subtitle: "Built for Developers Who Value Their Time",
    description:
      "A productivity-focused platform designed to streamline development workflows. Stacky provides essential tools and resources that help developers save time and focus on building great software.",
    article:
      "Every developer knows the feeling: hours lost searching for that perfect utility function, debugging a configuration issue, or setting up boilerplate for the hundredth time. Stacky was conceived as an antidote to these productivity drains.<br/><br/>The platform aggregates essential developer resources into a single, searchable interface. Code snippets, configuration templates, quick reference guides, and best-practice patterns—all curated and organized for instant access. The goal was simple: reduce the time between having an idea and shipping working code.<br/><br/>Stacky's architecture reflects its purpose. The search functionality is lightning-fast, powered by optimized indexing that returns relevant results as you type. Resources are tagged semantically, making it easy to discover related tools and techniques. User accounts allow developers to save favorites and build personalized collections.<br/><br/>Built with Next.js and backed by MongoDB, the platform is designed to grow. Community contributions, plugin integrations, and team workspaces are all part of the roadmap. Stacky is more than a tool—it's a philosophy: your time is valuable, and the right resource at the right moment can make all the difference.",
    image: ["/projects/stacky.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],

    link: "https://stacky.byavi.in",
    github: "https://github.com/avinashh10x/stacky",
    time: "Dec 2025",
    tag: ["Next.js", "TypeScript", "Node.js", "MongoDB", "npm", "Tailwind CSS"],
  },
  {
    title: "XYZ",
    slug: "xyz-threejs-integration",
    subtitle: "Exploring the Future of 3D Web Integration",
    description:
      "An experimental playground for immersive 3D web experiences. This project pushes the boundaries of web technology by integrating Three.js with modern web frameworks.",
    article:
      "The web is evolving beyond flat interfaces. XYZ represents an exploration into the next frontier of digital experiences—where 3D graphics, physics simulations, and interactive environments become native to the browser.<br/><br/>This experimental project serves as a technical sandbox for pushing the limits of what's possible with Three.js and React. From real-time rendering techniques to complex shader programming, XYZ is a proving ground for ideas that may eventually find their way into production projects.<br/><br/>Key experiments include: optimized model loading and rendering pipelines, post-processing effects that rival native applications, physics-based interactions using cannon.js, and seamless integration with React's component model. Performance optimization is a constant focus—achieving smooth 60fps experiences even on modest hardware.<br/><br/>Beyond the technical achievements, XYZ explores the design language of 3D interfaces. How should users navigate virtual spaces? What interaction patterns feel natural? How do we balance immersion with usability? These questions guide ongoing development. XYZ isn't just a project—it's a laboratory for the future of web experiences.",
    image: ["/projects/xyz.webp"],
    video: [
      "https://paleturquoise-ant-927868.hostingersite.com/video/DZINR%20Showreel%2009.mp4",
    ],
    link: "https://xyz.byavi.in",
    github: "https://github.com/avinashh10x/xyz.git",
    time: "Jan 2026",
    tag: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "three.js",
      "framer-motion",
      "gsap",
      "Tailwind CSS",
    ],
  },
];
