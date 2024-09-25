import { useDispatch, useSelector } from "react-redux";
import Coin from "../components/coins/Coin";
import { useNavigate, useParams } from "react-router-dom";
import { displayCoins, setCoinId } from "../feature/reducers/coinSlice";
import { useEffect } from "react";
import MaxWithWrapper from "../components/MaxWithWrapper";
import Coins from "../components/coins/Coins";
import { RootState } from "../feature/store";
import CoinSlider from "../components/coins/CoinSlider";
import CoinMarquee from "../components/coins/CoinMarquee";

const CoinPage = () => {
  const { isDarkMode, inputValueSearchBox } = useSelector(
    (state: RootState) => state.app
  );
  const coins = useSelector(displayCoins);
  const navigate = useNavigate();
  const { coinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCoinId(coinId));
  }, [dispatch, coinId]);
  return (
    <MaxWithWrapper>
      <div className="relative">
      <ul
          className={`z-50 ${
            isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
          } ${
            inputValueSearchBox != ""
              ? " sticky  inset-0   h-fit rounded-lg "
              : "hidden"
          }`}
        >
          {coins
            .filter(
              (coin) =>
                coin.name
                  .toLowerCase()
                  .includes(inputValueSearchBox.toLowerCase()) ||
                coin.symbol
                  .toLowerCase()
                  .includes(inputValueSearchBox.toLowerCase())
            )
            .map((coin,index) => (
              <li
                key={index}
                className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE transition-all duration-200"
                onClick={() => {
                  navigate(`/coin/${coin.id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    className=" rounded-lg"
                    width={40}
                    height={40}
                    src={coin?.image}
                    alt={coin?.name}
                  />

                  <span className="flex gap-4 font-FONT_VIGA font-bold ">
                    <p className="text-SECONDARY_GRAY">{`(${coin.symbol})`}</p>
                    <p>{coin.current_price} $</p>
                  </span>
                </div>
              </li>
            ))}
        </ul>

      <div className=" my-6">
          <CoinMarquee />
        </div>
        <div className=" my-6">
          <CoinSlider />
        </div>
      </div>
      {coinId === undefined ? <Coins hasPagination={true} /> : <Coin />}
    </MaxWithWrapper>
  );
};

export default CoinPage;
