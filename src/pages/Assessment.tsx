import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { useLocation, useNavigate } from "react-router-dom";

import URLs from "@/lib/apis";
import Break from "@/components/Assessment/Break";
import Footer from "@/components/Assessment/Footer";
import Header from "@/components/Assessment/Header";
import Instructions from "@/components/Assessment/Instructions";
import Question from "@/components/Assessment/Question";
import Coding from "@/components/Coding";

const SCREENS = {
  INSTRUCTIONS: "INSTRUCTIONS",
  EXAM: "EXAM",
  BREAK: "BREAK",
  CODING: "CODING",
};

const Assessment = () => {
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [codingQuestions, setCodingQuestions] = useState<any>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [examId, setExamId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [stopTimer, setStopTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const [screen, setScreen] = useState(SCREENS.INSTRUCTIONS); // exam and break

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const { skill, level } = location?.state;

  useEffect(() => {
    if (!skill || !level) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.post(URLs.CANDIDATE__MCQ_EXAMPLE, {
          skill: skill,
          level: level,
        });
        setQuestions(JSON.parse(res.data?.data?.question.questionMcq[0]));
        setExamId(res.data?.data?.examId);
        setQuestionId(res.data?.data?.question?._id);
        fetchCodingQuestions(res.data?.data?.question?._id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // useEffect(() => {
  //   if(screen !== SCREENS.BREAK || codingQuestions?.length > 0) return;

  //   fetchCodingQuestions();
  // }, [screen]);

  const fetchCodingQuestions = async (quesId: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(URLs.CANDIDATE_CODING_EXAMPLE, {
        skill: "Javascript",
        level: "Expert",
        questionId: quesId,
      });
      setCodingQuestions(JSON.parse(res.data?.data?.questionCoding[0]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAnswers = (questionId: string, optionId: string) => {
    const temp = {
      questionId: questionId,
      selectedOption: optionId,
    };

    setUserAnswers({
      ...userAnswers,
      [questionId]: temp,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(URLs.CANDIDATE_ANSWER_CHECK, {
        examId: examId,
        questionMcq: Object.values(userAnswers),
      });

      setScreen(SCREENS.BREAK);
      // console.log(res?.data)
    } catch (error) {
      console.log(error);
    }

    // localStorage.removeItem('itrfg');
  };

  if (screen === SCREENS.INSTRUCTIONS) {
    return (
      <Instructions
        goToNextSection={() => setScreen(SCREENS.EXAM)}
        level={level}
      />
    );
  }

  if (screen === SCREENS.BREAK) {
    return (
      <Break title={examId} goToNextSection={() => setScreen(SCREENS.CODING)} />
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <span className="loader"></span>
        <span className="mt-2 text-sm">
          Please wait while we generate questions
        </span>
      </div>
    );
  }

  if (screen === SCREENS.CODING) {
    console.log("coding question", codingQuestions);
    return <Coding questions={codingQuestions} examId={examId} />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        title={skill || "MCQ"}
        skill={{ name: examId + "MCQ", time: 10 }}
        handleSubmit={handleSubmit}
        stopTimer={stopTimer}
      />

      <div className="flex h-full w-full flex-1 items-center justify-center overflow-hidden">
        {!!questions?.length && (
          <Question
            question={questions[currentQuestionIdx]}
            questionNumber={currentQuestionIdx + 1}
            handleUserAnswer={handleUserAnswers}
            userAnswers={userAnswers}
          />
        )}
      </div>
      <Footer
        handleSubmit={handleSubmit}
        questionsLength={questions?.length}
        currentQuestionIdx={currentQuestionIdx}
        setCurrentQuestionIdx={setCurrentQuestionIdx}
      />
    </div>
  );
};

export default Assessment;
