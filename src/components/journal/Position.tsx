import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import {
  displayJournal,
  setIsClosePositionJournalActive,
  setIsDeleteJournalPositionActive,
  setIsJournalPositionOpenEditActive,
} from "../../feature/reducers/journalSlice";
import { useNavigate } from "react-router-dom";
import EditInitiateTrade from "./sidebar/EditInitiateTrade";


import DeletePositionJournal from "./sidebar/DeletePositionJournal";
import EditClosePositionJournal from "./EditClosePositionJournal";

const Position = () => {
 
  const {
    journalId,
    isJournalPositionOpenEditActive,
    isDeleteJournalPositionActive,
  } = useSelector((state: RootState) => state.journals);
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const journal = useSelector((state: RootState) =>
    displayJournal(state, journalId)
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative  ">
      <div
        className={`flex flex-col gap-1 ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } py-12 h-fit my-12 rounded-lg px-6 w-full `}
      >
        <div
          className={`
            px-12 py-8 rounded-lg font-FONT_VIGA cursor-pointer text-xs sm:text-lg  flex flex-col gap-4`}
        >
          <table className="">
            <thead className=" border-b-2 ">
              <tr className=" ">
                <th className="py-2  text-start text-PRIMARY_BLUE font-FONT_VIGA w-1/2">
                  Description
                </th>
                <th className="py-2 w-1/2 text-start text-PRIMARY_BLUE font-FONT_VIGA">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Base/Quote Coin</td>
                <td className="py-2">
                  {journal?.baseCoin}/{journal?.quoteCoin}
                </td>
              </tr>
              <tr>
                <td className="py-2">Trade Type</td>
                <td className="py-2">{journal?.tradeType}</td>
              </tr>
              <tr>
                <td className="py-2">Start Time</td>
                <td className="py-2">{journal?.startTime}</td>
              </tr>
              <tr>
                <td className="py-2">Start Date</td>
                <td className="py-2">{journal?.startDate}</td>
              </tr>
              <tr>
                <td className="py-2">Price</td>
                <td className="py-2">$ {journal?.price}</td>
              </tr>
              <tr>
                <td className="py-2">Take Profit</td>
                <td className="py-2">$ {journal?.takeProfit}</td>
              </tr>
              <tr>
                <td className="py-2">Stop Loss</td>
                <td className="py-2">$ {journal?.stopLoss}</td>
              </tr>
              <tr>
                <td className="py-2">Risk & Reward</td>
                <td className="py-2">{journal?.riskReward}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className=" flex flex-col ">
              <p className={`py-2 w-full text-center text-PRIMARY_GRAY `}>
                Reasons for Entry
              </p>
              <p className="py-2">{journal?.reasonsforEntry}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="px-7 py-1 bg-SECONDARY_RED rounded-lg my-2"
            onClick={() => {
              dispatch(setIsDeleteJournalPositionActive(true));
            }}
          >
            Delete
          </button>
          <button
            className="px-7 py-1 bg-SECONDARY_ORANGE rounded-lg my-2"
            onClick={() => {
              dispatch(setIsJournalPositionOpenEditActive(true));
            }}
          >
            Edit
          </button>
          <button
            className="px-7 py-1 bg-SECONDARY_GREEN rounded-lg my-2"
            onClick={() => {
              dispatch(setIsClosePositionJournalActive(true));
            }}
          >
            Close Position
          </button>
          <button
            className="btn btn-primary my-2"
            onClick={() => {
              navigate("/positions");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div
        className={`sm:bg-DARK_BLUE/80 backdrop-blur-sm w-full h-screen fixed inset-0 z-50 ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        }  ${!isJournalPositionOpenEditActive && "hidden"}`}
      >
        <EditInitiateTrade />
      </div>
      <div className={`${!isDeleteJournalPositionActive && "hidden"}`}>
        <DeletePositionJournal />
      </div>
      <div
        className={` sm:bg-DARK_BLUE/80 backdrop-blur-sm w-full h-screen fixed inset-0 z-50 ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } ${!isJournalPositionOpenEditActive && "hidden"}`}
      >
        <EditClosePositionJournal />
      </div>
    </div>
  );
};

export default Position;
