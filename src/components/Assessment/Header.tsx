import React from "react";
import { AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

import Timer from "./Timer";

type HeaderProps = {
  skill: any;
  stopTimer?: boolean;
  handleSubmit: () => void;
  nextQuestion?: any;
  finalSubmission?: any;
  title?: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  skill,
  stopTimer,
  handleSubmit,
  nextQuestion,
  finalSubmission,
}) => {
  return (
    <>
      <div
        className="relative flex max-h-[70px] min-h-[70px] w-full items-center justify-between px-8"
        style={{ boxShadow: "0px 0px 6px 1px #00000026" }}
      >
        <div>
          <p className="font-medium">Skill : {title}</p>
        </div>

        {skill?.time && (
          <div className="absolute left-2/4 -translate-x-2/4">
            <div className="flex items-center">
              <AiOutlineClockCircle />
              <Timer
                startTime={skill?.time * 60}
                handleSubmit={handleSubmit}
                sectionName={skill?.name}
                stopTimer={stopTimer}
              />
            </div>
          </div>
        )}

        {nextQuestion ? (
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-400"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        ) : finalSubmission ? (
          <div className="space-x-2">
            <button
              className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-400"
              onClick={finalSubmission.prevQuestion}
            >
              Previous
            </button>
            <button
              className="rounded bg-green-500 px-4 py-1 text-white hover:bg-green-400"
              onClick={finalSubmission.handleSubmit}
            >
              Final Submission
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <MdOutlineReportGmailerrorred />
              <span className="mt-1 text-sm text-[#828282]">Report</span>
            </div>

            <div className="flex flex-col items-center">
              <AiOutlineMore />
              <span className="mt-1 text-sm text-[#828282]">More</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
