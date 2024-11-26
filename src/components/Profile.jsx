import { X } from "lucide-react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/slices/menuSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useLogoutApiMutation } from "../api/endpoints/authEndPoints";
import { clearCredientials } from "../store/slices/authSlice";
import { useGetPersonalInfoQuery } from "../api/endpoints/userEndPoints";

const Profile = () => {
  const { isOpen } = useSelector((store) => store.menu);
  const dispatch = useDispatch();
  const { data: personalInfo } = useGetPersonalInfoQuery();

  const [Logout, { data, isSuccess, isLoading }] = useLogoutApiMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      toast.error("Failed while loggging out");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("accessToken");
      dispatch(clearCredientials());
      navigate("/sign-in");
      toast.success(data?.message);
    }
  }, [isSuccess, data, navigate, isLoading, dispatch]);
  return (
    <div
      className={`md:flex gap-x-3 items-center absolute md:static  ${
        isOpen
          ? " hidden"
          : "flex gap-3  z-[999] flex-col  !right-3 bg-black h-52 w-40 rounded-lg  justify-center items-center top-5"
      }`}
    >
      <X
        size={25}
        className="absolute top-2 right-3 cursor-pointer md:hidden z-20 text-white"
        onClick={() => dispatch(toggleMenu())}
      />

      <div className="flex flex-col md:flex-row gap-5 sm:gap-x-3 items-center">
        <Link
          to={"/private-notes"}
          className="text-sm font-semibold  order-2 text-white md:text-black"
        >
          Private Notes
        </Link>
        <Link className=" cursor-pointer" to={"/settings/account"}>
          <Avatar
            size="35"
            round={true}
            name={personalInfo?.userName?.charAt(0)?.toUpperCase()}
          />
        </Link>
        <div
          className="px-2 py-1 text-sm font-semibold text-white bg-red-500 hover:opacity-80 rounded-md text-center cursor-pointer order-3"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
