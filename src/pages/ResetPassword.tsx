import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { errorMessage, isPasswordValid } from "@/lib/helpers";
import AuthLayout from "@/components/authLayout";
import InputField from "@/components/InputField";
import axios from "axios";
import URLs from "@/lib/apis";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password1: "",
    password2: "",
  });
  const [error, setError] = useState({
    password1: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      password1: "",
      password2: "",
    };

    if (!values.password1) {
      newErrors.password1 = "Password is required";
    } else if (!isPasswordValid(values.password1)) {
      newErrors.password2 =
        "Password must be 4-15 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    if (!values.password1 || values.password1 !== values.password2) {
      newErrors.password2 = "Passwords donot match";
    }

    setError(newErrors);
    return !newErrors.password1 && !newErrors.password2;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true)
      const res = await axios.post(URLs.RESET_PASSWORD, { password: values.password1 })
    } catch (error) {
      toast.error(errorMessage(error))  
    } finally { 
      setLoading(false);
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
              Reset Password
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 md:space-y-4">
                <InputField
                  label="Enter New Password"
                  name="password"
                  placeholder="********"
                  value={values.password1}
                  onChange={(e) =>
                    setValues({ ...values, password1: e.target.value })
                  }
                  error={error.password1 || ""}
                  type="password"
                />
                <InputField
                  label="Confirm New Password"
                  name="password"
                  placeholder="********"
                  value={values.password2}
                  onChange={(e) =>
                    setValues({ ...values, password2: e.target.value })
                  }
                  error={error.password2 || ""}
                  type="password"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Submit
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

export default ResetPassword;
