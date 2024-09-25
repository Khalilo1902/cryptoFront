import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import { displayUser } from "../../feature/reducers/userSlice";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  displayJournals,
  setIsShowPositionHeaderActive,
  setNavPositionType,
  setPositionsCalenderType,
  setPositionsType,
} from "../../feature/reducers/journalSlice";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

Chart.register(ChartDataLabels);

interface IHeaderJournalProps {
  month: number;
  setMonth: (month: number) => void;
  years: number;
  setYears: (years: number) => void;
  expJournal: string;
}

const HeaderJournal = ({
  month,
  setMonth,
  years,
  setYears,
  expJournal,
}: IHeaderJournalProps) => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  const journals = useSelector(displayJournals);
  const userJournals = journals.filter((journal) => journal.user === userId!);
  const userOpenPositions = userJournals.filter((journal) => !journal.isClose);
  const userJournalProfit = userJournals.filter((journal) => journal.results);
  const [nameOfMonth, setNameOfMonth] = useState("");
  const dispatch = useDispatch();

  const chartData = {
    labels: ["Open Positions", "Completed Profits", "Completed Losses"],
    datasets: [
      {
        data: [
          userOpenPositions.length,
          userJournalProfit.length,
          userJournals.length -
            (userJournalProfit.length + userOpenPositions.length),
        ],
        backgroundColor: ["orange", "green", "red"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (value: any, context: any) => {
          const total = context.dataset.data.reduce(
            (acc: any, cur: any) => acc + cur,
            0
          );
          if (total === 0) {
            return "";
          }
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#ddddd",
        anchor: "center" as "center", // Hier wird der Typ explizit als "center" angegeben
        align: "center" as "center", // Hier wird der Typ explizit als "center" angegeben
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  const getMonth = () => {
    switch (month) {
      case 1:
        setNameOfMonth("January");
        break;
      case 2:
        setNameOfMonth("February");
        break;
      case 3:
        setNameOfMonth("March");
        break;
      case 4:
        setNameOfMonth("April");
        break;
      case 5:
        setNameOfMonth("May");
        break;
      case 6:
        setNameOfMonth("June");
        break;
      case 7:
        setNameOfMonth("July");
        break;
      case 8:
        setNameOfMonth("August");
        break;
      case 9:
        setNameOfMonth("September");
        break;
      case 10:
        setNameOfMonth("October");
        break;
      case 11:
        setNameOfMonth("November");
        break;
      case 12:
        setNameOfMonth("December");
        break;
    }
  };

  const handleNextArrow = () => {
    if (month < 12) setMonth(month + 1);
    else {
      setMonth(1);
      setYears(years + 1);
    }
  };
  const handlePrevArrow = () => {
    if (month > 1) setMonth(month - 1);
    else {
      setMonth(12);
      setYears(years - 1);
    }
  };
  useEffect(() => {
    getMonth();
  }, [month]);

  return (
    <div
      className={`grid grid-cols-12 justify-between  w-full my-12 py-6 px-5 rounded-lg ${
        isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
      }`}
    >
      <div className="col-span-6 md:col-span-8 flex flex-col">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full w-12 h-12 sm:w-20 sm:h-20"
            src={user?.profile_photo}
            alt=""
          />
          <div className=" font-FONT_VIGA font-bold w-full">
            <div className="flex items-center justify-between  w-full">
              <p className=" text-sm sm:text-lg">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <p className=" text-PRIMARY_GRAY">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center ">
          <div className="flex flex-col sm:flex-row justify-center items-center w-fit gap-2">
            <div className="flex items-center sm:gap-6 font-FONT_VIGA">
              <FaArrowRight
                className=" rotate-180 cursor-pointer text-xs  sm:text-lg "
                onClick={handlePrevArrow}
              />
              <p className="text-xs sm:text-sm md:text-xl w-32 sm:w-40  text-center">
                {nameOfMonth} {years}
              </p>
              <FaArrowRight
                className=" cursor-pointer text-xs  sm:text-lg "
                onClick={handleNextArrow}
              />
            </div>
            <div>
              <button
                className="px-2 py-1 bg-SECONDARY_BLUE rounded-lg w-fit text-center"
                onClick={() => {
                  setMonth(new Date().getMonth() + 1);
                  setYears(new Date().getFullYear());
                }}
              >
                Today
              </button>
            </div>
          </div>

          <p className=" font-FONT_VIGA text-SECONDARY_GRAY py-6">
            {expJournal.slice(1)}
          </p>
        </div>
      </div>

      <div className="col-span-6 md:col-span-4 flex justify-end w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12  text-xs font-FONT_VIGA md:font-bold">
          <div className="w-32 h-32 md:w-36 md:h-36">
            <Pie data={chartData} options={chartOptions} />
          </div>
          <div className="flex md:flex-col gap-1">
            <div
              className="text-center  w-full px-3 py-1 h-fit bg-PRIMARY_ORANGE rounded-lg cursor-pointer "
              onClick={() => {
                dispatch(setPositionsType("open"));
                dispatch(setPositionsCalenderType("fake"))
                dispatch(setNavPositionType("fake"))
                navigate("/positions");
              }}
            >
              <p className="">{userOpenPositions.length}</p>
            </div>
            <div
              className="text-center w-full px-3 py-1 h-fit bg-SECONDARY_GREEN rounded-lg cursor-pointer"
              onClick={() => {
                dispatch(setPositionsType("profit"));
                dispatch(setPositionsCalenderType("fake"))
                dispatch(setNavPositionType("fake"))
                navigate("/positions");
              }}
            >
              <p>{userJournalProfit.length}</p>
            </div>
            <div
              className="text-center w-full px-3 py-1 h-fit bg-SECONDARY_RED rounded-lg cursor-pointer"
              onClick={() => {
                dispatch(setPositionsType("loss"));
                dispatch(setPositionsCalenderType("fake"))
                dispatch(setNavPositionType("fake"))
                navigate("/positions");
              }}
            >
              <p className="">
                {userJournals.length -
                  (userJournalProfit.length + userOpenPositions.length)}{" "}
              </p>
            </div>
            <div
              className="text-center w-full px-3 py-1 h-fit bg-PRIMARY_BLUE rounded-lg cursor-pointer"
              onClick={() => {
                dispatch(setPositionsType("all"));
                dispatch(setPositionsCalenderType("fake"))
                dispatch(setNavPositionType("fake"))
                navigate("/positions");
              }}
            >
              <p className="">{userJournals.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderJournal;
