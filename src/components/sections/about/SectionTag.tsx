export default function SectionTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}
