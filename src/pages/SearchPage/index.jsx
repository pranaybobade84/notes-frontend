import React, { useEffect, useState } from "react";
import NoteCardLayout from "../../components/NoteCardLayout";
import { useSearchNotesQuery } from "../../api/endpoints/noteEndPoints";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const { query } = useSelector((store) => store.searchQuery);
  const [debounce, setDebounce] = useState(query);

  // Debounce effect to delay API call
  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(query), 200);
    return () => clearTimeout(timeout); // Cleanup timeout on dependency change
  }, [query]);

  const { data, isLoading, isError, error } = useSearchNotesQuery(debounce, {
    skip: !debounce,
  });

  // Conditional rendering based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-[80vh] flex items-center justify-center text-lg font-semibold text-black">
          Loading...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="h-[80vh] flex items-center justify-center text-lg font-semibold text-red-500">
          {error?.data?.message || "An error occurred while fetching notes."}
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="h-[80vh] flex items-center justify-center text-lg font-semibold text-red-500">
          No results found.
        </div>
      );
    }

    return <NoteCardLayout data={data} isLoading={isLoading} />;
  };

  return <>{renderContent()}</>;
};

export default SearchResults;
