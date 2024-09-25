import { useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { useNavigate, useParams } from "react-router-dom";
import { displayUser } from "../../../feature/reducers/userSlice";

const ExamRequest = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  console.log("canAnalyze: ", user?.canAnalyze);
  if (user?.canAnalyze) {
    return (
      <div className=" flex">
        <div
          className={`flex flex-col ${
            isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
          } p-10 rounded-lg`}
        >
          <p className="text-justify font-FONT_VIGA leading-9">{`Dear ${user.firstName} ${user.lastName}`}</p>
          <p className=" text-justify font-FONT_VIGA leading-9">
            Congratulations on successfully passing the cryptocurrency exam! We
            are thrilled to have you join our team.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex items-center h-full">
        <div
          className={`flex flex-col ${
            isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
          } p-10 rounded-lg`}
        >
          <p className=" text-justify font-FONT_VIGA leading-9">
            To ensure the quality and credibility of the analyses shared on our
            website, we have created a dedicated section called "Cryptocurrency
            Analysis" where users can share their insights and expertise on
            various cryptocurrencies. Before publishing their analyses in this
            section, users are required to take a specialized exam to assess
            their knowledge and expertise in the field of cryptocurrencies. Upon
            successfully passing this exam, users can showcase their analyses in
            the "Cryptocurrency Analysis" section of our website, reaching a
            wide audience of enthusiasts in this domain. Our goal in
            establishing this section is to provide a suitable platform for the
            exchange of knowledge and ideas among cryptocurrency experts and
            enthusiasts. We hope that with your active participation, this
            section will become a valuable resource for accurate and up-to-date
            cryptocurrency analyses.
          </p>
          <button
            className="btn btn-primary my-3"
            onClick={() => navigate("/quiz")}
          >
            Exam request
          </button>
        </div>
      </div>
    );
  }
};

export default ExamRequest;
