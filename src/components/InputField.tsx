import { useState } from "react";
import { PiEyeLight , PiEyeSlash } from "react-icons/pi";

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error: string | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}> = (
  { label, name, value, error, onChange, placeholder, type = "text", className }
) => {
  const [showPassword, setShowPassword] = useState(false);
  error = error === "undefined" ? undefined : error;

  return (
    <div className={`my-2 relative ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } block w-full rounded-md p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400`}
          placeholder={placeholder}
        />
      )}

      {type === "password" && (
        <div
          className="absolute right-3 top-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <PiEyeLight  /> : <PiEyeSlash />}
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
