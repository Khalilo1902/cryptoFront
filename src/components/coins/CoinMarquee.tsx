import { useSelector } from "react-redux";
import { displayCoins } from "../../feature/reducers/coinSlice";
import { BiSolidUpArrow } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const CoinMarquee = () => {
  const coins = useSelector(displayCoins);
  const navigate=useNavigate()
  return (
    <Marquee pauseOnHover={true}>
    <div className="overflow-hidden whitespace-nowrap my-2">
      <div className="flex gap-20 w-full">
        {coins.map((coin) => (
          <div className="flex flex-row gap-2 items-center cursor-pointer" key={coin.id} onClick={()=>{
navigate(`/coin/${coin.id}`)
          }}>
            <img className="w-10 h-10"  src={coin?.image} alt="" />
            <div className="flex flex-col">
              <p className=" text-SECONDARY_GRAY">
                {coin.name} ({coin.symbol})
              </p>
              <div className="flex gap-3">
                <p>{coin.current_price?.toLocaleString()} $</p>
                <div className={`flex items-center gap-1 `}>
                  <BiSolidUpArrow
                    className={`${
                      coin.price_change_percentage_1h_in_currency > 0
                        ? " text-green-500"
                        : "text-red-500 rotate-180"
                    }`}
                  />
                  <p
                    className={`${
                      coin.price_change_percentage_1h_in_currency > 0
                        ? " text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_1h_in_currency?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Marquee>
  );
};

export default CoinMarquee;
