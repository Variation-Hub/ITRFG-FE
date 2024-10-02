// MainApp.tsx
import React, { useState } from "react";
import axiosInstance from "@/services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import URLs from "@/lib/apis";
import Header from "../Assessment/Header";
import CodeEditor from "./CodeEditor";
import InputModal from "./InputModal";
import Question from "./Question";

type CodingProps = {
  questions: {
    id: string;
    question: string;
    test_cases: any[];
    explanation: string;
    constraints: string;
  }[];
  examId: string;
};

const Coding: React.FC<CodingProps> = ({ questions, examId }) => {
  const [code, setCode] = useState(
    questions?.map((qs) => ({
      questionId: qs.id,
      sourceCode: "// Start writing your code from here",
      input: qs.test_cases[0].input ?? "",
      expectedOutput: qs.test_cases[0].expected_output ?? "",
    }))
  );
  const [stopTimer, setStopTimer] = useState(false);
  const [inputModal, setShowInputModal] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(URLs.CANDIDATE_ANSWER_CHECK_CODING, {
        examId: examId,
        questionCoding: code,
        languageId: 63,
      });
      localStorage.removeItem("itrfg");
      navigate("/dashboard");
      toast.success("Your have successfully completed your assessment");
      // console.log(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeChange = (newCode: string, index: number) => {
    setCode((prev) =>
      prev.map((prevC, idx) => {
        let cd = prevC.sourceCode;
        if (idx === index) cd = newCode;
        return { ...prevC, sourceCode: cd };
      })
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <Header
        skill={{ name: examId + "Coding", time: 20 }}
        title="Coding"
        handleSubmit={handleSubmit}
        stopTimer={stopTimer}
        nextQuestion={
          currentQuestionIdx === 0 ? () => setCurrentQuestionIdx(1) : null
        }
        finalSubmission={
          currentQuestionIdx === 1
            ? {
                handleSubmit: handleSubmit,
                prevQuestion: () => setCurrentQuestionIdx(0),
              }
            : null
        }
      />

      <div className="flex flex-1 overflow-hidden rounded border px-4 shadow">
        <div
          className={`input-modal-div ${inputModal ? "active" : ""}`}
          style={{ maxWidth: "40vw" }}
        >
          {inputModal && (
            <InputModal
              closeWindow={() => setShowInputModal(false)}
              code={code[currentQuestionIdx]?.sourceCode}
            />
          )}
        </div>
        {!inputModal && (
          <Question
            question={questions[currentQuestionIdx]?.question}
            testCases={questions[currentQuestionIdx]?.test_cases}
            explanations={questions[currentQuestionIdx]?.explanation}
            constraints={questions[currentQuestionIdx]?.constraints}
          />
        )}
        <CodeEditor
          code={code[currentQuestionIdx]?.sourceCode}
          onCodeChange={(cd) => handleCodeChange(cd, currentQuestionIdx)}
        />
        <button
          onClick={() => setShowInputModal(true)}
          className="absolute bottom-5 right-10 ml-auto rounded-lg bg-blue-500 px-4 py-1 text-xs text-white"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Coding;
