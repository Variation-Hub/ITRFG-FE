import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import URLs from "@/lib/apis";
import { errorMessage, isPasswordValid } from "@/lib/helpers";
import AuthLayout from "@/components/authLayout";
import InputField from "@/components/InputField";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
    fullname: string | null;
    phone: string | null;
  }>({
    fullname: null,
    phone: null,
    email: null,
    password: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      phone: "",
      fullname: "",
    };

    if(!formData?.fullname || formData?.fullname?.trim()?.length < 3 ){
      newErrors.fullname = "Fullname must be at least 3 characters"
    }

    if(!formData?.phone) {
      newErrors.phone = "Phone number is not valid"
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password =
        "Password must be 4-15 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        setLoading(true);
        const res = await axios.post(URLs.CANDIDATE_LOGIN, formData);
        localStorage.setItem("accessToken", res.data?.data?.accessToken);
        localStorage.setItem("refreshToken", res.data?.data?.refreshToken);
        localStorage.setItem("email", res.data?.data?.email);
        localStorage.setItem("fullName", res.data?.data?.fullName);
        localStorage.setItem("loginStatus", res.data?.status);

        toast.success("Login success");
        navigate("/dashboard");
      } catch (error) {
        // Handle login error
        console.error("Login failed:", error);
        toast.error(errorMessage(error));
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const status = localStorage.getItem("loginStatus");
    if (refreshToken || status) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <AuthLayout>
      <div className="flex h-full max-h-screen items-center justify-center">
        <div className="w-full rounded-lg border bg-white shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Candidate Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 md:space-y-4">
                <InputField
                  label="Your Full Name"
                  name="fullname"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                  error={errors.fullname || ""}
                  type="text"
                />
                <InputField
                  label="Your email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email || ""}
                />
                <InputField
                  label="Your Phone Number"
                  name="phone"
                  placeholder="+xx xxxxx-xxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone || ""}
                  type="number"
                />
                <InputField
                  label="Password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password || ""}
                  type="password"
                />
              </div>
              <div className="my-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <Link
                      to="https://example.com"
                      target={"_blank"}
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="mt-4 w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Sign Up
              </button>
              <p className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
