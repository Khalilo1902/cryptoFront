import { useDispatch, useSelector } from "react-redux";
import {
  displayJournals,
  setDate,
  setNavPositionType,
  setPositionsCalenderType,
  setPositionsType,
} from "../../feature/reducers/journalSlice";
import { IoIosTimer } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../feature/store";

const NavLeft = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const { positionsType } = useSelector((state: RootState) => state.journals);

  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journals = useSelector(displayJournals);

  const userJournals = journals
    .filter((journal) => !journal.isClose && journal.user === userId!)
    .sort((a, b) =>
      new Date(b.startDate)
        .toLocaleDateString()
        .localeCompare(new Date(a.startDate).toLocaleDateString())
    );

  const journalCounts: { [key: string]: number } = userJournals.reduce(
    (counts, journal) => {
      counts[journal.startDate] = (counts[journal.startDate] || 0) + 1;
      return counts;
    },
    {} as { [key: string]: number }
  );

  return (
    <div
      className={`w-full ${
        isDarkMode
          ? " bg-SECONDARY_BLACK text-PRIMARY_WHITE"
          : " bg-SECONDARY_WHITE text-PRIMARY_BLACK"
      } `}
    >
      <div className="flex justify-center w-full bg-PRIMARY_BLUE h-20 rounded-t-lg items-center mb-4">
        <h3>Open Positions</h3>
      </div>

      <div className={`p-4 overflow-y-auto `} style={{ maxHeight: "700px" }}>
        <div
          className={`grid grid-cols-12 gap-4 border-b pb-3 justify-items-center font-FONT_VIGA `}
        >
          <div className="col-span-2">-</div>
          <div className="col-span-6 text-sm">Date</div>
          <div className="col-span-1 text-sm">Open</div>
          <div className="col-span-3 text-sm">Close</div>
        </div>

        {Object.entries(journalCounts).map(([startDate, count]) => (
          <div
            key={startDate}
            className={`grid grid-cols-12 gap-4 border-b-2 hover:bg-SECONDARY_BLUE cursor-pointer text-xs justify-items-center  hover:font-FONT_VIGA  hover:scale-110 hover:shadow-sm`}
          >
            <div className="col-span-1 flex items-center justify-center">
              <IoIosTimer className="text-xl ml-4" />
            </div>
            <div
              onClick={() => {
                dispatch(setNavPositionType("left"));
                dispatch(setPositionsType("fake"));
                dispatch(setPositionsCalenderType("fake"));

                navigate("/positions");

                dispatch(setDate(startDate));
                localStorage.setItem("date", startDate);
              }}
              className={`py-3 px-4 border-l col-span-7`}
            >
              {startDate}
            </div>
            <div className={`py-3 px-4 border-l col-span-1`}>{count}</div>
            <div className={`py-3 px-4 border-l col-span-3`}>
              <button>
                <MdDoubleArrow className="text-sm hover:text-SECONDARY_RED" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
