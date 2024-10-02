import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Calendar from "@/components/Calendar";
import Avability from "@/components/Interview/Avability";
import RootLayout from "@/components/layout";

const Interview = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!type) navigate("/interview/avability");
  }, [type]);

  const handleNavigation = (pageType: string) => {
    navigate(`/interview/${pageType}`);
  };

  return (
    <RootLayout>
      <div className="grid grid-cols-1 gap-y-4 p-8 md:grid-cols-12">
        <div className="col-span-1 md:col-span-4">
          <Calendar />
        </div>

        <div className="col-span-1 flex flex-1 flex-col md:col-span-8">
          <div className="flex gap-4">
            <span
              onClick={() => handleNavigation("avability")}
              className={`interview-tab-item cursor-pointer ${
                type === "avability" ? "active" : ""
              } me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300`}
            >
              Avability
            </span>
            <span
              onClick={() => handleNavigation("upcoming")}
              className={`interview-tab-item cursor-pointer ${
                type === "upcoming" ? "active" : ""
              } me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300`}
            >
              Upcoming Interviews
            </span>
            <span
              onClick={() => handleNavigation("completed")}
              className={`interview-tab-item cursor-pointer ${
                type === "completed" ? "active" : ""
              } me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300`}
            >
              Completed Interviews
            </span>
          </div>

          {type === "avability" && <Avability />}
          {type !== "avability" && <p className="mt-4">No result found</p>}
        </div>
      </div>
    </RootLayout>
  );
};

export default Interview;
