import React from "react";

import Timer from "./Timer";

type Props = {
  goToNextSection: () => void;
  level: string;
};

const Instructions: React.FC<Props> = ({ goToNextSection, level }) => {
  return (
    <div className="container mx-auto flex h-screen flex-col">
      <div className="my-4">
        <p className="text-2xl font-semibold text-[#5F6FFF]">
          ITRFG - Assessment
        </p>
      </div>

      <div className="flex space-x-4">
        <p>Skill: JavaScript</p>
        <p>Level: {level}</p>
      </div>
      <div className="mt-12 flex flex-1 justify-center px-8">
        <div className="mr-8 flex-1 border-r border-slate-300">
          <div>
            <p className="text-2xl font-semibold">Instructions:</p>

            <p className="w-4/5 py-2 text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="w-4/5 py-2 text-[#424242]">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. ficia deserunt mollit
              anim id est laborum.
            </p>
            <p className="w-4/5 py-2 text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="w-4/5 py-2 text-[#424242]">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. ficia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="border border-[#D7D7D7] p-4 text-center">
            <p className="font-medium">Please wait before proceeding:</p>
            <p className="text-3xl font-semibold">
              <Timer
                startTime={120}
                sectionName={"Instructions"}
                handleSubmit={goToNextSection}
              />
            </p>
          </div>

          <button
            className="mt-4 self-center rounded bg-blue-400 px-3 py-1 text-white hover:bg-blue-500"
            onClick={goToNextSection}
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
