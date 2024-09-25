import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { displayUser } from "../../feature/reducers/userSlice";
import { useState } from "react";
import { createCommentApi } from "../../feature/reducers/commentSlice";
import { NotificationService } from "../../services/notificationServices";

interface ICreateCommentProps {
  components: "post" | "analyze" | "news";
  postIdPublic: string;
}
const CreateComment = ({ components, postIdPublic }: ICreateCommentProps) => {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  const [inputValue, setInputValue] = useState("");
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      console.log("userId", userId);
      console.log("postIdPublic", postIdPublic);

      switch (components) {
        case "post":
          console.log("post");
          try {
            await dispatch(
              createCommentApi({
                postIdPublic,
                post: postIdPublic,
                comment: inputValue,
              })
            ).unwrap();
            setInputValue("");
          } catch (error: any) {
            NotificationService.error(error.message);
          }
          break;
        case "news":
          try {
            await dispatch(
              createCommentApi({
                postIdPublic,
                post: postIdPublic,
                comment: inputValue,
              })
            ).unwrap();
            setInputValue("");
          } catch (error: any) {
            NotificationService.error(error.message);
          }
          break;
        case "analyze":
          try {
            await dispatch(
              createCommentApi({
                postIdPublic,
                post: postIdPublic,
                comment: inputValue,
              })
            ).unwrap();
            setInputValue("");
          } catch (error: any) {
            NotificationService.error(error.message);
          }
          break;
      }
    }
  };
  return (
    <div
      className={`w-full h-fit my-4 rounded-lg font-FONT_VIGA ${
        // Dynamische Klasse für den Hintergrund basierend auf dem Dark-Mode-Status
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      }`}
    >
      <div className=" w-full ">
        <div className="flex gap-2 px-3 py-5 w-full">
          {/* Profilfoto des Benutzers */}
          <img
            className="w-[46px] h-[46px] rounded-full"
            src={user?.profile_photo}
            alt=""
          />
          {/* Eingabefeld für den Beitrag */}
          <li
            className={`!text-[10px] sm:!text-base list-none w-full  ${
              // Dynamische Klasse für das Eingabefeld basierend auf dem Dark-Mode-Status
              isDarkMode ? "input-dark" : "input-light"
            }`}
            // Platzhaltertext für das Eingabefeld
          >
            <input
              className={`w-full outline-none border-none py-1 px-4 rounded-lg ${
                isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
              }`}
              type="text"
              value={inputValue}
              placeholder={` ${user?.firstName}`}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </li>
        </div>
        {/* Trennlinie */}
      </div>
    </div>
  );
};

export default CreateComment;
