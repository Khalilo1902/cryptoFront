import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { displayCoin } from "../../feature/reducers/coinSlice";
import { RootState } from "../../feature/store";
import { ICoin } from "../../interface";
import { useEffect, useRef } from "react";
import Spinner from "../Spinner";

const Coin = () => {
  const { coinId } = useSelector((state: RootState) => state.coins);
  const coin = useSelector((state: RootState) => displayCoin(state, coinId));
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const chartRef = useRef<HTMLCanvasElement>(null);

  const renderChart = (canvas: HTMLCanvasElement, item: ICoin) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    if (Chart.getChart(canvas)) {
      Chart.getChart(canvas)!.destroy();
    }

    const sparklineData = item.sparkline_in_7d.price;
    if (sparklineData.length === 0) {
      return;
    }
    const chartOptions = {
      plugins: {
        legend: { display: false },
        datalabels: {
          display: false, // Deaktiviere die Anzeige der Datenlabels
        },
      },
      responsive: true,
      maintainAspectRatio: true,
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
              if (index === 0) return "rgb(255, 99, 132)";

              const prevPrice = array[index - 1];
              return price > prevPrice
                ? "rgb(75, 192, 192)"
                : "rgb(255, 99, 132)";
            }),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      options: chartOptions,
    });
  };

  useEffect(() => {
    if (coin && chartRef.current) {
      renderChart(chartRef.current, coin);
    }
  }, [coin]);
  if (coin) {
    return (
      <div
        className={`flex flex-col justify-center my-6 gap-8 overflow-hidden rounded-2xl  ${
          isDarkMode ? "bg-SECONDARY_BLACK " : " bg-SECONDARY_WHITE"
        }`}
      >
        <div
          className={`text-center  bg-PRIMARY_BLUE text-SECONDARY_WHITE py-12`}
        >
          <h1>CryptoHunter</h1>
        </div>

        <div className=" grid md:grid-cols-12 px-5 grid-cols-1 ">
          <div className="w-full flex flex-col gap-4 items-center col-span-6 md:border-r h-64">
            <img src={coin.image} alt="" className=" w-40 h-40 rounded-lg" />
            <p className="text-lg font-semibold">{coin?.name}</p>{" "}
            <p className="text-2xl text-center leading-relaxed">
              {" "}
              <span className="font-FONT_VIGA font-semibold">
                Market_cap_rank:{" "}
              </span>{" "}
              {coin?.market_cap_rank}{" "}
            </p>
          </div>
          <div className="col-span-6  flex justify-center">
            <canvas ref={chartRef} id={`chart-${coin.id}`} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-center mt-8 gap-8 px-8 pb-12">
          <div
            className={`${
              isDarkMode
                ? "bg-PRIMARY_BLACK text-gray-200"
                : " bg-PRIMARY_WHITE !text-PRIMARY_BLACK"
            } flex-1 rounded-lg p-6 shadow-md `}
          >
            <p className="text-lg font-semibold mb-4">Name</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              {coin?.name}
            </p>
            <p className="text-lg font-semibold mb-4">Symbol</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              {coin?.symbol}
            </p>
            <p className="text-lg font-semibold mb-4">Current Price</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.current_price || 0}
            </p>
            <p className="text-lg font-semibold mb-4">Market Cap</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.market_cap}
            </p>

            <p className="text-lg font-semibold mb-4">Total Volume</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.total_volume}
            </p>
            <p className="text-lg font-semibold mb-4">High 24h</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.high_24h}
            </p>
            <p className="text-lg font-semibold mb-4">Low 24h</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.low_24h}
            </p>
          </div>
          {/* 2 */}
          <div
            className={`${
              isDarkMode
                ? "bg-PRIMARY_BLACK text-gray-200"
                : " bg-PRIMARY_WHITE !text-PRIMARY_BLACK"
            } flex-1 rounded-lg p-6 shadow-md `}
          >
            <p className="text-lg font-semibold mb-4">Price Change 24h</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.price_change_24h}
            </p>
            <p className="text-lg font-semibold rounded-lg px-2 mb-4">
              Price Change Percentage 24h
            </p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              % {coin?.price_change_percentage_24h}
            </p>
            <p className="text-lg font-semibold rounded-lg px-2 mb-4">
              Market Cap Change 24h
            </p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.market_cap_change_24h}
            </p>
            <p className="text-lg font-semibold rounded-lg px-2 mb-4 line-clamp-1">
              Market Cap Change Percentage 24h
            </p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              % {coin?.market_cap_change_percentage_24h}
            </p>
            <p className="text-lg font-semibold mb-4">Circulating Supply</p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.circulating_supply}
            </p>
            <p className="text-lg font-semibold rounded-lg px-2 mb-4">
              Total Supply
            </p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.total_supply}
            </p>
            <p className="text-lg font-semibold rounded-lg px-2 mb-4">
              Max Supply
            </p>
            <p
              className={`coin-item-p ${
                isDarkMode ? "coin-item-p-dark" : "coin-item-p-light"
              }`}
            >
              $ {coin?.max_supply}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Coin;
