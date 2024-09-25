import { useDispatch, useSelector } from "react-redux";
import {
  displayJournals,
  setDate,
  setJournalId,
} from "../../feature/reducers/journalSlice";
import { RootState } from "../../feature/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Result from "./sidebar/Results";

const Positions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getDate, navPositionType, positionsType, positionsCalenderType } =
    useSelector((state: RootState) => state.journals);
  const date = localStorage.getItem("date");
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const userId = localStorage.getItem("userId");
  const journals = useSelector(displayJournals);
  const userLoginJournals = journals.filter(
    (journal) => journal.user === userId!
  );

  const openPositions =
    positionsType === "all"
      ? userLoginJournals
      : positionsType === "open"
      ? userLoginJournals.filter((journal) => !journal.isClose)
      : positionsType === "loss"
      ? userLoginJournals.filter(
          (journal) => journal.isClose && !journal.results
        )
      : positionsType === "profit"
      ? userLoginJournals.filter(
          (journal) => journal.isClose && journal.results
        )
      : navPositionType === "right"
      ? userLoginJournals.filter((journal) => journal.startDate === date)
      : navPositionType === "left"
      ? userLoginJournals.filter(
          (journal) => !journal.isClose && journal.startDate === date
        )
      : positionsCalenderType === "open"
      ? userLoginJournals.filter(
          (journal) => !journal.isClose && journal.startDate === date
        )
      : positionsCalenderType === "profit"
      ? userLoginJournals.filter(
          (journal) =>
            journal.isClose && journal.results && journal.startDate === date
        )
      : positionsCalenderType === "loss"
      ? userLoginJournals.filter(
          (journal) =>
            journal.isClose && !journal.results && journal.startDate === date
        )
      : userLoginJournals;

  useEffect(() => {
    const storedDate = localStorage.getItem("date");
    dispatch(setDate(storedDate));
  }, [getDate, dispatch]);
  console.log(positionsType);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div
        className={`flex flex-col gap-1 ${
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
        } py-12 h-fit rounded-lg px-6 w-full`}
      >
        {openPositions.map((position) => {
          let bgColor = "bg-orange-500"; // Default color for open positions

          if (position?.isClose) {
            bgColor =
              position?.profit > 0
                ? "bg-green-500" // Closed and profitable
                : "bg-red-500"; // Closed and at a loss
          }

          return (
            <div
              key={position?._id}
              className={`px-5 py-4 rounded-lg font-FONT_VIGA cursor-pointer text-xs sm:text-lg hover:bg-PRIMARY_BLUE ${bgColor}`}
              onClick={() => {
                navigate(`/positions/${position?._id}`);
                dispatch(setJournalId(position?._id));
              }}
            >
              <div className="flex gap-4">
                <p>
                  {position?.baseCoin}/{position?.quoteCoin}
                </p>
                <p>{position?.tradeType}</p>
                <p>{position?.startTime}</p>
                <p>{position?.startDate}</p>
              </div>
            </div>
          );
        })}

        <button
          className="btn btn-primary my-2"
          onClick={() => {
            localStorage.removeItem("date");
            navigate("/journal");
          }}
        >
          Back to Calendar
        </button>
      </div>
    </div>
  );
};

export default Positions;
