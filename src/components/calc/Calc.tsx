import { useCallback, useEffect, useState } from "react";
import { FaDollarSign, FaPercent } from "react-icons/fa";

const Calc = () => {
  const [formState, setFormState] = useState({
    totalCapital: "",
    risk: "",
    entry: "",
    stop: "",
    exit: "",
    leverage: 1,
    riskedCapital: "",
    positionSize: "",
    margin: "",
    reward: "",
    estimated: "",
    roe: "",
    percentChange: "",
    liquidation: "",
    isError: false,
    isBtnLongActive: true,
  });

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (formState.leverage > 0) {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    if (formState.leverage < 1) {
      setFormState({ ...formState, leverage: 1 });
    }
    if (formState.leverage > 100) {
      setFormState({ ...formState, leverage: 100 });
    }
  }, [formState.leverage]);

  const calculateRiskMetrics = useCallback(() => {
    // Risked Capital
    const riskedCapital = (
      (parseFloat(formState.totalCapital) * parseFloat(formState.risk)) /
      100
    ).toString();

    // Position Size
    const positionSize = (
      formState.isBtnLongActive
        ? parseFloat(riskedCapital) /
          (parseFloat(formState.entry) - parseFloat(formState.stop))
        : parseFloat(riskedCapital) /
          (parseFloat(formState.stop) - parseFloat(formState.entry))
    ).toString();

    // Margin
    const margin = (
      (parseFloat(positionSize) * parseFloat(formState.entry)) /
      formState.leverage
    ).toString();

    //pnl
    const estimated = (
      formState.isBtnLongActive
        ? parseFloat(positionSize) *
          (parseFloat(formState.exit) - parseFloat(formState.entry))
        : parseFloat(positionSize) *
          (parseFloat(formState.entry) - parseFloat(formState.exit))
    ).toString();

    // Reward
    const reward = (parseFloat(estimated) / parseFloat(riskedCapital))
      .toFixed(3)
      .toString();

    //Roe
    const roe = ((parseFloat(estimated) / parseFloat(margin)) * 100)
      .toFixed(3)
      .toString();

    //percentChange
    const percentChange = (
      formState.isBtnLongActive
        ? ((parseFloat(formState.exit) - parseFloat(formState.entry)) * 100) /
          parseFloat(formState.entry)
        : ((parseFloat(formState.entry) - parseFloat(formState.exit)) * 100) /
          parseFloat(formState.exit)
    )
      .toFixed(3)
      .toString();

    //liquidation
    const liquidation = (
      formState.isBtnLongActive
        ? ((parseFloat(margin) * formState.leverage - parseFloat(margin)) *
            parseFloat(formState.entry)) /
          (parseFloat(margin) * formState.leverage)
        : ((parseFloat(margin) * formState.leverage + parseFloat(margin)) *
            parseFloat(formState.entry)) /
          (parseFloat(margin) * formState.leverage)
    )
      .toFixed(3)
      .toString();

    //isError
    const isError = formState.isBtnLongActive
      ? parseFloat(formState.stop) >= parseFloat(formState.entry)
        ? true
        : false
      : parseFloat(formState.stop) <= parseFloat(formState.entry)
      ? true
      : false;

    setFormState((prevState) => ({
      ...prevState,
      riskedCapital,
      positionSize,
      margin,
      reward,
      estimated,
      roe,
      percentChange,
      liquidation,
      isError,
    }));
  }, [formState]);

  useEffect(() => {
    calculateRiskMetrics();
  }, [calculateRiskMetrics]);

  const convertNumberToStringWithSymbol = (result: string, symbol: string) => {
    return isNaN(parseFloat(result))
      ? "-"
      : result.length == 2
      ? symbol === "$"
        ? symbol + result.padEnd(3, ".") + "00"
        : result.padEnd(3, ".") + "00" + symbol
      : symbol === "$"
      ? symbol + parseFloat(result).toFixed(2).toString()
      : parseFloat(result).toFixed(2).toString() + symbol;
  };
  return (
    <div className="  h-full flex flex-col gap-4">
      <div className="box-theme rounded-md py-6 px-4 flex flex-col gap-2">
        <div className="  grid grid-cols-12 gap-2 items-center   ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Total Capital
          </p>
          <div className="flex items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <span className=" box-theme p-2">
              <FaDollarSign />
            </span>
            <input
            autoComplete="off"
              type="text"
              inputMode="numeric"
              pattern="[0-9]+([.][0-9]+)?"
              className="input-calc"
              name="totalCapital"
              value={formState.totalCapital}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className="  grid grid-cols-12 gap-2 items-center ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Risk
          </p>
          <div className="flex flex-row-reverse items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <span className=" box-theme p-2">
              <FaPercent />
            </span>
            <input
            autoComplete="off"
              className="input-calc"
              type="text"
              pattern="[0-9]+([.][0-9]+)?"
              inputMode="numeric"
              name="risk"
              value={formState.risk}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      </div>

      <div className="box-theme rounded-md py-6 px-4 flex flex-col gap-2">
        <div className="  grid grid-cols-12 gap-2 items-center   ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Type
          </p>
          <div className="flex items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9 gap-1 p-1">
            <button
              className={`${
                formState.isBtnLongActive && "!bg-green-600"
              } btn-calc   hover:bg-green-300`}
              onClick={() => {
                setFormState({
                  ...formState,
                  isBtnLongActive: true,
                });
              }}
            >
              Long
            </button>
            <button
              className={`${
                !formState.isBtnLongActive && "!bg-red-500"
              } btn-calc   hover:bg-red-400`}
              onClick={() => {
                setFormState({
                  ...formState,
                  isBtnLongActive: false,
                });
              }}
            >
              Short
            </button>
          </div>
        </div>

        <div className="  grid grid-cols-12 gap-2 items-center   ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Levrage
          </p>
          <div className="flex items-center gap-2 rounded-md  w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <input
              type="range"
              className="input-calc !p-0 !w-3/4"
              name="leverage"
              value={formState.leverage}
              onChange={handleSliderChange}
            />
            <input
              className="input-calc !w-1/4 !pr-0 !bg-PRIMARY_BLACK rounded-lg"
              type="number"
              name="leverage"
              value={formState.leverage}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className="  grid grid-cols-12 gap-2 items-center   ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Entry
          </p>
          <div className="flex items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <span className=" box-theme p-2">
              <FaDollarSign />
            </span>
            <input
              className="input-calc"
              type="number"
              inputMode="decimal"
              pattern="[0-9]+([.][0-9]+)?"
              name="entry"
              value={formState.entry}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className=" box-theme grid grid-cols-12 gap-2 items-center ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Stop
          </p>
          <div className="flex  items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <span className=" box-theme p-2">
              <FaDollarSign />
            </span>
            <input
              className="input-calc"
              type="number"
              inputMode="decimal"
              pattern="[0-9]+([.][0-9]+)?"
              name="stop"
              value={formState.stop}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className=" box-theme grid grid-cols-12 gap-2 items-center ">
          <p className="col-span-3 md:col-span-2 lg:col-span-4 xl:col-span-3">
            Exit
          </p>
          <div className="flex  items-center bg-PRIMARY_BLACK border rounded-md my-2 overflow-hidden w-full col-span-9 lg:col-span-8 md:col-span-10 xl:col-span-9">
            <span className=" box-theme p-2">
              <FaDollarSign />
            </span>
            <input
              className="input-calc"
              type="number"
              inputMode="decimal"
              pattern="[0-9]+([.][0-9]+)?"
              name="exit"
              value={formState.exit}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className=" text-right text-blue-300">
          <button
            className=""
            onClick={() =>
              setFormState({
                totalCapital: "",
                risk: "",
                entry: "",
                stop: "",
                exit: "",
                leverage: 1,
                riskedCapital: "",
                positionSize: "",
                margin: "",
                reward: "",
                estimated: "",
                roe: "",
                percentChange: "",
                liquidation: "",
                isError: false,
                isBtnLongActive: true,
              })
            }
          >
            Reset
          </button>
        </div>
      </div>

      {/* Result */}
      <div className=" relative h-full py-3 lg:py-2 box-theme flex flex-col justify-center  rounded-md font-bold text-lg">
        <div
          className={`${
            formState.isError && " blur-sm"
          }  px-4 flex flex-col gap-4 lg:gap-4`}
        >
          <div className=" flex justify-between text-red-500">
            <p className=" ">Risked Capital</p>
            <p>
              {" "}
              {convertNumberToStringWithSymbol(formState.riskedCapital, "$")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Margin</p>
            <p> {convertNumberToStringWithSymbol(formState.margin, "$")}</p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Position Size</p>
            <p
              className={`${
                isNaN(parseFloat(formState.positionSize))
                  ? " bg-transparent"
                  : "bg-SECONDARY_WHITE text-SECONDARY_BLACK rounded-lg py-.5 px-3"
              }`}
            >
              {convertNumberToStringWithSymbol(formState.positionSize, "")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Liquidation</p>
            <p>
              {" "}
              {convertNumberToStringWithSymbol(formState.liquidation, "$")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Risk / Reward</p>
            <p
              className={`${
                parseFloat(formState.reward) < 1
                  ? "text-red-500"
                  : "text-green-300"
              }`}
            >
              {convertNumberToStringWithSymbol(formState.reward, "")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Estimated PnL</p>
            <p className=" text-green-300">
              {convertNumberToStringWithSymbol(formState.estimated, "$")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">ROE</p>
            <p className="text-green-300">
              {convertNumberToStringWithSymbol(formState.roe, "%")}
            </p>
          </div>
          <div className=" flex justify-between ">
            <p className="">Percent Change</p>
            <p className="text-green-300">
              {convertNumberToStringWithSymbol(formState.percentChange, "%")}
            </p>
          </div>
          <div className="  ">
            <p className=" text-gray-400">
              Note: does not account for exchange fees.
            </p>
          </div>
        </div>
        <div
          className={`${
            formState.isError
              ? "absolute top-1/2 flex justify-center w-full"
              : "hidden h-0"
          }`}
        >
          <p className=" font-FONT_SALSA font-bold text-2xl text-red-500 lg:text-xl xl:text-2xl">
            {formState.isBtnLongActive
              ? "Stop loss must be below entry"
              : "Stop loss must be above entry"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calc;
