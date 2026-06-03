// components/ui/Skeleton.tsx

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="skeleton h-[200px] w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-4 w-1/3" />
        <div className="flex justify-between items-center mt-3">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[600px] bg-brand-dark flex items-center">
      <div className="max-w-container mx-auto px-4 md:px-6 w-full">
        <div className="max-w-xl space-y-4">
          <div className="skeleton h-4 w-32 bg-white/20" />
          <div className="skeleton h-16 w-full bg-white/20" />
          <div className="skeleton h-16 w-3/4 bg-white/20" />
          <div className="skeleton h-5 w-2/3 bg-white/20" />
          <div className="flex gap-4 mt-6">
            <div className="skeleton h-12 w-40 bg-white/20" />
            <div className="skeleton h-12 w-40 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
  );
}
