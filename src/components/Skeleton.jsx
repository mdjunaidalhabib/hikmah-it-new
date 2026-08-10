export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />;
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white p-6 ${className}`}>
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="mt-4 h-5 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
    </div>
  );
}

export function SkeletonRow({ cols = 4 }) {
  return (
    <tr className="border-b border-slate-50 last:border-0">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-3 pr-3">
          <Skeleton className="h-4 w-full max-w-[140px]" />
        </td>
      ))}
    </tr>
  );
}
