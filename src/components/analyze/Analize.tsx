/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from "../../feature/store";
import {
  displayAnalyze,
  displayanalysis,
  toggleDisikeAnalyzeApi,
  toggleLikeAnalyzeApi,
} from "../../feature/reducers/analyzeSlice";
import { useDispatch, useSelector } from "react-redux";

import NavRight from "../nav/NavRight";
import { displayUsers } from "../../feature/reducers/userSlice";
import { BiSolidLike, BiDislike, BiLike } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FaComment, FaRegComment } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  setPostIdPublic,
  setIsEditComponentActive,
  setIsSpinnerActive,
  setIsDeleteComponentActive,
} from "../../feature/reducers/appSlice";
import { NotificationService } from "../../services/notificationServices";
import ShowTime from "../showTime/ShowTime";
import NavLeft from "../nav/NavLeft";
import { useNavigate } from "react-router-dom";
import CreateComment from "../comment/CreateComment";
import ShowComments from "../comment/ShowComments";
import { displayComments } from "../../feature/reducers/commentSlice";

const Analyze = () => {
  const { analyzeId } = useSelector((state: RootState) => state.analysis);
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const analyse = useSelector((state: RootState) =>
    displayAnalyze(state, analyzeId)
  );
  const analyses = useSelector(displayanalysis);
  const users = useSelector(displayUsers);
  const user = users.find((user) => user?._id === analyse?.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const isLikedPost = analyse?.likes.toLocaleString().includes(userId!);
  const isDislikedPost = analyse?.disLikes.toLocaleString().includes(userId!);
  const comments = useSelector(displayComments)
  const comment = comments.filter((singleComment)=>singleComment?.post === analyse?._id)

  const analysesWithMoreLikes = analyses
    .filter((analyse) => analyse.likes.length)
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 6);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="hidden xl:flex xl:col-span-3">
        <NavLeft
          component="analyze"
          user={user!}
          post={analysesWithMoreLikes}
        />
      </div>
      <div className=" flex flex-col lg:col-span-8 xl:col-span-6">


      <div
        className={`  rounded-xl py-3 font-FONT_VIGA w-full h-fit ${
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
              <p
                onClick={() => navigate(`/profile/${user?._id}`)}
                className=" cursor-pointer hover:underline"
              >
                {user?.firstName}
              </p>
              <div className="flex items-center gap-1 text-SECONDARY_GRAY text-xs">
                <MdOutlineWatchLater className=" text-xl sm:text-2xl" />
                <ShowTime timestamp={analyse?.createdAt} />
              </div>
            </div>
          </div>
          {/* Optionen-Menü */}
          <div className="flex items-center text-2xl gap-2">
            <CiEdit
              className=" cursor-pointer"
              onClick={() => {
                dispatch(setPostIdPublic(analyse?._id));
                dispatch(setIsEditComponentActive(true));
                dispatch(setIsSpinnerActive(false));
              }}
            />
            <IoMdClose
              className=" cursor-pointer"
              onClick={() => {
                dispatch(setPostIdPublic(analyse?._id));
                dispatch(setIsDeleteComponentActive(true));
                dispatch(setIsSpinnerActive(false));
              }}
            />
          </div>
        </div>
        {/* Beitragstext */}
        <div className="px-3 py-2">
          <p className="font-FONT_VIGA font-bold">{analyse?.title}</p>
        </div>

        {/* Bild */}
        <div className="mx-3 rounded-sm">
          <img
            className="w-full  rounded-lg"
            src={String(analyse?.image) || ""}
            alt=""
          />
        </div>
        <div className="py-4 px-3 border-b h-fit font-FONT_ROBOTO text-justify">
          <p>{analyse?.description}</p>
        </div>
        {/* Interaktionsbereich */}
        <div className="flex gap-6 items-center px-3 mt-2">
          {/* Like- und Teilen-Buttons */}
          <div className="flex items-center gap-2">
            <BiSolidLike />
            <p>{analyse?.likes.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <BiDislike />
            <p>{analyse?.disLikes.length}</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-2">
              <FaComment />
              <p>{comment?.length}</p>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-2">
              <IoEyeOutline />
              <p>{analyse?.numViews}</p>
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
                    toggleLikeAnalyzeApi({ postIdPublic: analyse?._id })
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
                    toggleDisikeAnalyzeApi({ postIdPublic: analyse._id })
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

      
        {/* Kommentarbereich */}
        <div>
          <CreateComment components="analyze" postIdPublic={analyse?._id} />
        </div>
        
      </div>


      
      <div>
          <ShowComments components="analyze" postIdPublic={analyse?._id} />
        </div>
      </div>
     
      <div className="w-full lg:col-span-4 xl:col-span-3">
        <NavRight component="analyze" user={user!} post={analyses} />
      </div>
    </div>
  );
};

export default Analyze;
