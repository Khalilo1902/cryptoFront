import { useDispatch, useSelector } from "react-redux";
import MaxWithWrapper from "../components/MaxWithWrapper";
import News from "../components/news/News";
import NewsHeader from "../components/news/NewsHeader";
import TopNewsSlide from "../components/news/TopNewsSlider";
import { AppDispatch, RootState } from "../feature/store";
import { setIsPostComponentActive } from "../feature/reducers/appSlice";
import CreatePost from "../components/crud/CreatePost";
import { displayNews, setNewsId } from "../feature/reducers/newsSlice";
import { useNavigate, useParams } from "react-router-dom";
import SingleNews from "../components/news/SingleNews";
import { useEffect } from "react";
import DeletePost from "../components/crud/DeletePost";
import EditPost from "../components/crud/EditPost";
import Spinner from "../components/Spinner";

const NewsPage = () => {
  const {
    isDarkMode,
    isPostComponentActive,
    inputValueSearchBox,
    isDeleteComponentActive,
    isEditComponentActive,
  } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch<AppDispatch>();
  const { newsId } = useParams();

  useEffect(() => {
    dispatch(setNewsId(newsId));
  }, [dispatch, newsId]);

  const news = useSelector(displayNews);

  const navigate = useNavigate();

  return (
    <MaxWithWrapper>
      <div className="flex flex-col my-6 cursor-pointer relative">
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
            {news
              .filter(
                (news) =>
                  news?.title
                    .toLowerCase()
                    .includes(inputValueSearchBox.toLowerCase()) ||
                  news?.description
                    .toLowerCase()
                    .includes(inputValueSearchBox.toLowerCase())
              )
              .map((news) => (
                <li
                  key={news?._id}
                  className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE transition-all duration-200 hover:text-BLACK text-SECONDARY_GRAY"
                  onClick={() => {
                    navigate(`/news/${news?._id}`);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      className=" rounded-lg"
                      width={40}
                      height={40}
                      src={String(news?.image)}
                      alt={news?.title}
                    />

                    <span className="flex gap-4 font-FONT_VIGA font-bold ">
                      <p>{`(${news?.title})`}</p>
                      {/* <p>{news?.current_price} $</p> */}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-SECONDARY_BLACK hover:text-PRIMARY_BLACK"
              : "bg-SECONDARY_WHITE"
          } hover:bg-LIGHT_BLUE rounded-full py-4 px-4 hover:bg-WHITE_SECONDARY flex items-center gap-4 border border-BACKGROUND`}
        >
          <h3 className="text-PRIMARY_BLUE line-clamp-1">Top News:</h3>
          <span className="text-BACKGROUND">
            <TopNewsSlide />
          </span>
        </div>
      </div>
      <div
        onClick={() => dispatch(setIsPostComponentActive(true))}
        className="text-right"
      >
        <button className="btn btn-primary">
          <span className="mr-1">+</span>
          New News
        </button>
      </div>
      <NewsHeader />
      {/* {newsId !== undefined ? <SingleNews /> : <News />} */}
     
      {newsId ? (
        <SingleNews />
      ) : newsId === undefined ? (
        <News />
      ) : (
        <Spinner /> // Zeige Spinner an, wenn newsId nicht vorhanden ist und news noch nicht geladen wurde
      )} 
     
      <div
        className={`${isPostComponentActive ? "fixed inset-0 z-50" : "hidden"}`}
      >
        <CreatePost components="news" />
      </div>
      <div className={`${isDeleteComponentActive ? "" : "hidden"}`}>
        <DeletePost components="news" />
      </div>
      <div className={`${isEditComponentActive ? "" : "hidden"}`}>
        <EditPost components="news" />
      </div>
    </MaxWithWrapper>
  );
};

export default NewsPage;
