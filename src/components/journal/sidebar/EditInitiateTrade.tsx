/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BaseCoin from "./BaseCoin";
import Price from "./Price";
import QuoteCoin from "./QuoteCoin";
import ReasonsForEntry from "./ReasonsForEntry";
import Risk from "./Risk";
import StartTime from "./StartTime";
import StopLoss from "./StopLoss";
import TakeProfit from "./TakeProfit";
import TradeType from "./TradeType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import {
  displayJournal,
  editJournalOpenApi,
  setIsJournalPositionOpenEditActive,
} from "../../../feature/reducers/journalSlice";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { NotificationService } from "../../../services/notificationServices";
import { setIsSpinnerActive } from "../../../feature/reducers/appSlice";

const EditInitiateTrade = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { journalId } = useParams();
  const journal = useSelector((state: RootState) =>
    displayJournal(state, journalId!)
  );

  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
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
    journal?.reasonsforEntry
  );
  return (
    <div className=" w-full min-h-screen flex justify-center items-center ">
      <div
        className={`${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } px-5 py-6 rounded-lg mx-5`}
      >
        <div className="flex justify-end">
          <div
            className="flex justify-end text-xl cursor-pointer bg-SECONDARY_GRAY w-fit rounded-sm"
            onClick={() => dispatch(setIsJournalPositionOpenEditActive(false))}
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
              if (!isSubmitting) {
                setIsSubmitting(true);
                try {
                  const response = await dispatch(
                    editJournalOpenApi({
                      _id: journalId,
                      baseCoin: baseCoinValue,
                      quoteCoin: quoteCoinValue,
                      tradeType: tradeTypeValue,
                      startTime: startTimeValue,
                      price: Number(priceValue),
                      takeProfit: Number(takeProfitValue),
                      stopLoss: Number(stopLossValue),
                      riskReward: Number(riskValue),
                      reasonsforEntry: reasonsforEntryValue,
                    })
                  ).unwrap();
                  NotificationService.success(response.message);
                  console.log(response);
                  setTimeout(() => {
                    dispatch(setIsJournalPositionOpenEditActive(false));
                    dispatch(setIsSpinnerActive(false));
                    setTradeTypeValue("");
                    setBaseCoinValue("");
                    setQuoteCoinValue("");
                    setStartTimeValue("");
                    setPriceValue("");
                    setTakeProfitValue("");
                  }, 3000);
                } catch (error: any) {
                  NotificationService.error(error.message);
                  setIsSpinnerActive(false);
                } finally {
                  setIsSubmitting(false);
                }
              }
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInitiateTrade;
