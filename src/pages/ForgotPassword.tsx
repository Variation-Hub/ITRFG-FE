import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/components/authLayout";
import InputField from "@/components/InputField";
import { errorMessage } from "@/lib/helpers";
import toast from "react-hot-toast";
import axios from "axios";
import URLs from "@/lib/apis";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let tempError;
    if (!email) {
      tempError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempError = "Email is not valid";
    }
    if (tempError) {
      setError(tempError);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(URLs.FORGOT_PASSWORD, { email });
      if(res.data?.error){
        toast.error(res.data?.message)
      }else {
        toast.success("We have sent a reset link to your mail address")
      }
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
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 md:space-y-4">
                <InputField
                  label="Your email"
                  name="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error || ""}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                { loading ? "Processing..." : "Submit" }
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

export default ForgotPassword;
