import { useEffect, useState } from "react";
import Input from "./Input";
import { useDeleteAccountMutation } from "../api/endpoints/userEndPoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [deleteAccount, { data, isError, isLoading, isSuccess, error }] =
    useDeleteAccountMutation();
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    try {
      await deleteAccount({ password });
    } catch (err) {
      toast.error("Error While deleting");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/sign-in");
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, isSuccess, data, error]);

  return (
    <div className="h-[80vh] flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
          Delete Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          This action cannot be undone. To confirm, type{" "}
          <strong>Your password</strong> in the box below.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="deleteConfirmation"
            name="deleteConfirmation"
            label="Confirm Deletion"
            placeholder="Type Your Password to confirm"
            value={password}
            onChange={handleInputChange}
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
          >
            {isLoading ? "Loading.." : "Delete Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
