import { Skeleton } from "../ui/skeleton";

export function TransactionsSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-16 border-b border-border" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-45" />
          <Skeleton className="h-10 w-35" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-10 w-32.5" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-60" />
        </div>
        <Skeleton className="mt-6 h-125 rounded-xl" />
      </main>
    </div>
  )
}