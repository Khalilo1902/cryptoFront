import { IoMdClose } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { displayUser } from "../../../feature/reducers/userSlice";
import { IUser } from "../../../interface";
import {
  selectPostsByUser,
} from "../../../feature/reducers/postSlice";
import { useParams } from "react-router-dom";

import ShowTime from "../../showTime/ShowTime";
import { CiEdit } from "react-icons/ci";
import {
  setIsDeleteComponentActive,
  setIsEditComponentActive,
  setIsSpinnerActive,
  setPostIdPublic,

} from "../../../feature/reducers/appSlice";

const Post = () => {
  const dispatch = useDispatch();
  // Selektiere den aktuellen Dark-Mode-Status aus dem Redux-Store
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const commentProfile = localStorage.getItem("userId");
  const userCommentProfile = useSelector((state: RootState) =>
    displayUser(state, commentProfile!)
  );

  // Hole die Benutzer-ID aus dem lokalen Speicher
  const { userId } = useParams();
  // Selektiere den Benutzer anhand der Benutzer-ID aus dem Redux-Store
  const user: IUser = useSelector((state: RootState) =>
    displayUser(state, userId!)
  );

  const userPosts = useSelector((state: RootState) =>
    selectPostsByUser(userId!)(state)
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {userPosts.map((post) => (
        <div
          key={post._id}
          className={`rounded-xl py-3 font-FONT_VIGA ${
            // Dynamische Klasse für den Hintergrund basierend auf dem Dark-Mode-Status
            isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
          }`}
        >
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-2">
              {/* Profilbild des Benutzers */}
              <div>
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={user?.profile_photo}
                  alt=""
                />
              </div>
              {/* Benutzername und Zeitstempel */}
              <div className="flex flex-col">
                <p>{user?.firstName}</p>
                <div className="text-slate-400 text-xs">
                  <ShowTime timestamp={post?.updatedAt} />
                </div>
              </div>
            </div>
            {/* Optionen-Menü */}
            <div className="flex items-center text-2xl gap-2">
              <CiEdit
                className=" cursor-pointer"
                onClick={() => {
                  dispatch(setPostIdPublic(post._id));
                  dispatch(setIsEditComponentActive(true));
                  dispatch(setIsSpinnerActive(false));
                }}
              />
              <IoMdClose
                className=" cursor-pointer"
                onClick={() => {
                  dispatch(setPostIdPublic(post._id));
                  dispatch(setIsDeleteComponentActive(true));
                  dispatch(setIsSpinnerActive(false));
                }}
              />
            </div>
          </div>
          {/* Beitragstext */}
          <div className="px-3 py-2">
            <p className="font-FONT_VIGA font-bold">{post.title.slice(0,50)}...</p>
          </div>

          {/* Bild */}
          <div className="mx-3 rounded-sm">
            <img
              className="w-full  rounded-lg"
              src={String(post?.image) || ""}
              alt=""
            />
          </div>
          <div className="py-4 px-3 border-b h-32">
            <p>{post.description.slice(0,200)}...</p>
          </div>
          {/* Interaktionsbereich */}
          <div className="flex justify-between items-center px-3 mt-2">
            {/* Like- und Teilen-Buttons */}
            <div className="flex items-center gap-2">
              <BiSolidLike />
              <p>like</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-2">
                <FaComment />
                <p>6</p>
              </span>
              <span className="flex items-center gap-2">
                <IoMdShareAlt />
                <p>6</p>
              </span>
            </div>
          </div>
          {/* Trennlinie */}
          <div className="border border-b-1 border-gray-200 my-2 mx-3" />
          {/* Like- und Kommentar-Buttons */}
          <div>
            <div className="flex justify-start gap-8 px-3 font-FONT_VIGA ">
              <span className="flex items-center gap-2">
                <p>Like</p>
                <BiLike className="text-2xl hover:animate-bounce" />
              </span>
              <span className="flex items-center gap-2">
                <p className="flex items-center gap-2">comment</p>
                <FaRegComment className="text-2xl hover:animate-bounce" />
              </span>
            </div>
            {/* Trennlinie */}
            <div className="border border-b-1 my-2 border-gray-200 mx-3" />
          </div>
          {/* Kommentarbereich */}
          <div className="flex w-full px-3 gap-2">
            {/* Profilbild und Kommentareingabefeld */}
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={userCommentProfile?.profile_photo}
              alt={userCommentProfile?.firstName}
            />

            <input
              className={`w-full h-[46px] rounded-full px-5  ${
                isDarkMode ? "input-dark" : "input-light"
              }`}
              type="text"
              placeholder="comment..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Post;
