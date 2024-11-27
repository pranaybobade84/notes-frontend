import { useEffect, useState } from "react";
import PrivateKeyInput from "./PrivateKeyInput";
import { useVerifyKeyMutation } from "../api/endpoints/privateNoteEndpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isKeyVerified } from "../store/slices/privateNoteKeySlice";

const PrivateNoteAccessLogin = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyKey, { data, isError, isSuccess, error: errMsg, isLoading }] =
    useVerifyKeyMutation();
  const toggleVisibility = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setPrivateKey(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!privateKey.trim()) {
      setError("Private key is required");
      return;
    }

    try {
      await verifyKey({ privateKey });
    } catch (err) {
      toast.error("Error while verifying");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      dispatch(
        isKeyVerified({
          isVerified: data?.success,
        })
      );
      navigate("/private-notes");
    }

    if (isError) {
      toast.error(errMsg?.data?.message);
    }
  }, [isError, isSuccess, data, errMsg, dispatch, navigate]);
  return (
    <div className="p-6 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md  ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Access Private Notes
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PrivateKeyInput
          id="privateKey"
          label="Enter Private Key"
          value={privateKey}
          isOpen={isOpen}
          toggleVisibility={toggleVisibility}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PrivateNoteAccessLogin;
