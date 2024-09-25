import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { displayUser } from "../../../feature/reducers/userSlice";
import {
  setIsPostComponentActive,
  setIsSpinnerActive,
} from "../../../feature/reducers/appSlice";

const PostAdd = () => {
  // Selektiere den aktuellen Dark-Mode-Status aus dem Redux-Store
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  // Hole die Benutzer-ID aus dem lokalen Speicher
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  // Selektiere den Benutzer anhand der Benutzer-ID aus dem Redux-Store
  const user = useSelector((state: RootState) => displayUser(state, userId!));

  return (
    <div
      className={`w-full h-fit my-4 rounded-lg font-FONT_VIGA cursor-pointer ${
        // Dynamische Klasse für den Hintergrund basierend auf dem Dark-Mode-Status
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      }`}
    >
      <div>
        <div className="flex gap-2 px-3 py-5">
          {/* Profilfoto des Benutzers */}
          <img
            className="w-[46px] h-[46px] rounded-full"
            src={user?.profile_photo}
            alt=""
          />
          {/* Eingabefeld für den Beitrag */}
          <li
            className={`!text-[10px] sm:!text-base list-none ${
              // Dynamische Klasse für das Eingabefeld basierend auf dem Dark-Mode-Status
              isDarkMode ? "input-dark" : "input-light"
            }`}
            // Platzhaltertext für das Eingabefeld

            onClick={() => {
              dispatch(setIsPostComponentActive(true));
              dispatch(setIsSpinnerActive(false));
            }}
          >{`What's on your mind, ${user?.firstName}?`}</li>
        </div>
        {/* Trennlinie */}
      </div>
    </div>
  );
};

export default PostAdd;
