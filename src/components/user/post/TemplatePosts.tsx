import { IoMdClose } from "react-icons/io";
import { BiDislike, BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import { displayUsers } from "../../../feature/reducers/userSlice";
import { IPost } from "../../../interface";
import ShowTime from "../../showTime/ShowTime";
import { CiEdit } from "react-icons/ci";
import {
  setIsDeleteComponentActive,
  setIsEditComponentActive,
  setIsSpinnerActive,
  setPostIdPublic,
} from "../../../feature/reducers/appSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  incrementPostsViewsApi,
  setPostId,
  toggleDisikePostApi,
  toggleLikePostApi,
} from "../../../feature/reducers/postSlice";
import { NotificationService } from "../../../services/notificationServices";
import { IoEyeOutline } from "react-icons/io5";
import { displayComments } from "../../../feature/reducers/commentSlice";
interface IPostProps {
  posts: IPost[];
}
const TemplatePosts = ({ posts }: IPostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  // Selektiere den aktuellen Dark-Mode-Status aus dem Redux-Store
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const userId = localStorage.getItem("userId");
  const users = useSelector(displayUsers);
  const navigate = useNavigate();
  const comments = useSelector(displayComments);

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => {
        const user = users.find((user) => user._id === post.user);
        const isLikedPost = post.likes.toLocaleString().includes(userId!);
        const isDislikedPost = post.disLikes.toLocaleString().includes(userId!);
        return (
          <div
            key={post._id}
            className={`rounded-xl py-3 font-FONT_VIGA ${
              // Dynamische Klasse für den Hintergrund basierend auf dem Dark-Mode-Status
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            }`}
          >
            <div className="flex justify-between items-center px-2">
              <div
                className="flex gap-2"
                onClick={async () => {
                  navigate(`/profile/${post.user}`);
                }}
              >
                {/* Profilbild des Benutzers */}
                <div>
                  <img
                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                    src={user?.profile_photo}
                    alt=""
                  />
                </div>
                {/* Benutzername und Zeitstempel */}
                <div className="flex flex-col justify-center">
                  <p className=" cursor-pointer">{user?.firstName}</p>
                  <div className="flex items-center gap-1 text-SECONDARY_GRAY text-xs">
                    <MdOutlineWatchLater className=" text-xl sm:text-2xl" />
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
              <p className="font-FONT_VIGA font-bold line-clamp-1">
                {post?.title}
              </p>
            </div>
            {/* Bild */}
            <div
              className="mx-3  overflow-hidden rounded-lg"
              onClick={async () => {
                await dispatch(
                  incrementPostsViewsApi({ postIdPublic: post?._id })
                );
                dispatch(setPostId(post._id)), navigate(`/post/${post._id}`);
              }}
            >
              <img
                className="w-full   hover:scale-105 transition-all duration-500 cursor-pointer"
                src={String(post?.image) || ""}
                alt=""
              />
            </div>
            <div className="py-4 px-3 border-b h-40">
              <p>{post.description.slice(0, 200)}...</p>
            </div>
            {/* Interaktionsbereich */}
            <div className="flex gap-6 items-center px-3 mt-2">
              {/* Like- und Teilen-Buttons */}
              <div className="flex items-center gap-2">
                <BiSolidLike />
                <p>{post.likes.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <BiDislike />
                <p>{post.disLikes.length}</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-2">
                  <FaComment />
                  <p>
                    {
                      comments.filter((comment) => comment.post === post?._id)
                        .length
                    }
                  </p>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-2">
                  <IoEyeOutline />
                  <p>{post.numViews}</p>
                </span>
              </div>
            </div>
            {/* Trennlinie */}
            <div className="border border-b-1 border-gray-200 my-2 mx-3" />
            {/* Like- und Kommentar-Buttons */}
            <div>
              <div className="flex justify-start gap-8 px-3 font-FONT_VIGA ">
                <span
                  className="flex items-center gap-2"
                  onClick={async () => {
                    try {
                      await dispatch(
                        toggleLikePostApi({ postIdPublic: post._id })
                      ).unwrap();
                    } catch (error: any) {
                      NotificationService.error(error.message);
                    }
                  }}
                >
                  <BiLike
                    className={`${
                      isLikedPost && " text-PRIMARY_BLUE"
                    } text-2xl cursor-pointer`}
                  />
                </span>
                <span
                  className="flex items-center gap-2"
                  onClick={async () => {
                    try {
                      await dispatch(
                        toggleDisikePostApi({ postIdPublic: post._id })
                      ).unwrap();
                    } catch (error: any) {
                      NotificationService.error(error.message);
                    }
                  }}
                >
                  <BiDislike
                    className={`${
                      isDislikedPost && "text-PRIMARY_RED"
                    } text-2xl  cursor-pointer`}
                  />
                </span>
                <div className="flex items-center gap-2  hover:-scale-x-95 transition-all duration-500 text-xl sm:text-2xl cursor-pointer hover:text-SECONDARY_BLUE ">
                  <FaRegComment
                    onClick={() => {
                      navigate(`/post/${post?._id}`);
                    }}
                    className="text-2xl  cursor-pointer hover:text-SECONDARY_BLUE"
                  />
                </div>
              </div>
              {/* Trennlinie */}
            </div>
            {/* Kommentarbereich */}
          </div>
        );
      })}
    </div>
  );
};
export default TemplatePosts;
