import { Eye, EyeClosed } from "lucide-react";

const PrivateKeyInput = ({
  id,
  label,
  value,
  onChange,
  isOpen,
  toggleVisibility,
  name,
  disabled,
}) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-gray-700 font-medium">
        {label}
      </label>
      <input
        disabled={disabled}
        id={id}
        type={`${isOpen ? "text" : "password"}`}
        value={value}
        onChange={onChange}
        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={label}
        name={name}
      />
      <div
        onClick={toggleVisibility}
        className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
      >
        {isOpen ? <EyeClosed /> : <Eye />}
      </div>
    </div>
  );
};

export default PrivateKeyInput;
