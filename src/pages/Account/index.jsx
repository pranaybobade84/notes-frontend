import React from "react";
import { useGetPersonalInfoQuery } from "../../api/endpoints/userEndPoints";
import { Link } from "react-router-dom";

const Account = () => {
  const { data, isLoading } = useGetPersonalInfoQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]  ">
        <div className="flex flex-col items-center">
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
          <p className="text-black text-lg font-semibold mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[80vh] ">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full transform transition hover:scale-105">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full w-28 h-28 flex items-center justify-center text-4xl font-bold shadow-lg">
            {data?.userName?.charAt(0)?.toUpperCase()}
          </div>
        </div>

        {/* Profile Information */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">
            {data?.fullName}
          </h1>
          <p className="text-gray-600 mt-1">{data?.email}</p>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            @{data?.userName}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Edit Profile Button */}
        <Link to={"/settings/edit-profile"}>
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Edit Profile
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Account;
