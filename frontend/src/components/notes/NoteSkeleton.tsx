export default function NoteSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 border border-stone-200 rounded-2xl bg-white basis-1/2">
      <div className="flex flex-row justify-between items-center">
        <div className=" bg-stone-200 h-4 w-16 animate-pulse rounded-full"></div>
        <div className="h-4 w-12 bg-stone-200 rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-1 h-full">
        <div className="h-6 w-3/4 bg-stone-200 animate-pulse rounded-full"></div>
        <div className="h-full w-full bg-stone-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}
