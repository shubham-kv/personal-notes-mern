import { Skeleton } from '@/components/ui/skeleton';

export function ViewNoteUiSkeleton() {
  return (
    <div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-3xs md:w-md transition-all" />
        <Skeleton className="h-6 w-sm md:w-lg transition-all" />
      </div>
      <div className="my-4 space-y-2">
        <Skeleton className="h-6 w-2xs md:w-md transition-all" />
        <Skeleton className="h-6 w-sm md:w-xl transition-all" />
        <Skeleton className="h-6 w-xs md:w-lg transition-all" />
        <Skeleton className="h-6 w-3xs md:w-sm transition-all" />
      </div>
    </div>
  );
}
