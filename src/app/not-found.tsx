import { ThemeAware404 } from "./_components/ThemeAware404";

// Metadata export - must be in a Server Component context
export const metadata = {
  title: "Page Not Found | Avi - Creative Developer India",
  description:
    "The page you're looking for doesn't exist. Return to Avi's portfolio - India's Creative Developer in Mumbai & Punjab.",
  robots: {
    index: false,
    follow: true,
  },
};

function NotFound() {
  return <ThemeAware404 />;
}

export default NotFound;
