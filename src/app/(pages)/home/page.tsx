import { heroText, ICON_MAP } from "@/data/profile";
import Link from "next/link";

function HomePage() {
  const parts = heroText.split(
    /(\{\{github\}\}|\{\{twitter\}\}|\{\{linkedin\}\})/
  );

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl px-6 text-center">
        <h1 className="text-2xl leading-relaxed font-recia font-extrabold">
          {parts.map((part, index) => {
            const icon = ICON_MAP[part as keyof typeof ICON_MAP];

            if (!icon) {
              return <span key={index}>{part}</span>;
            }

            return (
              <Link
                key={index}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.label}
                className="inline-flex items-center mx-1 align-middle"
              >
                <icon.Icon />
              </Link>
            );
          })}
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
