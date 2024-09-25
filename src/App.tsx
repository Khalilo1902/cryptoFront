import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import {
  setInputValueSearchBox,
  setIsDarkMode,
  setIsSearchBoxActive,
  setIsSidebarMenuOpen,
  setIsUserPanelJournalOpen,
  setIsUserPanelOpen,
} from "./feature/reducers/appSlice";
import { AppDispatch, RootState } from "./feature/store";
import SidebarMenu from "./components/navbar/menu/SidebarMenu";
import { useEffect, useRef } from "react";
import { checkTokenApi, setUserId } from "./feature/reducers/userSlice";
import Footer from "./components/footer/Footer";
import ButtonTop from "./components/scrollTopButton/ScrollTopButton";

const App = () => {
  const goTopRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    isUserPanelOpen,
    isSidebarMenuOpen,
    isDarkMode,
    isSearchBoxActive,
    inputValueSearchBox,
    isUserPanelJournalOpen,
  } = useSelector((state: RootState) => state.app);
  const { userId } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const checkUserIsLogin = async () => {
      try {
        await dispatch(checkTokenApi()).unwrap();
        dispatch(setUserId(localStorage.getItem("userId")));
      } catch (error: any) {
        localStorage.clear();
        dispatch(setUserId(""));
      }
    };

    checkUserIsLogin();
  }, [userId]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") {
      dispatch(setIsDarkMode(true));
    } else {
      dispatch(setIsDarkMode(false));
    }
  }, [dispatch, isDarkMode]);

  return (
    // <PersistGate loading={null} persistor={persistor}>
    <div
      className={`w-full min-h-screen relative ${
        isDarkMode ? "dark-theme" : " light-theme"
      }`}
      ref={goTopRef}
    >
      <div
        className={`${
          isDarkMode
            ? " bg-SECONDARY_BLACK text-PRIMARY_WHITE"
            : " bg-SECONDARY_WHITE text-PRIMARY_BLACK"
        }`}
      >
        <SidebarMenu />
      </div>

      <div
        className={`ease-in-out duration-300 z-20 backdrop-blur-sm ${
          isSidebarMenuOpen
            ? "w-full min-h-screen absolute inset-0 lg:hidden"
            : "hidden"
        } ${isDarkMode ? " bg-SECONDARY_WHITE/70" : " bg-SECONDARY_BLACK/70"}`}
        onClick={() =>
          isSidebarMenuOpen && dispatch(setIsSidebarMenuOpen(false))
        }
      ></div>

      <div
        className={`min-h-screen z-10`}
        onClick={() => {
          isUserPanelOpen && dispatch(setIsUserPanelOpen(false));
          isSearchBoxActive && dispatch(setIsSearchBoxActive(false));
          inputValueSearchBox && dispatch(setInputValueSearchBox(""));
          isUserPanelJournalOpen && dispatch(setIsUserPanelJournalOpen(false));
        }}
      >
        <header
          className={`py-3 shadow-sm${
            isDarkMode
              ? " bg-SECONDARY_BLACK text-PRIMARY_WHITE"
              : " bg-SECONDARY_WHITE text-PRIMARY_BLACK"
          }`}
        >
          <Navbar />
        </header>
        <main className="min-h-screen w-full">
          <Outlet />
        </main>
        <footer>
          <Footer />
          {/* <UpAndDown goTopRef={goTopRef} /> */}
          <ButtonTop goTopRef={goTopRef} />
        </footer>
      </div>
      <ToastContainer />
    </div>
    // </PersistGate>
  );
};
export default App;
