import { Link } from "react-router-dom";

import { RegisterForm } from "@/types/register";
import InputField from "../InputField";

const Step1: React.FC<{
  formData: RegisterForm;
  errors: Partial<RegisterForm>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  nextStep: () => void;
}> = ({ formData, errors, handleChange, nextStep }) => {
  return (
    <div className="mt-6 space-y-4">
      <InputField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        error={errors.fullName}
        onChange={handleChange}
        placeholder="John Doe"
      />
      <InputField
        label="Email"
        name="email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />
      <InputField
        label="Create Password"
        name="password"
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        placeholder="********"
        type="password"
      />
      <InputField
        label="Date of Birth"
        name="dob"
        value={formData.dob}
        error={errors.dob}
        onChange={handleChange}
        type="date"
      />
      <InputField
        label="Nationality"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        placeholder="Your nationality"
        error={errors.nationality}
      />
      <InputField
        label="Current Location"
        name="currentLocation"
        value={formData.currentLocation}
        onChange={handleChange}
        placeholder="Your current location"
        error={errors.currentLocation}
      />
      <div className="flex">
        <div className="w-1/3">
          <label
            htmlFor="countryCode"
            className="block text-sm font-medium text-gray-600"
          >
            Country Code
          </label>
          <input
            type="text"
            name="countryCode"
            id="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className={`border outline-none ${
              errors.countryCode ? "border-red-500" : "border-gray-300"
            } block w-full rounded-md p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            placeholder="+91"
          />
          {errors.countryCode && (
            <p className="mt-2 text-sm text-red-600">{errors.countryCode}</p>
          )}
        </div>
        <div className="w-2/3 pl-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Contact Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`border outline-none ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } block w-full rounded-md p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            placeholder="Your contact number"
          />
          {errors.phoneNumber && (
            <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      <InputField
        label="Summary"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        placeholder="Write a brief summary about self"
        error={errors.summary}
        type="textarea"
      />
      <InputField
        label="Referral Code"
        name="referralCode"
        value={formData.referralCode}
        onChange={handleChange}
        placeholder="Please enter referral code"
        error={errors.referralCode}
      />
      <button
        onClick={nextStep}
        className="group relative flex w-full items-center justify-center border border-slate-300 px-4 py-2 hover:bg-black hover:text-white"
      >
        Next
      </button>
      <p className="ml-auto text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Step1;
