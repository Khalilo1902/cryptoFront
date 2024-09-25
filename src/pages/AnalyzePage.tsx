import { useDispatch, useSelector } from "react-redux";
import MaxWithWrapper from "../components/MaxWithWrapper";
import Analysis from "../components/analyze/Analysis";

import TopSlider from "../components/analyze/TopSlider";
import CreatePost from "../components/crud/CreatePost";
import { AppDispatch, RootState } from "../feature/store";
import DeletePost from "../components/crud/DeletePost";
import EditPost from "../components/crud/EditPost";
import { useNavigate, useParams } from "react-router-dom";
import Analyze from "../components/analyze/Analize";
import { useEffect } from "react";
import { displayanalysis, setAnalyzeId } from "../feature/reducers/analyzeSlice";
import CoinMarquee from "../components/coins/CoinMarquee";

const AnalyzePage = () => {
  const { isDarkMode, inputValueSearchBox } =
  useSelector((state: RootState) => state.app);
  const { analyzeId } = useParams();
  const analyzes = useSelector(displayanalysis)

  const {
    isPostComponentActive,
    isDeleteComponentActive,
    isEditComponentActive,
  } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAnalyzeId(analyzeId));
  }, [dispatch, analyzeId]);
  return (
    <MaxWithWrapper className=" mt-3">
      <div>
      <div>
        <ul
          className={`z-50 ${
            isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
          } ${
            inputValueSearchBox != ""
              ? " sticky  inset-0   h-fit rounded-lg "
              : "hidden"
          }`}
        >
          {analyzes
            .filter(
              (analyze) =>
              analyze?.title
                  .toLowerCase()
                  .includes(inputValueSearchBox.toLowerCase()) ||
                  analyze?.description
                  .toLowerCase()
                  .includes(inputValueSearchBox.toLowerCase())
            )
            .map((analyze) => (
              <li
                key={analyze?._id}
                className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE transition-all duration-200 hover:text-BLACK text-SECONDARY_GRAY"
                onClick={() => {
                  navigate(`/analyze/${analyze?._id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    className=" rounded-lg"
                    width={40}
                    height={40}
                    src={String(analyze?.image)}
                    alt={analyze?.title}
                  />

                   <span className="flex gap-4 font-FONT_VIGA font-bold ">
                    <p>{`(${analyze?.title})`}</p>
                    {/* <p>{news?.current_price} $</p> */}
                  </span> 
                </div>
              </li>
            ))}
        </ul>
        </div>
      <div className="my-4">
        <CoinMarquee />
      </div>
        <div className=" text-3xl font-bold font-FONT_VIGA my-4">Top profile analyze</div>
        <TopSlider />
      </div>
      <div className=" my-4">
      {analyzeId === undefined ? <Analysis /> : <Analyze />}
      </div>
      <div
        className={`${
          isPostComponentActive ? "fixed inset-0 z-50 " : "hidden"
        }`}
      >
        <CreatePost components="analyse" />
      </div>
      <div className={`${isEditComponentActive ? "" : "hidden"}`}>
        <EditPost components="analyse" />
      </div>
      <div className={`${isDeleteComponentActive ? "" : "hidden"}`}>
        <DeletePost components="analyse" />
      </div>
    </MaxWithWrapper>
  );
};

export default AnalyzePage;
