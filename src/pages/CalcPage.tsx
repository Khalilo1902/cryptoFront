import { useState } from "react";
import MaxWithWrapper from "../components/MaxWithWrapper";
import Calc from "../components/calc/Calc";
import TradingViewWidget from "../components/tradingview/TradingView";
import Spinner from "../components/Spinner";

const CalcPage = () => {
  const [loading, setLoading] = useState(true); // Start loading

  setTimeout(() => {
    setLoading(false); // Stop loading
  }, 2000);

  return (
    <MaxWithWrapper className="min-h-screen mt-12">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Calc />
          <TradingViewWidget />
        </div>
      )}
    </MaxWithWrapper>
  );
};

export default CalcPage;
