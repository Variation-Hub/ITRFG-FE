import { RegisterForm } from "@/types/register";
import InputField from "../InputField";

const PersonalInfo: React.FC<{
  formData: Partial<RegisterForm>;
  errors: Partial<RegisterForm>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}> = ({ formData, errors, handleChange }) => {
  return (
    <>
      <p className="mb-2 text-lg font-semibold text-[#B60000]">
        Personal Info:
      </p>{" "}
      <hr className="mb-4" />
      <div className="flex flex-row">
        <div className="mb-6 w-1/2">
          <label className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            DOB:
          </label>
          <input
            type="date"
            id="form-date"
            className="block w-full max-w-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />

          <label className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            Nationality:
          </label>
          <input
            placeholder="Nationality"
            type="text"
            id="form-date"
            className="block w-full max-w-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />

          <label className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
            Current Location:
          </label>
          <input
            placeholder="Current Location"
            type="text"
            id="form-date"
            className="block w-full max-w-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />

          <div className="mt-2 flex w-3/4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Country Code
              </label>
              <input
                placeholder="+91"
                type="number"
                id="form-date"
                className="block w-full max-w-3/4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                placeholder="xxxxxxxxxx"
                type="number"
                id="form-date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mt-2 max-w-3/4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Summary
            </label>
            <textarea
              placeholder="Brief Info"
              id="form-date"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="mt-3 max-w-3/4">
            <InputField
              label="Destination Country"
              name="destinationCountry"
              value={formData?.destinationCountry || ""}
              onChange={handleChange}
              placeholder="Destination Country"
              error={String(
                errors?.destinationCountry ? errors?.destinationCountry : ""
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
