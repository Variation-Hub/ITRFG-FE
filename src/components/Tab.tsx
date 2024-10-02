import { BsClipboard2Data } from "react-icons/bs";
import { FaCode, FaMicrophone, FaUser } from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const Tab = () => {
  const { pathname } = useLocation();

  const tabs = [
    { path: "/dashboard", icon: <HiSquares2X2 />, label: "Dashboard" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/skills", icon: <FaCode />, label: "Skills" },
    { path: "/assessments", icon: <BsClipboard2Data />, label: "Assessments" },
    {
      path: "/interview/avability",
      icon: <FaMicrophone />,
      label: "Interviews",
    },
  ];

  return (
    <ul className="grid grid-cols-5 rounded-lg bg-gray-100 p-1 text-center text-gray-500">
      {tabs.map((tab, index) => (
        <li key={index} className="sm:col-span-1">
          <Link
            to={tab.path}
            className={`tab-link ${
              tab.path?.includes(pathname?.split("/")[1]) ? "active" : ""
            } flex flex-col items-center justify-center py-2.5`}
          >
            {tab.icon}
            <span className="hidden sm:block">{tab.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
