import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi"; // Import the cross icon from react-icons

import { RegisterForm } from "@/types/register";
import { errorMessage } from "@/lib/helpers";

type Props = {
  errors: Partial<RegisterForm>;
  formData: RegisterForm;
  setFormData: (data: RegisterForm) => void;
};

type skillType = {
  skill: string;
  level: string;
};

const levels = [
  "Entry level(0)",
  "Trainee (>=6months)",
  "Foundation(>=2years)",
  "Mid-Level(>=5years)",
  "Consultant(>=7.5years)",
  "Sr. Consultant(>=10years)",
  "SME-Expert(>=15years)",
];

const SkillExtraction: React.FC<Props> = ({
  errors,
  setFormData,
  formData,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<skillType[]>(
    formData?.skills?.length > 0 ? formData?.skills : []
  );
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || file.type !== "application/pdf")
      return toast.error("Please select a valid pdf file");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post(
        "https://ecd2-2409-4064-6e01-73e0-45f2-e0fc-300-82fa.ngrok-free.app/extract_skills",
        data
      );

      let skills: any = JSON.parse(res.data.skill);
      skills = skills[0].skills;

      const skillObj = skills.reduce((acc: skillType[], item: string) => {
        acc.push({ skill: item, level: levels[0] });
        return acc;
      }, []);
      setSelectedExperience(skillObj);
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceChange = (skillName: string, newLevel: string) => {
    setSelectedExperience((prevSkills) =>
      prevSkills.map((skill) => {
        if (skill.skill === skillName) {
          return { ...skill, level: newLevel };
        }
        return skill;
      })
    );

    const tempData = { ...formData, skills: selectedExperience };
    setFormData(tempData);
    localStorage.setItem("formData", JSON.stringify(tempData));
  };

  const handleRemoveSkill = (index: number) => {
    const updatedExperience = [...selectedExperience];
    updatedExperience.splice(index, 1);
    setSelectedExperience(updatedExperience);
  };

  const error = errors.skills ? errors.skills[0].skill : null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">
        Please select your resume (pdf file max 2MB.)
      </label>
      <input
        type="file"
        onChange={handleFileUpload}
        className={`border p-2 ${
          error ? "border-red-500" : "border-gray-300"
        } w-full rounded`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {loading && <p>Loading skills...</p>}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {selectedExperience.map((skill, index) => (
          <div
            key={index}
            className="mb-2 flex items-center rounded border p-2"
          >
            <span className="mr-2">{skill.skill}</span>
            <select
              value={skill.level}
              onChange={(e) =>
                handleExperienceChange(skill.skill, e.target.value)
              }
              className="ml-auto mr-0 rounded border p-1"
            >
              {levels?.map((level) => <option value={level}>{level}</option>)}
            </select>
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-auto text-red-500"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillExtraction;
