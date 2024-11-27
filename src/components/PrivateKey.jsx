import { useEffect, useState } from "react";
import PrivateKeyInput from "./PrivateKeyInput";
import {
  useGetKeyQuery,
  useResetKeyMutation,
  useSetKeyMutation,
} from "../api/endpoints/privateNoteEndpoints";
import { toast } from "react-toastify";

const SetPrivateKey = () => {
  const [
    setKey,
    { data, isSuccess, isError, error, isLoading: setKeyLoading },
  ] = useSetKeyMutation();
  const { data: keyData } = useGetKeyQuery();
  const [
    resetKey,
    {
      data: resetKeyData,
      isSuccess: resetKeySuccess,
      isError: resetKeyError,
      error: resetKeyApiError,
      isLoading: resetKeyLoading,
    },
  ] = useResetKeyMutation();

  const [isOpen, setIsOpen] = useState({
    password: false,
    conformPass: false,
    oldKey: false,
  });
  const [activeForm, setActiveForm] = useState("set");
  const [formData, setFormData] = useState({
    resetPrivateKey: "",
    conformResetKey: "",
    privateKey: "",
    conformKey: "",
    oldKey: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { conformKey, conformResetKey, privateKey, resetPrivateKey, oldKey } =
    formData;

  // Toggle Password Visibility
  const toggleVisibility = (field) => {
    setIsOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate Input
  const validateInput = () => {
    if (activeForm === "set") {
      if (!privateKey || !conformKey) {
        return "Both fields are required.";
      }
      if (privateKey !== conformKey) {
        return "Private keys do not match.";
      }
    } else if (activeForm === "reset") {
      if (!resetPrivateKey || !conformResetKey || !oldKey) {
        return "All fields are required.";
      }
      if (resetPrivateKey !== conformResetKey) {
        return "New private keys do not match.";
      }
    }
    return "";
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    const validationError = validateInput();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      if (activeForm === "set") {
        await setKey(privateKey);
      } else {
        await resetKey({
          oldKey,
          newKey: resetPrivateKey,
          conformKey: conformResetKey,
        });
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Success/Error Notifications for Setting Key
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setFormData({
        conformKey: "",
        privateKey: "",
      });
    } else if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data, error]);

  // Success/Error Notifications for Resetting Key
  useEffect(() => {
    if (resetKeySuccess) {
      toast.success(resetKeyData?.message);
      setFormData({
        conformResetKey: "",
        resetPrivateKey: "",
        oldKey: "",
      });
    } else if (resetKeyError) {
      toast.error(resetKeyApiError?.data?.message);
    }
  }, [resetKeySuccess, resetKeyError, resetKeyData, resetKeyApiError]);

  // Clear Error Messages When Switching Forms
  useEffect(() => {
    setErrorMessage("");
  }, [activeForm]);

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md ">
      {/* Form Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveForm("set")}
          className={`text-lg font-semibold ${
            activeForm === "set" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Set Private Key
        </button>
        <button
          onClick={() => setActiveForm("reset")}
          className={`text-lg font-semibold ${
            activeForm === "reset" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Reset Private Key
        </button>
      </div>

      {/* Conditional Form Rendering */}
      {activeForm === "set" ? (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {keyData?.success ? "You have already set a key" : "Set Key"}
          </h1>
          <form className="space-y-4">
            <PrivateKeyInput
              id="privateKey"
              label="Enter Private Key"
              value={privateKey}
              name="privateKey"
              isOpen={isOpen.password}
              toggleVisibility={() => toggleVisibility("password")}
              onChange={handleChange}
              disabled={keyData?.success}
            />
            <PrivateKeyInput
              name="conformKey"
              id="conformKey"
              label="Conform Private Key"
              value={conformKey}
              isOpen={isOpen.conformPass}
              toggleVisibility={() => toggleVisibility("conformPass")}
              onChange={handleChange}
              disabled={keyData?.success}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <button
              type="button"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
              disabled={keyData?.success || setKeyLoading}
            >
              {setKeyLoading ? "Loading..." : "Save Private Key"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Reset Private Key
          </h1>
          <form className="space-y-4">
            <PrivateKeyInput
              id="oldKey"
              name="oldKey"
              label="Old Key"
              value={oldKey}
              isOpen={isOpen.oldKey}
              toggleVisibility={() => toggleVisibility("oldKey")}
              onChange={handleChange}
            />
            <PrivateKeyInput
              id="resetPrivateKey"
              name="resetPrivateKey"
              label="New Private Key"
              value={resetPrivateKey}
              isOpen={isOpen.password}
              toggleVisibility={() => toggleVisibility("password")}
              onChange={handleChange}
            />
            <PrivateKeyInput
              id="conformResetKey"
              name="conformResetKey"
              label="Conform New Private Key"
              value={conformResetKey}
              isOpen={isOpen.conformPass}
              toggleVisibility={() => toggleVisibility("conformPass")}
              onChange={handleChange}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <button
              type="button"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
              disabled={resetKeyLoading}
            >
              {resetKeyLoading ? "Loading..." : "Reset Private Key"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SetPrivateKey;
