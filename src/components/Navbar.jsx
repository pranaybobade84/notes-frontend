import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/slices/menuSlice";
import { Link, useNavigate } from "react-router-dom";
import { setQuery } from "../store/slices/searchSlice";

const Navbar = () => {
  const { query } = useSelector((store) => store.searchQuery);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenuBtn = () => {
    dispatch(toggleMenu());
  };

  const onChange = (e) => {
    const query = e.target.value;
    dispatch(
      setQuery({
        query,
      })
    );

    navigate(`/search?search=${query}`);
  };

  return (
    <header className="py-3 md:py-1.5 px-4 md:px-8 shadow-lg bg-white ">
      <nav className="flex justify-between items-center">
        {/* Left Side (Logo and Menu) */}
        <div className="flex items-center gap-x-4">
          <Menu
            size={24}
            className="cursor-pointer md:hidden text-gray-600 hover:text-black transition-colors duration-200"
            onClick={toggleMenuBtn}
          />
          <Link to={"/home"}>
            <h1 className="text-gray-600 text-xl font-semibold tracking-wide hover:text-black transition-colors duration-200">
              Note<span className="text-black">Stack</span>
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center justify-center flex-grow max-w-md">
          <SearchBar
            value={query}
            onChange={onChange}
            className="w-full h-full p-2  rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            placeholder="Search notes..."
            name="search"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-x-4">
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
