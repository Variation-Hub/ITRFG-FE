import React from "react";

type Props = {
  question: {
    question: string;
    type: string;
    options: string[];
    id: string;
  };
  questionNumber: number;
  handleUserAnswer: (questionId: string, option: string) => void;
  userAnswers: {
    [questionId: string]: {
      questionId: string;
      selectedOption: string;
    };
  };
};

const Question: React.FC<Props> = ({
  question,
  handleUserAnswer,
  userAnswers,
  questionNumber,
}) => {
  return (
    <div className="min-w-[50%] max-w-[50%] overflow-y-auto px-4 py-10">
      <div>
        <div className="flex h-full w-full flex-col justify-center px-4">
          <div className="my-4 flex items-center justify-start space-x-4">
            <div className="py-2/4 rounded-[4px] bg-black px-2 text-center text-white">
              <span className="text-sm">{questionNumber}</span>
            </div>

            <p className="w-[80%] py-2 text-xl font-semibold">
              {question.question}
            </p>
          </div>

          {!!question.options.length &&
            question.options.map((option, idx) => {
              const isSelected =
                userAnswers[question.id]?.selectedOption?.includes(option);

              return (
                <div
                  className={`border border-[#D7D7D7] ${
                    isSelected ? "bg-blue-200" : ""
                  } mb-4 flex cursor-pointer items-center space-x-4 rounded-[4px] px-4  py-2 hover:border-black`}
                  key={option}
                  onClick={() => handleUserAnswer(question.id, option)}
                >
                  <div
                    className={`shrink-0 border ${
                      question.type === "mcq" ? "rounded-md" : "rounded-full"
                    } flex h-[30px] w-[30px] items-center justify-center border-[#1E1E1E] text-sm`}
                  >
                    {String.fromCharCode(idx + 65)}
                  </div>
                  <div className="font-medium">{option}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Question;
