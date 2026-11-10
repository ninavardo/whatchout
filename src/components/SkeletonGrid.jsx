const SkeletonGrid = ({
  count = 10,
  className = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
}) => {
  return (
    <div className={`grid gap-x-4 gap-y-8 md:gap-x-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] rounded-2xl border-2 border-[#1E1B4B]/20 bg-[#1E1B4B]/10" />
          <div className="mt-3 h-4 w-3/4 rounded bg-[#1E1B4B]/10" />
          <div className="mt-2 h-3 w-1/3 rounded bg-[#1E1B4B]/10" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
