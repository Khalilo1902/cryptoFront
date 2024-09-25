import { useSelector } from "react-redux";
import { displayNews } from "../../feature/reducers/newsSlice";
import { displayUsers } from "../../feature/reducers/userSlice";

import Carousel from "react-multi-carousel";
import { useState } from "react";
import ShowTime from "../showTime/ShowTime";
import { useNavigate } from "react-router-dom";

const TopNewsCardSlider = () => {
  const news = useSelector(displayNews);
  const users = useSelector(displayUsers); // Zugriff auf die Benutzerdaten
  const [_, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const lastNews = news
    .filter((news) => news.likes.length)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 8);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div className="my-2">
        <h1 className="text-2xl font-bold">Top News</h1>
      </div>
      <Carousel
        responsive={responsive}
        renderButtonGroupOutside
        className="relative z-10 mt-6"
        arrows={true}
        draggable={true}
        additionalTransfrom={0}
        beforeChange={(nextSlide) => setActiveIndex(nextSlide)}
        infinite={true}
        autoPlay
      >
        {lastNews.map((newsItem) => {
          const user = users.find((user) => user._id === newsItem.user);
          return (
            <div
              onClick={() => {
                navigate(`/news/${newsItem._id}`);
              }}
              className="flex pr-1 last:mr-0 cursor-pointer"
              key={newsItem._id}
            >
              <div className="coin-slider-theme p-4 flex flex-col rounded-lg w-full gap-2">
                <div className="flex gap-4 text-xs text-SECONDARY_GRAY">
                  <img
                    className="w-16 h-16 rounded-xl"
                    src={String(newsItem?.image)}
                    alt=""
                  />
                  <div className="pt-2">
                    <ShowTime timestamp={newsItem.createdAt} />
                    <span className="flex text-[10px] text-SECONDARY_GRAY pt-2">
                      Authour : {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </div>
                <p>{newsItem.title.slice(0, 18)} ...</p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default TopNewsCardSlider;
