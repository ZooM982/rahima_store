const DetailsSkeleton = () => {
  return (
    <div className="pt-24 pb-20 custom-container animate-pulse bg-black min-h-screen">
      <div className="h-6 w-32 bg-white/20 rounded mb-12"></div>
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="aspect-square rounded-[60px] bg-white/20"></div>
        <div className="space-y-6">
          <div className="h-4 w-24 bg-white/20 rounded"></div>
          <div className="h-16 w-full bg-white/20 rounded"></div>
          <div className="h-10 w-48 bg-white/20 rounded"></div>
          <div className="h-24 w-full bg-white/20 rounded"></div>
          <div className="h-14 w-full bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
