import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginApiMutation } from "../../../api/endpoints/authEndPoints";
import { useDispatch } from "react-redux";
import { setCredientials } from "../../../store/slices/authSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usernameOrEmail, password } = formData;
  const [error, setError] = useState("");
  const [Login, { isError, isLoading, isSuccess, data, error: loginApiErr }] =
    useLoginApiMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful! 🎉");
      dispatch(
        setCredientials({
          accessToken: data?.data?.accessToken,
          refreshToken: data?.data?.refreshToken,
          user: data?.data,
        })
      );
      navigate("/home");
      setFormData({
        usernameOrEmail: "",
        password: "",
      });
    }

    if (isError) {
      const errorMessage = loginApiErr?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
  }, [isSuccess, navigate, data, loginApiErr, isError, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    try {
      await Login({ usernameOrEmail, password });
    } catch (err) {
      toast.error("An error occurred during login.");
    }
  };

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[90vh] px-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Sign In
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username or email"
                value={usernameOrEmail}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
