import React from "react";
import { useNavigate } from "react-router-dom";

const SkillBody = ({ skill, difficulty, onDelete }: any) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(skill);
  };

  const startExam = (skill: string, difficulty: string) => {
    navigate(`/assessment/0`, {
      state: {
        skill: skill,
        level: difficulty,
      },
    });
  };

  return (
    <div className="mb-2 flex items-center justify-between rounded border p-2">
      <div>
        <p className="text-lg font-semibold">{skill}</p>
        <p>Level: {difficulty}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
          onClick={() => startExam(skill, difficulty)}
        >
          Start Exam
        </button>

        <button
          onClick={handleDelete}
          className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SkillBody;
