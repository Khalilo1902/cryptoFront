import { useSelector } from "react-redux";


import { useNavigate } from "react-router-dom";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { RootState } from "../feature/store";

const NotFound = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  return (
    <div
      className={`h-screen w-full ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="flex justify-center items-center h-full w-full">
        <div
          className={`flex flex-col lg:flex-row gap-4 font-FONT_VIGA  items-center  py-6 rounded-lg w-fit ${
            isDarkMode ? "light-theme" : "dark-theme"
          } px-6`}
        >
          <div className="flex items-center text-9xl bg-PRIMARY_ORANGE w-fit py-6 px-2 rounded-lg  gap-5 justify-center">
            <BsFillEmojiFrownFill className=" text-PRIMARY_GRAY" />
            <p>404</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-3xl text-SECONDARY_ORANGE">Ooops...</p>
            <p
              className={`${
                isDarkMode ? " text-PRIMARY_BLACK" : " text-PRIMARY_WHITE"
              }`}
            >
              Page Not Found
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/home", { replace: true });
              }}
            >
              Go To Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
