export default function PetCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-2/3 rounded-md" />
        <div className="skeleton h-3 w-1/2 rounded-md" />
        <div className="skeleton h-3 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
