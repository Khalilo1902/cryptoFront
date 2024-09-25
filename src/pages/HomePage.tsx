import MaxWithWrapper from "../components/MaxWithWrapper";
import MainSlider, { ICarouselItem } from "../components/slider/MainSlider";
import CoinSlider from "../components/coins/CoinSlider";
import { useSelector } from "react-redux";
import { RootState } from "../feature/store";
import NewsSlideHome from "../components/news/NewsSlideHome";
import JournalHome from "../components/journal/JournalHome";
import Coins from "../components/coins/Coins";
import CoinMarquee from "../components/coins/CoinMarquee";
import BestAnalysisSlider from "../components/analyze/BestAnalysisSlider";
import { useNavigate } from "react-router-dom";
import { displayNews } from "../feature/reducers/newsSlice";

const items: ICarouselItem[] = [
  {
    id: "1",
    image: "/banner1.png",
  },
  {
    id: "2",
    image: "/banner2.png",
  },
  {
    id: "3",
    image: "/binance.png",
  },
  {
    id: "4",
    image: "/banner2.png",
  },
];

const HomePage = () => {
  const { isDarkMode, inputValueSearchBox } = useSelector(
    (state: RootState) => state.app
  );
  const news = useSelector(displayNews);
  const navigate = useNavigate();
  return (
    <MaxWithWrapper>
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
                className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE text-SECONDARY_GRAY  hover:text-BLACK transition-all duration-200"
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

                  <span className="flex gap-4 font-FONT_VIGA font-bold 
                   ">
                    <p>{`(${news?.title})`}</p>
                    {/* <p>{news?.current_price} $</p> */}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <MainSlider items={items} />
      <div className="my-4">
        <CoinMarquee />
      </div>
      <div className="my-4">
        <CoinSlider />
      </div>
      <div
        className={`mt-4 pt-5 px-5 rounded-md${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE "
        }`}
      >
        <Coins hasPagination={false} />
      </div>

      <div>
        <NewsSlideHome />
      </div>
      <div>
        <JournalHome />
      </div>
      <div>
        <BestAnalysisSlider />
      </div>
    </MaxWithWrapper>
  );
};

export default HomePage;
