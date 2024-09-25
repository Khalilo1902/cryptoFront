import { useSelector } from "react-redux";
import { RootState } from "../feature/store";
import { displayUser } from "../feature/reducers/userSlice";
import MaxWithWrapper from "../components/MaxWithWrapper";

const QuizResultPage = () => {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
const{isDarkMode}=useSelector((state:RootState)=>state.app) 
  return (
    <MaxWithWrapper className={`flex justify-center items-center h-screen`}>
      <div className={`${isDarkMode?" bg-SECONDARY_BLACK":" bg-SECONDARY_WHITE"} px-8 py-5 rounded-lg shadow-lg shadow-BACKGROUND_DARK w-full lg-w-1/3 font-Viga flex flex-col gap-4 text-lg`}>
        <div className="flex justify-between text-md lg:text-2xl">
          <div className="flex items-center">
            {" "}
            <img className=" w-20 h-20 mx-5" src={user?.profile_photo} alt="" />
            <h2>{user?.firstName}</h2>
            <h2 className="px-2">{user?.lastName}</h2>
          </div>
         
        </div>
        <div className="flex justify-between text-green-700 text-sm sm:text-lg lg:text-2xl xl:text-3xl font-FONT_VIGA font-bold">
          <p>Correct Answers 👍 😇</p>
          <p>{user?.correctAnswers}</p>
        </div>
        <div className="flex justify-between text-red-600 text-sm sm:text-lg lg:text-2xl xl:text-3xl font-FONT_VIGA font-bold">
          <p>incorrect answers 😡</p>
          <p>{user?.incorrectAnswers}</p>
        </div>
        <div className="flex justify-between text-blue-700 text-sm sm:text-lg lg:text-2xl xl:text-3xl font-FONT_VIGA font-bold">
          <p>total score 👨‍🏫</p>
          <p>{user?.totalScore}</p>
        </div>
        <div className="text-center font-FONT_VIGA text-3xl my-10">
          {user?.canAnalyze?"Congratulations, you have been approved as an analyst on our website and welcome to our team!":"Unfortunately, your cumulative scores are below our expectations."}
        </div>
      </div>
    </MaxWithWrapper>
  );
};

export default QuizResultPage;
