export default function ProjectLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="size-10 animate-spin rounded-full border-2 border-foreground/10 border-t-foreground/70" />
    </div>
  );
}
