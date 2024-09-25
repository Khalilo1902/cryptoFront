/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoClose } from "react-icons/io5";
import {
  displayJournal,
  journalPositionCloseApi,
  setIsClosePositionJournalActive,
} from "../../feature/reducers/journalSlice";
import BaseCoin from "./sidebar/BaseCoin";
import Price from "./sidebar/Price";
import QuoteCoin from "./sidebar/QuoteCoin";
import ReasonsForEntry from "./sidebar/ReasonsForEntry";
import Risk from "./sidebar/Risk";
import StartTime from "./sidebar/StartTime";
import StopLoss from "./sidebar/StopLoss";
import TakeProfit from "./sidebar/TakeProfit";
import TradeType from "./sidebar/TradeType";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "../../feature/store";
import Result from "./sidebar/Results";
import Profit from "./sidebar/Profit";
import Loss from "./sidebar/Loss";
import EndTime from "./sidebar/EndTime";
import EndDate from "./sidebar/EndDate";
import TradeSummery from "./sidebar/TradeSummery";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationService } from "../../services/notificationServices";
import { setIsSpinnerActive } from "../../feature/reducers/appSlice";

const ClosePositionJournal = () => {
  const { journalId } = useParams();

  const journal = useSelector((state: RootState) =>
    displayJournal(state, journalId!)
  );

  const today = new Date().toISOString().split("T")[0];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [tradeTypeValue, setTradeTypeValue] = useState(journal?.tradeType);
  const [baseCoinValue, setBaseCoinValue] = useState(journal?.baseCoin);
  const [quoteCoinValue, setQuoteCoinValue] = useState(journal?.quoteCoin);
  const [startTimeValue, setStartTimeValue] = useState(journal?.startTime);
  const [priceValue, setPriceValue] = useState(journal?.price.toString());
  const [takeProfitValue, setTakeProfitValue] = useState(
    journal?.takeProfit.toString()
  );
  const [stopLossValue, setStopLossValue] = useState(
    journal?.stopLoss.toString()
  );
  const [riskValue, setRiskValue] = useState(journal?.riskReward.toString());
  const [reasonsforEntryValue, setReasonsforEntryValue] = useState(
    journal?.reasonsforEntry.toString()
  );
  const [resultValue, setResultValue] = useState("Profit");
  const [profitValue, setProfitValue] = useState("");
  const [lossValue, setLossValue] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");
  const [endDateValue, setEndDateValue] = useState(today);
  const [tradeSummeryValue, setTradeSummeryValue] = useState("");

  return (
    <div className=" w-full  flex justify-center items-center  ">
      <div
        className={`${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } px-5 py-6 rounded-lg mx-5 overflow-y-scroll max-h-screen my-12 `}
      >
        <div className="flex items-center justify-between py-4 ">
          <div className=" font-FONT_VIGA font-bold text-xl">
            {journal?.startDate}
          </div>
          <div
            className="flex justify-end text-xl cursor-pointer bg-SECONDARY_GRAY hover:text-SECONDARY_RED hover:scale-110 w-fit rounded-sm"
            onClick={() => {
              dispatch(setIsClosePositionJournalActive(false));
            }}
          >
            <IoClose />
          </div>
        </div>
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
          <div className=" mt-4 w-full flex items-center gap-1">
            <div className=" w-1/3">
              <StartTime
                startTimeValue={startTimeValue}
                setStartTimeValue={setStartTimeValue}
              />
            </div>
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
          <div className="  mt-4">
            <div className=" w-1/3">
              <Risk riskValue={riskValue} setRiskValue={setRiskValue} />
            </div>
          </div>
          <div className=" ">
            <ReasonsForEntry
              reasonsforEntryValue={reasonsforEntryValue}
              setReasonsforEntryValue={setReasonsforEntryValue}
            />
          </div>
          <div className="w-full mt-4">
            {" "}
            <Result resultValue={resultValue} setResultValue={setResultValue} />
          </div>
          <div className=" flex gap-2 mt-4 w-full">
            <div className={`w-1/3 ${resultValue === "Loss" && " hidden"}`}>
              <Profit
                profitValue={profitValue}
                setProfitValue={setProfitValue}
              />
            </div>
            <div className={`w-1/3 ${resultValue === "Profit" && " hidden"}`}>
              <Loss lossValue={lossValue} setLossValue={setLossValue} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <div className=" w-1/3 ">
              <EndDate
                endDateValue={endDateValue}
                setEndDateValue={setEndDateValue}
              />
            </div>
            <div className=" w-1/3">
              <EndTime
                endTimeValue={endTimeValue}
                setEndTimeValue={setEndTimeValue}
              />
            </div>
          </div>
          <div className=" ">
            <TradeSummery
              tradeSummeryValue={tradeSummeryValue}
              setTradeSummeryValue={setTradeSummeryValue}
            />
          </div>

          <button
            onClick={async () => {
              if (!isSubmitting) {
                setIsSubmitting(true);
                try {
                  const response = await dispatch(
                    journalPositionCloseApi({
                      _id: journalId,
                      baseCoin: tradeTypeValue,
                      quoteCoin: quoteCoinValue,
                      tradeType: tradeTypeValue,
                      startTime: startTimeValue,
                      price: Number(priceValue),
                      takeProfit: Number(takeProfitValue),
                      stopLoss: Number(stopLossValue),
                      riskReward: Number(riskValue),
                      reasonsforEntry: reasonsforEntryValue,
                      isClose: true,
                      results: resultValue === "Profit" ? true : false,
                      profit: Number(profitValue),
                      loss: Number(lossValue),
                      endDate: `${new Date(endDateValue).getFullYear()}-${
                        new Date(endDateValue).getMonth() + 1
                      }-${new Date(endDateValue).getDate()}`,
                      endTime: endTimeValue,
                      tradeSummary: tradeSummeryValue,
                    })
                  ).unwrap();
                  NotificationService.success(response.message);
                  dispatch(setIsSpinnerActive(true));
                  setTimeout(() => {
                    navigate("/journal");
                  }, 3000);
                  dispatch(setIsSpinnerActive(false));
                } catch (error: any) {
                  NotificationService.error(error.message);
                  dispatch(setIsSpinnerActive(false));
                } finally {
                  setIsSubmitting(false);
                }
              }
            }}
            className="btn btn-primary mt-4 mb-20"
          >
            Close Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClosePositionJournal;
