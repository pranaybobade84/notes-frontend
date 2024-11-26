import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useRegisterApiMutation } from "../../../api/endpoints/authEndPoints";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [Register, { isError, isSuccess, isLoading, data, error: apiError }] =
    useRegisterApiMutation();

  console.log("apierr", apiError);
  const { userName, fullName, email, password } = formData;
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    // Handle signup logic here (e.g., API call)
    try {
      await Register(formData);
    } catch (error) {
      toast.error("Error while registering");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/sign-in");
    }

    if (isError) {
      toast.error(apiError?.data?.message);
    }

    setFormData({
      email: "",
      fullName: "",
      password: "",
      userName: "",
    });
  }, [isError, isSuccess, data, apiError, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-[95vh] px-5">
        <div className="bg-white px-8 py-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="userName"
                name="userName"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="User Name"
                value={userName}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="fullName"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Full Name"
                value={fullName}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-teal-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
