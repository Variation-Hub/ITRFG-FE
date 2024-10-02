import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import toast from "react-hot-toast";

import { RegisterForm } from "@/types/register";
import URLs from "@/lib/apis";
import RootLayout from "@/components/layout";
import EducationInfo from "@/components/Profile/EducationInfo";
import EmploymentInfo from "@/components/Profile/EmploymentInfo";
import PersonalInfo from "@/components/Profile/PersonalInfo";

const Profile = () => {
  const [formData, setFormData] = useState<Partial<RegisterForm>>({
    fullName: "John Doe",
    displayName: "johndoe123",
    email: "johndoe@example.com",
    password: "abcd",
    dob: "1990-01-01",
    nationality: "United States",
    currentLocation: "New York",
    countryCode: "US",
    phoneNumber: "1234567890",
    referralCode: "REF123",
    summary: "Experienced software developer",
    skills: [
      { skill: "JavaScript", level: "Advanced" },
      { skill: "React", level: "Intermediate" },
    ],
    education: [
      {
        field: "Computer Science",
        yearOfPassing: "2015",
        university: "XYZ University",
        duration: "4 years",
      },
    ],
    certifications: [
      {
        certificationName: "Web Developer Certification",
        certificationYear: "2018",
      },
    ],
    previousEmploymentDetail: [
      {
        serviceLength: { years: "3", months: "6" },
        designation: "Software Engineer",
        organisationName: "ABC Inc.",
        description: "Worked on web development projects",
        referenceDetails: {
          name: "John Smith",
          phoneNumber: "9876543210",
          companyEmail: "john@abc.com",
        },
      },
    ],
    currentEmployment: {
      organisationName: "XYZ Corp",
      designation: "Senior Software Engineer",
      description: "Leading a development team",
      workingSince: { years: "2", months: "0" },
      jobType: "Full-time",
    },
    currentlyWorking: true,
    destinationCountry: "Canada",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(URLs.CANDIDATE_REGISTER);
        setFormData(res.data?.data);
        localStorage.setItem(
          "userskills",
          JSON.stringify(res.data?.data?.skills)
        );
      } catch (error) {
        toast.error("Something went wrong, Please refresh your page");
      }
    };

    // fetchData();
  }, []);

  const errors: any = {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("idk", e);
  };

  return (
    <RootLayout>
      <div className="profile-container w-full p-4">
        <div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-row items-center space-x-4">
              <img
                src="/images/profile.png"
                alt="profile"
                height="100px"
                width="100px"
              />
              <div>
                <input
                  type="text"
                  value={formData?.fullName || ""}
                  className="rounded-md border-0 border-slate-400 px-2 py-1 text-xl font-semibold outline-slate-500"
                />
                <br /> <span className="text-slate-400">{formData?.email}</span>
              </div>
            </div>

            <div className="flex flex-1 flex-row items-center justify-between space-x-1">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="h-18 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload Resume/CV</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF/DOCS (MAX 2MB.)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="h-18 dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload Cover letter</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF/DOCS (MAX 2MB.)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <PersonalInfo
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
            <EducationInfo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
            <EmploymentInfo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
