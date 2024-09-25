import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchSharp } from "react-icons/io5";

import Branding from "./branding/Branding";
import UserControllPanel from "./userControllPanel/UserControllPanel";
import DarkMode from "./darkMode/DarkMode";
import Menu from "./menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSearchBoxActive,
  setIsSidebarMenuOpen,
} from "../../feature/reducers/appSlice";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MaxWithWrapper from "../MaxWithWrapper";
import { RootState } from "../../feature/store";
import SearchBox from "../search/SearchBox";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearchBoxActive } = useSelector((state: RootState) => state.app);
  const userId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : "";

  useEffect(() => {}, [userId, localStorage]);
  return (
    <MaxWithWrapper className="">
      <div
        className={`flex gap-2 items-center ${
          isSearchBoxActive
            ? "hidden"
            : "bg-transparent flex justify-between items-center"
        }`}
      >
        <HiMiniBars3CenterLeft
          className="w-8 h-8  lg:hidden cursor-pointer"
          onClick={() => dispatch(setIsSidebarMenuOpen(true))}
        />
        <div className="w-full grid grid-cols-12 justify-between">
          {/* start nav left */}
          <div className="col-span-6 flex justify-start items-center gap-4">
            {/* Branding */}

            <Branding />

            {/* End Branding */}

            {/* Start Menu */}
            <Menu />
            {/* End Menu */}
          </div>
          {/* End Nav Left */}

          {/* Start Nav Right */}
          <div className="flex gap-4 col-span-6 justify-end items-center transition-all duration-300 relative">
            {/* Start Search Icon */}
            <button
              className=""
              onClick={() => dispatch(setIsSearchBoxActive(true))}
            >
              <IoSearchSharp className="icon" />
            </button>
            {/* End Search Icon */}

            {/* Start Dark Mode */}
            <>
              <DarkMode />
            </>
            {/* End Dark Mode */}
            {userId && userId ? (
              <div>
                <UserControllPanel />
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-primary hidden lg:flex"
                  onClick={() => navigate("/auth")}
                >
                  login / register
                </button>
                <div
                  className="btn btn-primary lg:hidden"
                  onClick={() => navigate("/auth")}
                >
                  <BiLogInCircle className="icon" />
                </div>
              </div>
              /* End btn Log-Reg */
            )}
          </div>
          {/* End Nav Right */}
        </div>
      </div>
      <div>
        <SearchBox />
      </div>
    </MaxWithWrapper>
  );
};

export default Navbar;
