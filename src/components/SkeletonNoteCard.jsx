const SkeletonNoteCard = () => {
  return (
    <div className="border rounded p-4 hover:shadow-xl bg-white transition-all ease-in-out animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-3/4 bg-gray-200 h-4 rounded"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="w-full bg-gray-200 h-3 mt-2 rounded"></div>
      <div className="flex items-center justify-between mt-2">
        <div className="w-20 bg-gray-200 h-2 rounded"></div>
        <div className="flex items-center gap-2 mt-8">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonNoteCard;
