/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiFireLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { useDispatch } from "react-redux";
import {
  setIsDeleteComponentActive,
  setIsEditComponentActive,
  setIsPostComponentActive,
  setIsSpinnerActive,
  setPostIdPublic,
} from "../../feature/reducers/appSlice";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import {
  displayanalysis,
  incrementAnalyzeViewsApi,
  toggleDisikeAnalyzeApi,
  toggleLikeAnalyzeApi,
} from "../../feature/reducers/analyzeSlice";

import { displayUsers } from "../../feature/reducers/userSlice";
import ShowTime from "../showTime/ShowTime";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoHeartDislikeOutline } from "react-icons/io5";
import { NotificationService } from "../../services/notificationServices";
import { displayComments } from "../../feature/reducers/commentSlice";

const Analysis = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const users = useSelector(displayUsers);
  const analyses = useSelector(displayanalysis);
  const comments = useSelector(displayComments);

  return (
    <div>
      <div className="flex justify-between items-center h-fit py-4">
        <p className=" font-FONT_VIGA text-sm sm:text-xl ">
          The latest analysis of digital currencies
        </p>
        <button
          className="btn btn-primary "
          onClick={() => dispatch(setIsPostComponentActive(true))}
        >
          <span className="mr-1 ">+</span>
          new analysis
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-1">
        {analyses.map((analyze) => {
          const user = users.find((user) => user._id === analyze.user);

          const isLikedPost = analyze.likes.toLocaleString().includes(userId!);
          const isDislikedPost = analyze.disLikes
            .toLocaleString()
            .includes(userId!);
          return (
            <div
              key={analyze._id}
              className={` flex flex-col  py-6 px-2 sm:px-4 rounded-xl m-2 shadow-lg  ${
                isDarkMode ? "bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
              }`}
            >
              <div className=" flex flex-col justify-between h-full">
                <div className="w-full h-full ">
                  <div className=" flex items-center justify-between px-1">
                  <div
                    onClick={() => {
                      navigate(`/profile/${user?._id}`);
                    }}
                    className="flex mt-4 justify-between font-FONT_VIGA font-semibold cursor-pointer hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={user?.profile_photo}
                        className="h-7 w-7 rounded-full "
                        alt=""
                      />
                      <p>
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                  </div>
                   

                    {/* Optionen-Menü */}
                    <div className="flex items-center text-2xl gap-2">
                      <CiEdit
                        className=" cursor-pointer"
                        onClick={() => {
                          dispatch(setPostIdPublic(analyze._id));
                          dispatch(setIsEditComponentActive(true));
                          dispatch(setIsSpinnerActive(false));
                        }}
                      />
                      <IoMdClose
                        className=" cursor-pointer"
                        onClick={() => {
                          dispatch(setPostIdPublic(analyze._id));
                          dispatch(setIsDeleteComponentActive(true));
                          dispatch(setIsSpinnerActive(false));
                        }}
                      />
                    </div>
                  </div>
                  <div className="font-FONT_VIGA mt-4 line-clamp-1">
                      {analyze?.title}
                    </div>

                  <div
                    className="cursor-pointer  rounded-lg overflow-hidden mt-4"
                    onClick={async () => {
                      await dispatch(
                        incrementAnalyzeViewsApi({ postIdPublic: analyze?._id })
                      );

                      navigate(`/analyze/${analyze._id}`);
                    }}
                  >
                    <img
                      className="hover:scale-105 hover:brightness-50 duration-500 h-60 w-full"
                      src={String(analyze?.image)}
                      alt=""
                    />
                  </div>

                  <p className="mt-4 line-clamp-3">
                    {analyze?.description.slice(0, 200)}...
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4 justify-between px-5 ">
                  <div className=" flex items-center gap-4 px-1 w-full">
                    <div
                      className="flex items-center border py-1 px-2 mt-3 gap-2 cursor-pointer rounded-lg"
                      onClick={async () => {
                        try {
                          await dispatch(
                            toggleLikeAnalyzeApi({ postIdPublic: analyze._id })
                          ).unwrap();
                        } catch (error: any) {
                          NotificationService.error(error.message);
                        }
                      }}
                    >
                      <RiFireLine
                        className={`${
                          isLikedPost && " text-PRIMARY_ORANGE"
                        } text-xl sm:text-2xl`}
                      />
                      <p>{analyze?.likes.length}</p>
                    </div>
                    <div
                      className="flex items-center border py-1 px-2 mt-3 gap-2 cursor-pointer rounded-lg"
                      onClick={async () => {
                        try {
                          await dispatch(
                            toggleDisikeAnalyzeApi({
                              postIdPublic: analyze._id,
                            })
                          ).unwrap();
                        } catch (error: any) {
                          NotificationService.error(error.message);
                        }
                      }}
                    >
                      <IoHeartDislikeOutline
                        className={`${
                          isDislikedPost && " text-PRIMARY_RED"
                        } text-xl sm:text-2xl`}
                      />
                      <p>{analyze?.disLikes.length}</p>
                    </div>
                    <div className="flex items-center border py-1 px-2 mt-3 gap-2  rounded-lg">
                      <BiCommentDetail
                        onClick={() => {
                          navigate(`/analyze/${analyze._id}`);
                        }}
                        className=" 
                      hover:-scale-x-95 transition-all duration-500 text-xl sm:text-2xl cursor-pointer hover:text-SECONDARY_BLUE"
                      />
                      <p>
                        {
                          comments.filter(
                            (comment) => comment?.post === analyze?._id
                          ).length
                        }
                      </p>
                    </div>
                    <div className="flex items-center border py-1 px-2 mt-3 gap-2 cursor-pointer rounded-lg">
                      <IoEyeOutline className=" text-sm sm:text-2xl hover:-scale-x-95 transition-all duration-500  cursor-pointer hover:text-SECONDARY_ORANGE " />
                      <p>{analyze?.numViews}</p>
                    </div>
                  </div>

                  <div className="flex items-center  gap-2 mt-2 w-full">
                    <MdOutlineWatchLater className=" text-xl sm:text-2xl" />
                    <p className=" text-[10px]">
                      <ShowTime timestamp={analyze?.createdAt} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analysis;
