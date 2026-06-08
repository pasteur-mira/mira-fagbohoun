export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-card p-6">
      <p className="eyebrow mb-2">{label}</p>
      <p className="font-display text-xl text-foreground truncate">{value}</p>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex min-h-30 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
