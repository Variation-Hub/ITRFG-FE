import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import URLs from "@/lib/apis";
import RootLayout from "@/components/layout";

const Assessments = () => {
  const [assessments, setAssessments] = useState<[]>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAssessmentAttempt = (skill: string, level: string) => {
    setLoading(true);
    navigate(`/assessment/0`, {
      state: {
        skill: skill,
        level: level,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          URLs.CANDIDATE_PREVIOUS_ASSESSMENTS
        );
        setAssessments([
          ...res.data?.data?.assessments,
          {
            _id: "alsjbxuasbx",
            skill: "React",
            finalMarks: "30",
            level: "asnxiasnx",
            result: "fail",
          },
        ] as any);
      } catch (error) {
        toast.error("Something went wrong, Please refresh your page");
      }
    };

    fetchData();
  }, []);

  return (
    <RootLayout>
      <div className="m-8">
        <h1 className="text-xl">Previous Assessments</h1>
        {loading && <div className="loading"></div>}
        <div className="overflow-x-auto">
          <>
            <div className="flex justify-end bg-white  pb-2 dark:bg-gray-900">
              <div className="relative mt-1">
                <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 z-50 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block w-80 rounded-lg border border-gray-300 bg-gray-50 py-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search for skill"
                />
              </div>
            </div>
          </>
          <table className="mt-6 min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Sr.No.
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Skill
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Level
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Score
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Result
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {assessments?.map((item: any, index) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="whitespace-no-wrap px-6 py-4">{index + 1}</td>
                  <td className="whitespace-no-wrap px-6 py-4">{item.skill}</td>
                  <td className="whitespace-no-wrap px-6 py-4">
                    <span>{item.level}</span>
                  </td>
                  <td className="whitespace-no-wrap px-6 py-4">
                    {item.finalMarks}
                  </td>
                  <td className="whitespace-no-wrap px-6 py-4">
                    {item?.result?.toLowerCase() === "fail" ? (
                      <span className="me-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                        FAIL
                      </span>
                    ) : (
                      <span className="me-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        PASS
                      </span>
                    )}
                  </td>
                  <td className="whitespace-no-wrap flex cursor-pointer gap-4 px-6 py-4">
                    <span
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() =>
                        handleAssessmentAttempt(item.skill, item.level)
                      }
                    >
                      Attempt Again
                    </span>
                    {/* <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline"  onClick={() => handleAssessmentAttempt(item.skill, item.level)}>Previous Score</span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="my-4 flex w-full justify-center">
            <nav aria-label="Page navigation example">
              <ul className="flex h-10 items-center -space-x-px text-base">
                <li>
                  <a
                    href="#"
                    className="ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-3 w-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex h-10 items-center justify-center border border-blue-300 bg-blue-50 px-4 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-3 w-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Assessments;
