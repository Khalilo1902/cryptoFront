import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import { displayJournals } from "../../feature/reducers/journalSlice";

const ShowPositions = () => {
  const userId = localStorage.getItem("userId");
  const { positionsType } = useSelector((state: RootState) => state.journals);
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const journals = useSelector(displayJournals);
  const userJournals = journals.filter((journal) => journal.user === userId!);
  const userOpenPositions = userJournals.filter((journal) => !journal.isClose);
  const userJournalProfit = userJournals.filter(
    (journal) => journal.isClose && journal.results
  );
  const userJournalLoss = userJournals.filter(
    (journal) => journal.isClose && !journal.results
  );
  const renderedComponents = () => {
    switch (positionsType) {
      case "open":
        return userOpenPositions.map((open, index) => {
          return (
            <div
              className="grid grid-cols-12 px-5 py-2 border-b hover:bg-SECONDARY_GRAY font-FONT_VIGA cursor-pointer"
              key={index}
            >
              <p className="col-span-4">
                {open.baseCoin}/{open.quoteCoin}
              </p>
              <p className="col-span-4">{open.tradeType}</p>
              <p className=" col-span-4">{open.startDate}</p>
            </div>
          );
        });

      case "profit":
        return userJournalProfit.map((open, index) => {
          return (
            <div
              className="grid grid-cols-12 px-5 py-2 border-b hover:bg-SECONDARY_GRAY font-FONT_VIGA cursor-pointer"
              key={index}
            >
              <p className="col-span-4">
                {open.baseCoin}/{open.quoteCoin}
              </p>
              <p className="col-span-4">{open.tradeType}</p>
              <p className=" col-span-4">{open.startDate}</p>
            </div>
          );
        });
      case "loss":
        return userJournalLoss.map((open, index) => {
          return (
            <div
              className="grid grid-cols-12 px-5 py-2 border-b hover:bg-SECONDARY_GRAY font-FONT_VIGA cursor-pointer"
              key={index}
            >
              <p className="col-span-4">
                {open.baseCoin}/{open.quoteCoin}
              </p>
              <p className="col-span-4">{open.tradeType}</p>
              <p className=" col-span-4">{open.startDate}</p>
            </div>
          );
        });
      case "all":
        return userJournals.map((open, index) => {
          return (
            <div
              className="grid grid-cols-12 px-5 py-2 border-b hover:bg-SECONDARY_GRAY font-FONT_VIGA h-fit max-h-96 overflow-y-scroll cursor-pointer"
              key={index}
            >
              <p className="col-span-4 line-clamp-1">
                {open.baseCoin}/{open.quoteCoin}
              </p>
              <p className="col-span-4">{open.tradeType}</p>
              <p className=" col-span-4">{open.startDate}</p>
            </div>
          );
        });
    }
  };
  return (
    <div
      className={`absolute -right-20 -top-24 rounded-lg w-full mr-20 backdrop-blur-sm overflow-hidden ${
        positionsType === "open"
          ? " bg-PRIMARY_ORANGE"
          : positionsType === "all"
          ? " bg-PRIMARY_BLUE"
          : positionsType === "profit"
          ? " bg-SECONDARY_GREEN"
          : positionsType === "loss"
          ? " bg-SECONDARY_RED"
          : "bg-PRIMARY_WHITE"
      } h-fit max-h-96 overflow-y-scroll `}
    >
      {renderedComponents()}
    </div>
  );
};

export default ShowPositions;
