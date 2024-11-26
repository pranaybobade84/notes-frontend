import { useEffect, useState } from "react";
import Input from "./Input";
import { useResetPasswordMutation } from "../api/endpoints/userEndPoints";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [FormData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    conformPassword: "",
  });

  const { conformPassword, newPassword, oldPassword } = FormData;
  const [resetPassword, { data, isLoading, error, isError, isSuccess }] =
    useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !conformPassword || !newPassword) {
      toast.error("All fields are required");
    }
    // Check if new password and confirm password match
    if (newPassword !== conformPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await resetPassword(FormData).unwrap();
    } catch (err) {
      toast.error("Failed while reseting password");
    }
  };
  console.log(FormData);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setFormData({
        conformPassword: "",
        newPassword: "",
        oldPassword: "",
      });
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, isSuccess, data, error]);

  return (
    <div className=" flex items-center justify-center h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type={"password"}
            name={"oldPassword"}
            id={"oldPassword"}
            label={"Old Password"}
            onChange={onChange}
            placeholder={"Old Password"}
            value={FormData.oldPassword}
            required={true}
          />
          <Input
            type={"password"}
            name={"newPassword"}
            id={"newPassword"}
            onChange={onChange}
            placeholder={"New Password"}
            value={FormData.newPassword}
            required={true}
            label={"New Password"}
          />
          <Input
            type={"password"}
            name={"conformPassword"}
            onChange={onChange}
            placeholder={"Conform Password"}
            value={FormData.conformPassword}
            required={true}
            id={"conformPassword"}
            label={"Conform New Password"}
          />

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
