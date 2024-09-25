import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import {
  displayPost,
  toggleDisikePostApi,
  toggleLikePostApi,
} from "../../../feature/reducers/postSlice";
import { MdOutlineWatchLater } from "react-icons/md";
import ShowTime from "../../showTime/ShowTime";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { BiSolidLike, BiDislike, BiLike } from "react-icons/bi";
import { FaComment, FaRegComment } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import {
  setPostIdPublic,
  setIsEditComponentActive,
  setIsSpinnerActive,
  setIsDeleteComponentActive,
} from "../../../feature/reducers/appSlice";
import { NotificationService } from "../../../services/notificationServices";
import { displayUsers } from "../../../feature/reducers/userSlice";
import { displayNews } from "../../../feature/reducers/newsSlice";

import NavRight from "../../nav/NavRight";
import { useParams } from "react-router-dom";
import NavLeft from "../../nav/NavLeft";

import {
  displayComments,
} from "../../../feature/reducers/commentSlice";
import { useEffect } from "react";
import ShowComments from "../../comment/ShowComments";
import CreateComment from "../../comment/CreateComment";

const SinglePost = () => {
  const { postId } = useParams();
  const post = useSelector((state: RootState) =>
    displayPost(state, postId || "")
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode} = useSelector((state: RootState) => state.app);
  const users = useSelector(displayUsers);
  const user = users.find((user) => user?._id === post?.user);
  const userId = localStorage.getItem("userId");
  const isLikedPost = post?.likes.toLocaleString().includes(userId!);
  const isDislikedPost = post?.disLikes.toLocaleString().includes(userId!);
  const news = useSelector(displayNews);
  const allComments = useSelector(displayComments);
  const comments = allComments.filter((comment) => comment.post === postId);

  useEffect(()=>{
console.log("comments: ",comments)
  },[comments])
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="hidden xl:flex xl:col-span-3">
        <NavLeft component="news" user={user!} post={news} />
      </div>
      <div
        className={` lg:col-span-8 xl:col-span-6 rounded-xl py-3 font-FONT_VIGA w-full h-fit ${
          // Dynamische Klasse für den Hintergrund basierend auf dem Dark-Mode-Status
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
        }`}
      >
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-2">
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
                dispatch(setPostIdPublic(post?._id));
                dispatch(setIsEditComponentActive(true));
                dispatch(setIsSpinnerActive(false));
              }}
            />
            <IoMdClose
              className=" cursor-pointer"
              onClick={() => {
                dispatch(setPostIdPublic(post?._id));
                dispatch(setIsDeleteComponentActive(true));
                dispatch(setIsSpinnerActive(false));
              }}
            />
          </div>
        </div>
        {/* Beitragstext */}
        <div className="px-3 py-2">
          <p className="font-FONT_VIGA font-bold">{post?.title}</p>
        </div>

        {/* Bild */}
        <div className="mx-3 rounded-sm">
          <img
            className="w-full  rounded-lg"
            src={String(post?.image) || ""}
            alt=""
          />
        </div>
        <div className="py-4 px-3 border-b h-fit font-FONT_ROBOTO text-justify">
          <p>{post?.description}</p>
        </div>
        {/* Interaktionsbereich */}
        <div className="flex gap-6 items-center px-3 mt-2">
          {/* Like- und Teilen-Buttons */}
          <div className="flex items-center gap-2">
            <BiSolidLike />
            <p>{post?.likes.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <BiDislike />
            <p>{post?.disLikes.length}</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-2">
              <FaComment />
              <p>{comments.length}</p>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-2">
              <IoEyeOutline />
              <p>{post?.numViews}</p>
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
                    toggleLikePostApi({ postIdPublic: post?._id })
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
            <span className="flex items-center gap-2">
              <FaRegComment className="text-2xl  cursor-pointer" />
            </span>
          </div>
          {/* Trennlinie */}
          <div className="border border-b-1 my-2 border-gray-200 mx-3" />
        </div>
       <div>
        <CreateComment components="post" postIdPublic={post?._id}/>
       </div>
        {/* Kommentarbereich */}
        <div>
          <ShowComments postIdPublic={post?._id} components="post"/>
        </div>
      
      </div>
      <div className="w-full lg:col-span-4 xl:col-span-3">
        <NavRight component="news" user={user!} post={news} />
      </div>
    </div>
  );
};

export default SinglePost;
