import axios from "axios";

import { RegisterForm } from "@/types/register";
import URLs from "@/lib/apis";

export const RegisterCandidate = async (formData: RegisterForm) => {
  try {
    const res = await axios.post(URLs.CANDIDATE_REGISTER, formData);
    localStorage.setItem("accessToken", res.data?.data?.accessToken);
    localStorage.setItem("refreshToken", res.data?.data?.refreshToken);
    localStorage.setItem("email", res.data?.data?.email);
    localStorage.setItem("fullName", res.data?.data?.fullName);
    localStorage.setItem("userType", res.data?.data?.userType);
    localStorage.setItem("loginStatus", res.data?.status);

    localStorage.removeItem("step");
    return res;
  } catch (error) {
    throw error;
  }
};
