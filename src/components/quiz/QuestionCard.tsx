import { useSelector } from "react-redux";
import { IQuiz } from "../../interface";
import { RootState } from "../../feature/store";

interface IQuestionCardProps{
  question:IQuiz,
  index:number,
  handleAnswerChange: (
    questionId: string,
    userAnswer: string,
    checked: boolean,
    type: string
  ) => void;
  getQuestionType: (answer: string) => string;
}

const QuestionCard = ({question,index, handleAnswerChange,
  getQuestionType,}:IQuestionCardProps) => {
  const {isDarkMode}=useSelector((state:RootState)=>state.app)
  return (
    <div className={`${isDarkMode?" bg-SECONDARY_BLACK shadow-SECONDARY_WHITE":" bg-SECONDARY_WHITE shadow-SECONDARY_BLACK"} px-8 py-6 rounded-lg shadow-sm `}>
    <div className="flex justify-between mb-3 lg:items-center lg:pt-0">
      <h3 className="text-lg pt-4 font-FONT_VIGA lg:text-2xl">
        {index + 1 + "-"} {question.question}
      </h3>
      <h5 className="text-xs text-GRAY600">{question.score} points</h5>
    </div>
    <div className="question ">
        {question.choices.split(",").map((choice, choiceIndex) => (
          <div
            className="flex items-center gap-2 mb-2 text-xl"
            key={choiceIndex}
          >
            <input
              className="w-5 h-5"
              type={getQuestionType(question.type)}
              name={`question-${question._id}`}
              id={`question-${choice}`}
              value={choice}
              onChange={(e) =>
                handleAnswerChange(
                  question._id,
                  e.target.value,
                  e.target.checked,
                  question.type
                )
              }
            />
            <p>{choice}</p>
          </div>
        ))}
      </div>
  </div>
  );
};

export default QuestionCard;
