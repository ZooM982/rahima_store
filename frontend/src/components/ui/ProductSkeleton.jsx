const ProductSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="relative h-[220px] md:h-[320px] rounded-3xl overflow-hidden mb-6 bg-white/5">
        <div className="w-full h-full bg-white/5"></div>
      </div>
      <div>
        <div className="h-3 w-20 bg-white/5 rounded mb-2"></div>
        <div className="h-6 w-40 bg-white/5 rounded mb-2"></div>
        <div className="h-5 w-24 bg-white/5 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
