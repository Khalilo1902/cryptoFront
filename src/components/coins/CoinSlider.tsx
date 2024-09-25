import { useState } from "react";
import Carousel from "react-multi-carousel";
import {  useSelector } from "react-redux";
import {
  displayCoins,
} from "../../feature/reducers/coinSlice";
import { useNavigate } from "react-router-dom";

const CoinSlider = () => {
 
  const coins = useSelector(displayCoins);
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
    <Carousel
      responsive={responsive}
      renderButtonGroupOutside
      className=" flex items-center justify-between w-full z-10"
      arrows={true}
      draggable={true}
      additionalTransfrom={0}
      beforeChange={(nextSlide) => setActiveIndex(nextSlide)}
    >
      {coins.map((coin) => (
        <div
          onClick={() => {
            navigate(`/coin/${coin.id}`);
          }}
          className=" flex pr-1 last:mr-0 cursor-pointer"
          key={coin.id}
        >
          <div className=" coin-slider-theme p-4 flex flex-col rounded-lg w-full gap-2">
            <div className="flex items-center  gap-3">
              <img className="w-10 h-10" src={coin.image} alt="" />
              <p>{coin.name.slice(0, 10)}</p>
              <p>{coin.symbol}</p>
            </div>
            <div className="flex gap-3 ">
              <span className="font-bold text-xl"></span>
              <span className="text-xl font-bold">
                {coin.current_price.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}{" "}
                USDT
              </span>
            </div>
            <div className="flex gap-3">
              <span
                className={`rounded-lg px-1 w-32 text-center ${
                  coin.price_change_24h < 0 ? "bg-PRIMARY_RED" : " bg-green-600"
                }`}
              >
                {coin.price_change_24h.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}{" "}
                $
              </span>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CoinSlider;
