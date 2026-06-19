export default function Loading() {
  return (
    <div className="mx-auto mt-28 max-w-3xl px-4 sm:px-6">
      <div className="skeleton mx-auto h-10 w-3/4 rounded-lg" />
      <div className="skeleton mx-auto mt-4 h-4 w-1/2 rounded-lg" />
      <div className="mt-10 space-y-5">
        <div className="skeleton h-14 w-full rounded-xl" />
        <div className="skeleton h-14 w-full rounded-xl" />
        <div className="skeleton h-20 w-full rounded-xl" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
