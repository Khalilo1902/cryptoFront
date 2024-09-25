import { useSelector } from "react-redux";
import { displayanalysis } from "../../feature/reducers/analyzeSlice";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import ShowTime from "../showTime/ShowTime";
import { displayUsers } from "../../feature/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const BestAnalysisSlider = () => {
  const analysis = useSelector(displayanalysis);
  const users = useSelector(displayUsers); // Zugriff auf die Benutzerdaten
  const [_, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const lastAnalysis = analysis
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
      <div className="my-4">
        <h1 className="text-2xl font-bold text-center">TOP ANALYSIS</h1>
        <p className=" text-center pt-2 font-FONT_VIGA ">
          The best analysis from our users. You can find the best analysis here.
        </p>
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
      >
        {lastAnalysis.map((analizeItem) => {
          const user = users.find((user) => user._id === analizeItem.user);
          return (
            <div
              onClick={() => {
                navigate(`/analyze/${analizeItem._id}`);
              }}
              className="flex pr-1 last:mr-0 cursor-pointer"
              key={analizeItem._id}
            >
              <div className="coin-slider-theme p-4 flex flex-col rounded-lg w-full gap-2">
                <div className="flex gap-4 text-xs text-SECONDARY_GRAY overflow-hidden">
                  <img
                    className=" w-full h-48 rounded-xl hover:scale-105 duration-300 hover:brightness-50"
                    src={String(analizeItem?.image)}
                    alt=""
                  />
                </div>
                <div className="pt-2 flex flex-col text-[10px] text-SECONDARY_GRAY">
                  <ShowTime timestamp={analizeItem.createdAt} />
                  <span className="flex ">
                    Authour : {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <div>
                  <p className=" line-clamp-1">
                    title : {analizeItem.title} ...
                  </p>
                  <p className="text-sm line-clamp-1">
                    {analizeItem.description} ...
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BestAnalysisSlider;
