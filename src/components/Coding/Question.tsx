import React from "react";

interface QuestionDisplayProps {
  question: string;
  testCases: {
    input: any;
    expected_output: any;
  }[];
  explanations: string;
  constraints: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  testCases,
  explanations,
  constraints,
}) => {
  return (
    <div
      className="question-container coding-scrollbar h-full overflow-y-auto border-r border-gray-300 p-4"
      style={{ maxWidth: "40vw" }}
    >
      <h1 className="mb-4 text-xl font-semibold">Question</h1>
      <div className="mb-4">
        <p className="text-sm">{question}</p>
      </div>
      <h1 className="mt-4 text-xl font-semibold">Test Cases</h1>
      <div className="mb-2">
        {testCases.map((testCase, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm">
              Test Case {index + 1}: {JSON.stringify(testCase.input)} <br />
              Expected Output: {JSON.stringify(testCase.expected_output)}
            </p>
          </div>
        ))}
      </div>
      {explanations && (
        <div>
          <h1 className="mb-2 mt-4 text-xl font-semibold">Explanations</h1>
          <p className="text-sm">{explanations}</p>
        </div>
      )}

      {constraints && (
        <div>
          <h1 className="mb-2 mt-4 text-xl font-semibold">Constraints</h1>
          <p className="text-sm">{constraints}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
