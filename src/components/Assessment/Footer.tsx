import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

type Props = {
  handleSubmit: () => void;
  currentQuestionIdx: number;
  questionsLength: number;
  setCurrentQuestionIdx: (idx: number) => void;
};

const Footer: React.FC<Props> = ({
  handleSubmit,
  currentQuestionIdx,
  questionsLength,
  setCurrentQuestionIdx,
}) => {
  const showPrevious = currentQuestionIdx > 0;
  const showNext = currentQuestionIdx < (questionsLength ?? 0) - 1;
  const showSubmit = currentQuestionIdx + 1 === questionsLength;

  const handleNext = () => {
    const temp = currentQuestionIdx + 1;
    setCurrentQuestionIdx(temp);
  };

  const handlePrevious = () => {
    const temp = currentQuestionIdx - 1;
    setCurrentQuestionIdx(temp);
  };

  return (
    <div
      className="min-w-screen relative flex max-h-[90px] min-h-[90px] items-center px-8"
      style={{ boxShadow: "0px 0px 6px 1px #00000026" }}
    >
      {showPrevious && (
        <button
          className="absolute left-8 rounded-[6px] bg-[#5F6FFF] px-6 py-1 text-white"
          onClick={handlePrevious}
        >
          <span className="text-sm">Previous</span>
        </button>
      )}

      <div className="absolute left-2/4 -translate-x-2/4 rounded-[6px] border border-black p-1">
        <span className="flex items-center text-sm">
          Question {currentQuestionIdx + 1} of {questionsLength}
        </span>
      </div>

      {showNext && (
        <button
          className="absolute right-8 rounded-[6px] bg-[#5F6FFF] px-6 py-1 text-white"
          onClick={handleNext}
        >
          <span className="text-sm">Next</span>
        </button>
      )}

      {showSubmit && (
        <button
          className="absolute right-8 rounded-[6px] bg-green-500 px-6 py-1 text-white"
          onClick={handleSubmit}
        >
          <span className="text-sm">Submit</span>
        </button>
      )}
    </div>
  );
};

export default Footer;
