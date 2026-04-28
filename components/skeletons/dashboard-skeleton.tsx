import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton(){
    return(
        <div className="flex-1 flex flex-col">
            <div className="h-16 border-b border-border" />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({length: 4}).map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <Skeleton className="h-100 rounded-xl lg:col-span-2" />
                    <Skeleton className="h-100 rounded-xl" />
                </div>
                <div className="mt-6">
                    <Skeleton className="h-112.5 rounded-xl" />
                </div>
            </main>
        </div>
    )
}