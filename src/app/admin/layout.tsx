import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {children}
    </div>
  );
}
