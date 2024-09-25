import { useState } from "react";
import ChangePassword from "../components/user/profile/ChangePassword";
import MaxWithWrapper from "../components/MaxWithWrapper";
import EditProfileInfo from "../components/user/profile/EditProfileInfo";
// Importiere die neue Komponente
import { CgProfile } from "react-icons/cg";
import { MdWifiPassword } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../feature/store";
import DeleteAccount from "../components/user/profile/DeleteAccount";
import { TbGitBranchDeleted } from "react-icons/tb";

import VerifyAccount from "../components/user/profile/VerifyAccount";

import { GoVerified } from "react-icons/go";
import { displayUser } from "../feature/reducers/userSlice";
import { SiTestrail } from "react-icons/si";
import ExamRequest from "../components/user/profile/ExamRequest";


const SettingProfilePage = () => {
  const [activeButton, setActiveButton] = useState("profile");
  const { isDarkMode } = useSelector((state: RootState) => state.app);
const userId = localStorage.getItem("userId")

const user = useSelector((state:RootState)=>displayUser(state,userId || ""))
console.log("userIsVerifyAccount",user?.isAccountVerified)
console.log("user",user)
  return (
    <MaxWithWrapper className="my-6 ">
      <div className="flex  flex-col w-full lg:flex-row gap-5">
        <div
          className={`h-fit flex flex-col w-full lg:w-2/3 text-xl rounded-xl font-boldrounded-lg  overflow-hidden ${
            isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
          }`}
        >
          {/* Buttons für die Profil- und Passwortbearbeitung */}
          <button
            className={`flex w-full items-center justify-start gap-8 hover:bg-LIGHT_BLUE hover:text-DARK_BLUE px-4 shadow-lg py-7 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } ${
              activeButton == "profile"
                ? "!bg-DARK_BLUE !text-SECONDARY_WHITE"
                : ""
            }`}
            onClick={() => setActiveButton("profile")}
          >
            <CgProfile className="text-3xl" />
            <p>Profile</p>
          </button>


          <button
            className={` flex h-fit w-full items-center justify-start gap-8 hover:bg-LIGHT_BLUE hover:text-DARK_BLUE px-4 shadow-lg py-7 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } ${
              activeButton == "password"
                ? "!bg-DARK_BLUE !text-SECONDARY_WHITE"
                : ""
            }`}
            onClick={() => setActiveButton("password")}
          >
            <MdWifiPassword className="text-3xl" />
            <p>Password</p>
          </button>

          <button
            className={`flex w-full h-fit items-center justify-start gap-8 hover:bg-LIGHT_BLUE hover:text-DARK_BLUE px-4 shadow-lg py-7 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } ${
              activeButton == "verify"
                ? "!bg-DARK_BLUE !text-SECONDARY_WHITE"
                : ""
            }`}
            onClick={() => setActiveButton("verify")} 
          >
            <GoVerified  className="text-3xl" />
            <p>Verify Acount</p>
          </button>

          <button
            className={`flex w-full h-fit items-center justify-start gap-8 hover:bg-LIGHT_BLUE hover:text-DARK_BLUE px-4 shadow-lg py-7 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } ${
              activeButton == "exam"
                ? "!bg-DARK_BLUE !text-SECONDARY_WHITE"
                : ""
            }`}
            onClick={() => setActiveButton("exam")} 
          >
            <SiTestrail  className="text-3xl" />
            <p>Request for examination</p>
          </button>

          {/* Button für die deleteAccount Komponente */}
          <button
            className={`flex w-full h-fit items-center justify-start gap-8 hover:bg-LIGHT_BLUE hover:text-DARK_BLUE px-4 shadow-lg py-7 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } ${
              activeButton == "Delete"
                ? "!bg-DARK_BLUE !text-SECONDARY_WHITE"
                : ""
            }`}
            onClick={() => setActiveButton("Delete")} // Aktiviere die delete Account component bei Klick
          >
            <TbGitBranchDeleted  className="text-3xl" />
            <p>Delete Account</p>
          </button>
        </div>
        <div className="w-full">
          {/* Rendern der entsprechenden Komponente basierend auf dem aktiven Button */}
          {activeButton === "profile" ? (
            <EditProfileInfo />
          ) : activeButton === "password" ? (
            <ChangePassword />
          ) : activeButton === "Delete" ? (
            <DeleteAccount />
          ): activeButton === "exam" ? (
            <ExamRequest />
          ) : activeButton === "verify" ? 

           <VerifyAccount/>:null}{" "}
           

          {/* Falls activeButton nicht "profile", "password" oder "delete" ist, render nichts */}
        </div>
      </div>
    </MaxWithWrapper>
  );
};

export default SettingProfilePage;