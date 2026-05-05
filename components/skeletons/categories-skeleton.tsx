import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-16 border-b border-border" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-50" />
          <Skeleton className="h-10 w-37.5" />
        </div>
        <Skeleton className="mt-6 h-10 w-75" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  )
}