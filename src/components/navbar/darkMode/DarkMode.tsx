import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";


import { RxMoon } from "react-icons/rx";
import { RootState } from "../../../feature/store";
import { setIsDarkMode } from "../../../feature/reducers/appSlice";



const DarkMode = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  return (
    <div className={` cursor-pointer`}>
      <MdOutlineWbSunny
        className={`${
          isDarkMode
            ? "hidden"
            : "icon hover:text-BRAND_COLOR transition-all duration-300"
        }`}
        onClick={() => {
          dispatch(setIsDarkMode(true));
          localStorage.setItem("theme", "true");
        }}
      />
      <RxMoon
        className={`${
          isDarkMode
            ? "icon hover:text-BRAND_COLOR transition-all duration-300"
            : "hidden"
        }`}
        onClick={() => {
          dispatch(setIsDarkMode(false));
          localStorage.setItem("theme", "false");
        }}
      />
    </div>
  );
};

export default DarkMode;
