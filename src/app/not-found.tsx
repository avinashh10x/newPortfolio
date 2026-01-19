import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Avi - Full-Stack Developer India",
  description:
    "The page you're looking for doesn't exist. Return to Avi's portfolio - India's best full-stack developer in Mumbai & Punjab.",
  robots: {
    index: false,
    follow: true,
  },
};

function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
      <p className="text-xl font-lg">404</p>
      <p className="font-extrabold text-3xl">Seems like you are lost</p>
      <Link href="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
