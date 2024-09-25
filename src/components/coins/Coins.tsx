import { FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { displayCoins, setCoinId } from "../../feature/reducers/coinSlice";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { ICoin } from "../../interface";
import Pagination from "../pagination/Pgination";
import { RootState } from "../../feature/store";
import Spinner from "../Spinner";

interface ICoinProps {
  hasPagination: boolean;
}

const Coins = ({ hasPagination }: ICoinProps) => {
  const coins = useSelector(displayCoins);
  const chartRefs = useRef<HTMLCanvasElement[]>([]);
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; // Number of items per page
  const totalItems = coins.length - 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderChart = (canvas: HTMLCanvasElement, item: ICoin) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context is not available");
      return;
    }

    if (Chart.getChart(canvas)) {
      Chart.getChart(canvas)!.destroy();
    }

    const sparklineData = item.sparkline_in_7d.price;
    if (sparklineData.length === 0) {
      console.error("Sparkline data is empty");
      return;
    }
    const chartOptions = {
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { display: false },
        y: { display: false },
      },
    };
    

    new Chart(ctx, {
      type: "line",
      data: {
        labels: sparklineData.map((_, index) => index + 1),
        datasets: [
          {
            label: "Sparkline",
            data: sparklineData,
            borderColor: sparklineData.map((price, index, array) => {
              const lastIndex = array.length - 1;

              if (index < lastIndex && price < array[lastIndex]) {
                return "rgb(52, 211, 153)";
              } else {
                return "rgb(248, 113, 113)";
              }
            }),

            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 1.5,
            pointRadius: 0,
          },
        ],
      },
      options: chartOptions,
    });
  };

  useEffect(() => {
    // Berechne den Start- und Endindex basierend auf der aktuellen Seite
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);

    // Aktualisiere die chartRefs.current-Array, um sicherzustellen, dass sie groß genug ist,
    // um alle Canvas-Elemente für die aktuellen Seiten zu speichern
    chartRefs.current = Array.from(
      { length: endIndex - startIndex },
      (_, index) => {
        return chartRefs.current[index] || null;
      }
    );

    // Render neue Charts für die Münzen auf der aktuellen Seite
    coins.slice(startIndex, endIndex).forEach((item, index) => {
      const canvas = chartRefs.current[index];
      if (canvas) {
        renderChart(canvas, item);
      }
    });
  }, [coins, currentPage, perPage, totalItems]);

  return (
    <div
      className={` w-full mt-4 px-4 font-FONT_VIGA py-6 rounded-lg ${
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      } `}
    >
      <div className="flex items-center justify-between pb-14">
        <h2 className=" text-sm font-semibold sm:text-2xl">Market Update</h2>

        <button
          onClick={() => navigate("/coin")}
          className={`bg-PRIMARY_BLUE text-xs px-2 py-1 sm:text-base sm:py-2 sm:px-4  rounded-full text-PRIMARY_WHITE ${
            hasPagination ? "hidden" : "flex"
          }`}
        >
          View All
        </button>
      </div>

      <div>
        <div className="coin-header-table pt-2 pb-4 border-b-2">
          <span className="col-span-1"></span>
          <span className="col-span-1">#</span>
          <span className="coin-table">Name</span>
          <span className="coin-table">Price</span>
          <span className="coin-table">24h %</span>
          <span className="hidden lg:block coin-table">Market Cap</span>
          <span className="hidden sm:block coin-table">Chart</span>
        </div>
        {coins.length === 0 && <Spinner />}
        {coins.slice(startIndex, endIndex).map((coin, index) => (
          <div
            className={` transition-all border-b-2 last:border-none py-6 sm:py-5  duration-300  ${
              isDarkMode
                ? "  hover:bg-gradient-to-r from-blue-900 to-SECONDARY_BLACK"
                 : "hover:bg-gradient-to-tr from-blue-200 to-LIGHT_BLUE"
            }`}
            key={coin._id}
          >
            {/* <div className=" border-b " /> */}

            <div
              onClick={() => {
                dispatch(setCoinId(coin.id));
                console.log("dispatch", coin.id);
                navigate(`/coin/${coin.id}`);
              }}
              className="coin-header-table cursor-pointer "
            >
              <span className="col-span-1">
                <FaRegStar />
              </span>
              <span className="col-span-1">{coin?.market_cap_rank}</span>
              <div className="flex items-center gap-1 coin-table">
                <img className="h-5 w-5" src={coin?.image} alt="" />
                <span className=""> {coin?.name.slice(0, 7)}</span>
                <span className="hidden text-SECONDARY_GRAY lg:block">{`(${coin?.symbol})`}</span>
              </div>
              <span className="coin-table">
                {coin?.current_price.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
                {"$"}
              </span>
              <span
                className={`coin-table ${
                  coin!.market_cap_change_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin?.market_cap_change_percentage_24h.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 3 }
                )}
              </span>
              <span className="hidden lg:block coin-table">
                {coin?.market_cap.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
                $
              </span>
              <div className="hidden sm:block coin-table">
                <canvas
                  width={100}
                  height={100}
                  className=" "
                  ref={(el) => el && (chartRefs.current[index] = el)}
                  id={`chart-${coin?.id}`}
                />
              </div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${
          hasPagination
            ? "flex items-center justify-between mt-2 capitalize h-[2rem]"
            : "hidden"
        }`}
      >
        <span className="hidden md:block">
          Data provided by
          <a
            className=" text-green-400 underline"
            href="http://www.coingecko.com"
            rel="noreferrer"
            target={"_blank"}
          >
            CoinGecko
          </a>
        </span>
        <Pagination
          perPage={perPage}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Coins;
