import { useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { useState } from "react";
import { displayCoin, displayCoins } from "../../../feature/reducers/coinSlice";

interface IQuoteCoinProps {
  coinImage: string;
  placeHolder: string;
  quoteCoinValue:string;
  setQuoteCoinValue:(quoteCoinValue:string)=>void
}

const QuoteCoin = ({
  coinImage,
  placeHolder,
  quoteCoinValue,
  setQuoteCoinValue
}: IQuoteCoinProps) => {
    const [coinId,setCoinId]=useState(coinImage)
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const [searchValueInputCoinActive, setSearchValueInputCoinActive] =
    useState(false);
  const coins = useSelector(displayCoins);
  const coin = useSelector((state: RootState) => displayCoin(state, coinId));
  return (
    <div className="relative my-4 flex justify-between gap-2 w-full">
      <div className="wrapper-input-coin-journal w-full">
        <input
          className=" input-coin-journal"
          type="text"
          placeholder={placeHolder}
          value={quoteCoinValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setQuoteCoinValue(event.target.value);
            setSearchValueInputCoinActive(true);
          }}
        />
        <img className="w-5" src={coin?.image} alt="" />
      </div>
      <div
        className={`${
          isDarkMode ? " bg-PRIMARY_BLACK/90" : " bg-PRIMARY_WHITE/90"
        } backdrop-blur-sm z-20 absolute left-0 top-14 rounded-lg  max-h-96 overflow-y-scroll `}

      >
        {coins
          .filter(
            (coin) =>
              coin?.name && coin?.name
                .toLowerCase()
                .includes(quoteCoinValue?.toLowerCase()) ||
              coin?.symbol &&  coin?.symbol
                .toLowerCase()
                .includes(quoteCoinValue?.toLowerCase())
          )
          .map((coin, index) => (
            <ul
              className={`even:bg-LIGHT_GRAY odd:bg-DARK_GRAY cursor-pointer py-2 w-full px-4 hover:bg-LIGHT_BLUE
               ${!searchValueInputCoinActive && "hidden"}  ${
                quoteCoinValue?.trim() === "" && "hidden"
              }`}
            
              key={index}
            
              onClick={() => {
                setQuoteCoinValue(coin?.name);
                setSearchValueInputCoinActive(false);
                setCoinId(coin?.id)
                console.log(coin.id)
              }}
            >
              <div className="flex gap-2 items-center w-full">
                <img className="w-6" src={coin?.image} alt="" />
                <li className=" ">{coin?.name}</li>
                <li className=" text-sm text-DARK_BLUE">({coin?.symbol})</li>
              </div>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default QuoteCoin;
