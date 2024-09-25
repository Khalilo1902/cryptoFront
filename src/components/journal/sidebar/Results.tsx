import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsProfit } from "../../../feature/reducers/appSlice";
import { RootState } from "../../../feature/store";

interface IResultProps {
  resultValue: string;

  setResultValue: (resultValue: string) => void;
}

// Start User Panel
const panelItem = [
  {
    title: "Profit",
  },
  {
    title: "Loss",
  },
];
// End User Panel

const Result = ({ resultValue, setResultValue }: IResultProps) => {
  const { isProfit, isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`flex items-center gap-2 bg-transparent p-2 rounded-lg cursor-pointer border-2 hover:border-SECONDARY_GRAY w-1/2 justify-between`}
        onClick={() => dispatch(setIsProfit(!isProfit))}
      >
        {resultValue}
        <div className={`flex text-lg gap-1 font-FONT_VIGA`}></div>
        <IoIosArrowDown
          className={`flex w-6 h-6  transition-all duration-300 ${
            isProfit ? "rotate-180" : "rotate-0"
          }
          `}
        />
      </div>
      <div
        className={`absolute top-18 rounded-lg left-0 sm:right-0 transition-all duration-300 z-50 overflow-hidden border${
            isProfit
            ? "  w-1/2 h-fit   opacity-100"
            : "h-0 w-32 border-none opacity-0"
        } ${
          isDarkMode
            ? "bg-PRIMARY_BLACK text-PRIMARY_WHITE border-SECONDARY_WHITE"
            : " bg-PRIMARY_WHITE text-PRIMARY_BLACK border-SECONDARY_BLACK"
        }`}
      >
        {panelItem.map((item, index) => (
          <div
            key={index}
            className={`py-4 px-5 flex items-center gap-4 cursor-pointer transition-all duration-300 uppercase justify-between group ${
              !isProfit && "hidden"
            }  hover:bg-PRIMARY_ORANGE border-b-2`}
            onClick={async () => {
              switch (item.title) {
                case "Profit":
                  dispatch(setIsProfit(false));
                  setResultValue("Profit");

                  break;
                case "Loss":
                  dispatch(setIsProfit(false));
                  setResultValue("Loss");
                  break;
              }
            }}
          >
            <div className="flex items-center gap-4">
              <span> {item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Result;
