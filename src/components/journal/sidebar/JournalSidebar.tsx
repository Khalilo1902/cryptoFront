import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { setIsJournalSideBarActive } from "../../../feature/reducers/appSlice";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { useEffect } from "react";
import { BsPersonWorkspace } from "react-icons/bs";

import InitiateATrade from "./InitiateATrade";
import { setDate } from "../../../feature/reducers/journalSlice";

interface IJournalSidebarProps {
  index: number;
  setIndex: (index: number) => void;
}

const JournalSidebar = ({ index }: IJournalSidebarProps) => {
  const dispatch = useDispatch();
  const { isDarkMode, isJournalSideBarActive } = useSelector(
    (state: RootState) => state.app
  );
  const { getDate } = useSelector((state: RootState) => state.journals);

  const nameDayOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const day = Number(getDate!.slice(0, 2));
  const calculateDayIndex = (day: number, index: number): number => {
    return (day - 1 + index) % nameDayOfWeek.length;
  };

  useEffect(() => {
    dispatch(setDate(getDate));
  }, [getDate, setDate]);

  const getDayName = (): string => {
    const dayIndex = calculateDayIndex(day, index);
    return nameDayOfWeek[dayIndex];
  };

  return (

      <div
        className={`fixed top-0 right-0  h-full z-50 ${
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
        } ${
          isJournalSideBarActive
            ? "w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col shadow-md translate-x-0"
            : "translate-x-full"
        } ease-in-out duration-300`}
      >
        <div
          className={`${
            isJournalSideBarActive ? "" : "invisible"
          } duration-300`}
        >
          <div className="flex items-center justify-between gap-3 container px-5 shadow-sm py-4">
            <p
              className={` ${
                isJournalSideBarActive ? "opacity-100" : "opacity-0"
              } duration-300 font-FONT_VIGA font-bold text-xl`}
            >
              {day <= 7
                ? nameDayOfWeek[calculateDayIndex(day, index)]
                : getDayName()}{" "}
              - {getDate}
            </p>
            <div className="p-1 rounded-lg bg-LIGHT_GRAY hover:bg-DARK_GRAY">
              <IoClose
                className="w-8 h-8 flex cursor-pointer text-SECONDARY_BLACK"
                onClick={() => dispatch(setIsJournalSideBarActive(false))}
              />
            </div>
          </div>
        </div>
        <div className="my-4 px-5 ">
          <p className=" text-lg text-PRIMARY_GRAY">
            Join the ranks of smart traders and reap the benefits of recording
            your trades.
          </p>
        </div>

        {/* Box info von Trade */}
        <div className="my-4 mx-5 p-5 border-2 border-LIGHT_GRAY rounded-xl ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg">
              <BsPersonWorkspace />
              <p className="">Work</p>
            </div>
            <div className="p-1 rounded-lg bg-LIGHT_GRAY hover:bg-DARK_GRAY">
              <IoTrashOutline className="w-6 h-6 flex cursor-pointer text-SECONDARY_BLACK" />
            </div>
          </div>

          <InitiateATrade date={getDate} />
        </div>
        {/* End Box info von Trade */}
      </div>
   
  );
};

export default JournalSidebar;
