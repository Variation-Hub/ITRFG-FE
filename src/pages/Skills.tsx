import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import DeleteConfirmation from "@/components/DeleteConfirmation";
import RootLayout from "@/components/layout";
import AddSkillModal from "@/components/Skills/AddSkillModal";
import SkillBody from "@/components/Skills/SkillBody";

const Skills = () => {
  const [skills, setSkills] = useState<any>(
    localStorage.getItem("userskills")
      ? JSON.parse(localStorage.getItem("userskills") as any)
      : [
          { skill: "Javascript", level: "High" },
          { skill: "SQL", level: "Medium" },
          { skill: "Java", level: "Low" },
          { skill: "PHP", level: "Low" },
        ]
  );

  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newDifficulty, setNewDifficulty] = useState("Low");
  const [deleteSkill,setDeleteSkill] = useState(null);

  const handleAddSkill = () => {
    setIsAddingSkill(true);
  };

  const handleSkillSubmit = () => {
    const temp = [...skills, { skill: newSkill, difficulty: newDifficulty }];
    setSkills(temp);
    setIsAddingSkill(false);
    localStorage.setItem("userskills", JSON.stringify(temp));
  };

  const handleDeleteSkill = (skill: string) => {
    const temp = skills?.filter((s: any) => s.skill !== skill);
    setSkills(temp);
    localStorage.setItem("userskills", JSON.stringify(temp));
  };

  return (
    <RootLayout>
      <div
        className={`flex w-full flex-col p-4 ${
          isAddingSkill ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex">
          <button
            onClick={handleAddSkill}
            type="button"
            className="ml-auto mr-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Skill
          </button>
        </div>
        <div
          className="grid grid-cols-1 justify-center gap-4 md:grid-cols-3"
          style={{ width: "80vw" }}
        >
          {skills.map((skillData: any, index: number) => (
            <div className="relative rounded-lg bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 dark:bg-gray-800">
              <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                {skillData?.skill}
              </h3>
              <div className="absolute right-0 top-0 flex cursor-pointer gap-2 p-3">
                <FiEdit
                  size={22}
                  className="text-indigo-500 hover:text-indigo-600"
                />
                <RxCross2
                  size={25}
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setDeleteSkill(skillData?.skill)}
                />
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Level: Foundation (2+ years)
              </p>

              <div className="mt-4 flex">
                <span className="cursor-pointer rounded-lg bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-600">
                  Start Assessment
                </span>
              </div>
            </div>
          ))}
        </div>
        {deleteSkill && (
          <DeleteConfirmation
            handleDelete={(del: boolean) => {
              setDeleteSkill(null);
            }}
          />
        )}
        {isAddingSkill && <AddSkillModal handleClose={() => setIsAddingSkill(false)}/> }
      </div>
    </RootLayout>
  );
};

export default Skills;
