import { NavLink } from "react-router-dom";
import { menuItem } from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { setIsSidebarMenuOpen } from "../../../feature/reducers/appSlice";
import { RootState } from "../../../feature/store";
import Branding from "../branding/Branding";

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const { isSidebarMenuOpen } = useSelector((state: RootState) => state.app);

  const items = menuItem;
  
  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 lg:hidden box-theme ${
        isSidebarMenuOpen ? "w-2/3 sm:w-1/2 md:w-1/3 flex flex-col shadow-md translate-x-0" : "-translate-x-full"
      } ease-in-out duration-300`}
    >
      <div className={`${isSidebarMenuOpen ? "" : "invisible"} duration-300`}>
        <div className={`flex items-center justify-start gap-3 container px-5 shadow-sm py-4`}>
          <HiMiniBars3CenterLeft
            className="w-8 h-8 flex lg:hidden cursor-pointer"
            onClick={() => dispatch(setIsSidebarMenuOpen(false))}
          />
          <Branding />
          <p className={`font-FONT_VIGA ${isSidebarMenuOpen ? "opacity-100" : "opacity-0"} duration-300`}>
            Crypto Currency
          </p>
        </div>
        <nav className={`flex flex-col text-xl font-FONT_VIGA ${isSidebarMenuOpen ? "opacity-100" : "opacity-0"} duration-300`}>
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={`flex w-full py-5 px-5 gap-3 transition-all duration-300 items-center justify-between group cursor-pointer hover:bg-PRIMARY_ORANGE`}
              onClick={() => dispatch(setIsSidebarMenuOpen(false))}
            >
              <div className="flex gap-3 items-center">
                <span>{item.icon}</span>
                {item.title}
              </div>
              <div className="hidden group-hover:flex animate-pulse">
                <span className="animate-bounce">{item.arrowIcon}</span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;
