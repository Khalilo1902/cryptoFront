import { useState } from "react";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { displayNews } from "../../feature/reducers/newsSlice";
import ShowTime from "../showTime/ShowTime";
import { useNavigate } from "react-router-dom";

const NewsSlideHome = () => {
  const news = useSelector(displayNews);
  const navigate = useNavigate();

  const [_, setActiveIndex] = useState(0);
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
    <div className="py-16 px-3 font-FONT_VIGA ">
      <div>
        <p className="text-center text-3xl ">TOP NEWS</p>
        <p className="text-center pt-5 py-8">
          Crypto Pulse: Breaking News and Updates from the Cryptocurrency World
        </p>
      </div>
      <Carousel
        responsive={responsive}
        renderButtonGroupOutside
        className=" flex items-center justify-between w-full"
        arrows={true}
        draggable={true}
        additionalTransfrom={0}
        beforeChange={(nextSlide) => setActiveIndex(nextSlide)}
      >
        {news
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .slice(0, 7)
          .map((item) => (
            <div className="pr-1 last:mr-0" key={item._id}>
              <div
                className="coin-slider-theme p-4 flex flex-col rounded-lg w-full gap-2"
                onClick={() => {
                  navigate(`/news/${item._id}`);
                }}
              >
                <div className=" flex flex-col overflow-hidden gap-3">
                  <img
                    className=" w-full rounded-lg h-48 hover:scale-105 duration-300 hover:brightness-50"
                    src={String(item.image)}
                    alt=""
                  />
                  <div className=" justify-start text-xs text-SECONDARY_GRAY">
                    <ShowTime timestamp={item.createdAt} />
                  </div>
                  <p className="text-xl font-FONT_ROBOTO font-bold w-full text-left line-clamp-1 ">
                    {item.title}...
                  </p>
                  <p className=" line-clamp-2 h-12">{item.description}...</p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default NewsSlideHome;
