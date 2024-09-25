import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "./QuestionCard";
import { displayQuestions } from "../../feature/reducers/quizSlice";
import { useState } from "react";
import DownCounter from "./DownCounter";
import AlertDelete from "./AlertDelete";
import { AppDispatch } from "../../feature/store";
import { examScoreRegistrationApi } from "../../feature/reducers/userSlice";
import { useNavigate } from "react-router-dom";


const Questions = () => {
  const questions = useSelector(displayQuestions);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<
    { id: string; userAnswer: string[] }[]
  >([]);
  const getQuestionType = (answer: string) => {
    return answer === "trueFalse" ? "radio" : "checkbox";
  };
  const calculateResults = async () => {
    const results = questions.map((question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.id === question._id
      ) || {
        id: question._id,
        userAnswer: [],
      };

      if (!userAnswer) {
        return {
          id: question._id,
          question: question.question,
          userAnswer: "No answer provided",
          isCorrect: false,
          score: question.score,
          choices: question.choices,
        };
      }

      if (
        question.type === "trueFalse" ||
        question.type === "singlecorrect_answers"
      ) {
        const isCorrect =
          userAnswer.userAnswer[0] === question.correct_answers &&
          userAnswer.userAnswer.length === 1;
        return {
          id: question._id,
          question: question.question,
          userAnswer: userAnswer.userAnswer[0],
          isCorrect,
          score: isCorrect ? question.score : 0,
        };
      } else if (question.type === "multiplecorrect_answers") {
        const correctAnswers = question.correct_answers.split(",");
        const userSelectedAnswers = [...new Set(userAnswer.userAnswer)].sort();
        const isCorrect =
          correctAnswers.length === userSelectedAnswers.length &&
          correctAnswers.every((correctAnswer) =>
            userSelectedAnswers.includes(correctAnswer)
          );

        return {
          id: question._id,
          question: question.question,
          userAnswer: userSelectedAnswers.join(", "),
          isCorrect,
          score: isCorrect ? question.score : 0,
          choices: question.choices,
        };
      }
      return null;
    });

    console.table(results);

    const correctAnswers = results.filter((result) => result!.isCorrect);
    const incorrectAnswers = results.filter((result) => !result!.isCorrect);

    const total = results.reduce((acc, result) => acc + result!.score, 0);
    const canAnalyze = total > 85 ? true : false;
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      await dispatch(
        examScoreRegistrationApi({
          correctAnswers: correctAnswers.length,
          incorrectAnswers: incorrectAnswers.length,
          totalScore: total,
          canAnalyze,
        })
      );
    } catch (error) {
      console.error("Failed to save the blog", error);
    }
    navigate(`/quiz-result`, { replace: true });
  };
  const handleAnswerChange = (
    questionId: string,
    userAnswer: string,
    checked: boolean,
    type: string
  ) => {
    const selectedQuestionAnswers = userAnswers.find(
      (answer) => answer.id === questionId
    ) || {
      id: questionId,
      userAnswer: [],
    };

    const updatedAnswers = checked
      ? type === "radio"
        ? [userAnswer]
        : [...selectedQuestionAnswers.userAnswer, userAnswer]
      : selectedQuestionAnswers.userAnswer.filter(
          (answer) => answer !== userAnswer
        );

    setUserAnswers((prevUserAnswers) => {
      const existingAnswerIndex = prevUserAnswers.findIndex(
        (answer) => answer.id === questionId
      );
      if (existingAnswerIndex !== -1) {
        prevUserAnswers[existingAnswerIndex] = {
          ...prevUserAnswers[existingAnswerIndex],
          userAnswer: updatedAnswers,
        };
      } else {
        prevUserAnswers.push({ id: questionId, userAnswer: updatedAnswers });
      }

      return [...prevUserAnswers];
    });
  };
  const handleCalculateResults = () => {
    calculateResults();
  };
  return (
    <div className="flex flex-col gap-4 my-6">
      <DownCounter />
      {questions.map((question, index) => (
        <div key={index}>
          <QuestionCard
            question={question}
            index={index}
            handleAnswerChange={handleAnswerChange}
            getQuestionType={getQuestionType}
          />
        </div>
      ))}
      <div className="flex justify-between items-center">
        <button
          className=" btn btn-primary text-FOREGROUND hover:text-GREEN600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK"
          onClick={handleCalculateResults}
        >
          Submit
        </button>
        <div>
          <AlertDelete />
        </div>
      </div>
    </div>
  );
};

export default Questions;
