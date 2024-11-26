
const NoNotesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center ">
      <div className="animate-bounce bg-green-100 rounded-full p-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6m-7.5 6.5a9.5 9.5 0 1113 0h-.75a4.5 4.5 0 10-11.5 0H4.5z"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-700">
        No Notes Found
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        You haven’t created any notes yet. Start adding one now!
      </p>
    </div>
  );
};

export default NoNotesFound;
