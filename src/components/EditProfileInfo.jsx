import { toast } from "react-toastify";
import {
  useEditPersonalInfoMutation,
  useGetPersonalInfoQuery,
} from "../api/endpoints/userEndPoints";
import Input from "./Input";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const { data } = useGetPersonalInfoQuery();
  const [
    editInfo,
    {
      data: editApiData,
      isSuccess: editSuccess,
      isError: editError,
      error: editApiErr,
      isLoading,
    },
  ] = useEditPersonalInfoMutation();
  const [editData, setEditData] = useState({
    fullName: "",
    userName: "",
  });

  const { fullName, userName } = editData;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !userName) {
      toast.error("Field are required");
    }

    try {
      await editInfo(editData);
    } catch (err) {
      toast.error("Failed while updating");
    }
  };

  useEffect(() => {
    if (editError) {
      toast.error(editApiErr?.editApiData?.message);
    }

    if (editSuccess) {
      toast.success(editApiData?.message);
    }
  }, [editError, editSuccess, editApiData, editApiErr]);

  useEffect(() => {
    if (data) {
      setEditData({
        fullName: data?.fullName || "",
        userName: data?.userName || "",
      });
    }
  }, [data]);

  return (
    <div className="h-[80vh] flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={editData.fullName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            id="userName"
            name="userName"
            label="User Name"
            placeholder="Enter your user name"
            value={editData.userName}
            onChange={handleInputChange}
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
          >
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
