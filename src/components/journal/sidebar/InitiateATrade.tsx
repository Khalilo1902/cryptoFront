/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import StartTime from "./StartTime";
import Price from "./Price";
import Risk from "./Risk";
import QuoteCoin from "./QuoteCoin";
import TradeType from "./TradeType";
import TakeProfit from "./TakeProfit";
import StopLoss from "./StopLoss";
import ReasonsForEntry from "./ReasonsForEntry";
import BaseCoin from "./BaseCoin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../feature/store";
import { createJournalApi } from "../../../feature/reducers/journalSlice";
import { NotificationService } from "../../../services/notificationServices";
import { setIsJournalSideBarActive } from "../../../feature/reducers/appSlice";

interface IInitiateATradeProps {
  date: string;
}
const InitiateATrade = ({ date }: IInitiateATradeProps) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch<AppDispatch>();
  const [tradeTypeValue, setTradeTypeValue] = useState("Long");
  const [baseCoinValue, setBaseCoinValue] = useState("");
  const [quoteCoinValue, setQuoteCoinValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState("20:00");
  const [priceValue, setPriceValue] = useState("");
  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [stopLossValue, setStopLossValue] = useState("");
  const [riskValue, setRiskValue] = useState("");
  const [reasonsforEntryValue, setReasonsforEntryValue] = useState("");
  return (
    <>
      {/* start search coins */}
      <div className="flex items-center gap-2 w-full">
        <BaseCoin
          coinImage="bitcoin"
          placeHolder="BTC"
          baseCoinValue={baseCoinValue}
          setBaseCoinValue={setBaseCoinValue}
        />
        <QuoteCoin
          coinImage="tether"
          placeHolder="USDT"
          quoteCoinValue={quoteCoinValue}
          setQuoteCoinValue={setQuoteCoinValue}
        />
      </div>
      {/* end search coins */}
      <div className=" relative">
        <TradeType
          tradeTypeValue={tradeTypeValue}
          setTradeTypeValue={setTradeTypeValue}
        />

        {/* End User Box Type (Short oder Long) */}

        {/* Start Time */}
        <div className="flex items-center gap-2 mt-4 w-1/2">
          <StartTime
            startTimeValue={startTimeValue}
            setStartTimeValue={setStartTimeValue}
          />
        </div>
        {/* End Time */}

        <div className="flex items-center w-full gap-1 ">
          <div className="w-1/3">
            {" "}
            <Price priceValue={priceValue} setPriceValue={setPriceValue} />
          </div>
          <div className="w-1/3">
            {" "}
            <TakeProfit
              takeProfitValue={takeProfitValue}
              setTakeProfitValue={setTakeProfitValue}
            />
          </div>
          <div className="w-1/3">
            <StopLoss
              stopLossValue={stopLossValue}
              setStopLossValue={setStopLossValue}
            />
          </div>
        </div>

        <div className="mt-4 w-1/2">
          <Risk riskValue={riskValue} setRiskValue={setRiskValue} />
        </div>
        <div>
          <ReasonsForEntry
            reasonsforEntryValue={reasonsforEntryValue}
            setReasonsforEntryValue={setReasonsforEntryValue}
          />
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={async () => {
            try {
              const response = await dispatch(
                createJournalApi({
                  baseCoin: baseCoinValue,
                  quoteCoin: quoteCoinValue,
                  tradeType: tradeTypeValue,
                  startTime: startTimeValue,
                  startDate: date,
                  price: Number(priceValue),
                  takeProfit: Number(takeProfitValue),
                  stopLoss: Number(stopLossValue),
                  riskReward: Number(riskValue),
                  reasonsforEntry: reasonsforEntryValue,
                  user: userId!,
                })
              ).unwrap();
              NotificationService.success(response.message);
              setTimeout(() => {
                dispatch(setIsJournalSideBarActive(false));
                setTradeTypeValue("Long");
                setBaseCoinValue("");
                setQuoteCoinValue("");
                setStartTimeValue("20:00");
                setPriceValue("");
                setTakeProfitValue("");
                setStopLossValue("");
                setRiskValue("");
                setReasonsforEntryValue("");
              }, 3000);
            } catch (error: any) {
              NotificationService.error(error.message);
            }
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default InitiateATrade;
