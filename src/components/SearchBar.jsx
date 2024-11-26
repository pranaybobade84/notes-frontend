import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  handleSearch,
  className,
  placeholder,
  name
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyUp={handleSearch}
        placeholder={placeholder || "Search..."}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-200"
        name={name}
      />
      <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Search />
      </span>
    </div>
  );
};

export default SearchBar;
