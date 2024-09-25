/* eslint-disable @typescript-eslint/no-explicit-any */
import { CiHeart } from "react-icons/ci";
import { GoBook } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import {
  displayNews,
  incrementNewsViewsApi,
  setNewsId,
  toggleDisikeNewsApi,
  toggleLikeNewsApi,
} from "../../feature/reducers/newsSlice";
import { displayUsers } from "../../feature/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import {
  setIsDeleteComponentActive,
  setIsEditComponentActive,
  setIsSpinnerActive,
  setPostIdPublic,
} from "../../feature/reducers/appSlice";
import { IoEyeOutline, IoHeartDislikeOutline } from "react-icons/io5";
import ShowTime from "../showTime/ShowTime";
import { NotificationService } from "../../services/notificationServices";
import { displayComments } from "../../feature/reducers/commentSlice";

const News = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const userId = localStorage.getItem("userId");
  const news = useSelector(displayNews);
  const users = useSelector(displayUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(displayComments);

  return (
    <div className="h-fit flex flex-col gap-4">
      {news.map((news, index) => {
        const user = users.find((user) => user._id === news.user);
        const isLikedPost = news.likes.toLocaleString().includes(userId!);
        const isDislikedPost = news.disLikes.toLocaleString().includes(userId!);
        return (
          <div
            key={index}
            className={`grid grid-cols-12 rounded-xl  cursor-pointer h-36  sm:h-64 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            }`}
            onClick={async () => {
              try {
                await dispatch(
                  incrementNewsViewsApi({ postIdPublic: news._id })
                );
                dispatch(setNewsId(news._id));
                navigate(`/news/${news._id}`);
              } catch (error: any) {
                NotificationService.error(error.message);
              }
            }}
          >
            <div className="col-span-3 lg:col-span-2 h-full  cursor-pointer rounded-xl overflow-hidden">
              <img
                className="w-full h-full rounded-lg hover:scale-105 hover:brightness-50 duration-500"
                src={String(news.image)}
                alt=""
              />
            </div>

            <div className=" col-span-9 lg:col-span-10 w-full  rounded-xl">
              <div className="flex items-center justify-between px-2">
                <div className=" flex items-center gap-2">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                    src={user?.profile_photo}
                    alt=""
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-sm line-clamp-1 sm:text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
                  </div>
                </div>
                <div className=" px-2 py-3 flex items-center text-lg sm:text-2xl gap-2">
                  <CiEdit
                    className=" cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();

                      dispatch(setPostIdPublic(news._id));
                      dispatch(setIsEditComponentActive(true));
                      dispatch(setIsSpinnerActive(false));
                    }}
                  />
                  <IoMdClose
                    className=" cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(setPostIdPublic(news._id));
                      dispatch(setIsDeleteComponentActive(true));
                      dispatch(setIsSpinnerActive(false));
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1 sm:gap-3 xl:gap-8 px-4">
                <div className=" flex flex-col gap-1 sm:gap-3">
                  <h2 className=" text-sm sm:text-lg md:text-2xl font-semibold line-clamp-1">
                    {news.title}
                  </h2>
                  <p className=" text-xs sm:text-lg line-clamp-3 lg:h-30 lg:leading-8  ">
                    {news.description && news.description}...
                  </p>
                </div>

                <div className="flex  justify-between sm:items-center">
                  <div className="flex gap-2 text-sm sm:text-xs lg:text-sm">
                    <div
                      className="flex gap-2 items-center justify-center cursor-pointer"
                      onClick={async (event) => {
                        event.stopPropagation();
                        try {
                          await dispatch(
                            toggleLikeNewsApi({ postIdPublic: news._id })
                          ).unwrap();
                        } catch (error: any) {
                          NotificationService.error(error.message);
                        }
                      }}
                    >
                      <CiHeart
                        className={`text-lg sm:text-xl  ${
                          isLikedPost && "text-PRIMARY_BLUE"
                        }`}
                      />
                      <span className="text-sm ">{news?.likes?.length}</span>
                    </div>
                    <div
                      className="flex gap-2 items-center justify-center cursor-pointer"
                      onClick={async (event) => {
                        event.stopPropagation();
                        try {
                          await dispatch(
                            toggleDisikeNewsApi({ postIdPublic: news._id })
                          ).unwrap();
                        } catch (error: any) {
                          NotificationService.error(error.message);
                        }
                      }}
                    >
                      <IoHeartDislikeOutline
                        className={`text-sm sm:text-xl ${
                          isDislikedPost && "text-PRIMARY_RED"
                        }`}
                      />
                      <span className="text-sm">{news?.disLikes?.length}</span>
                    </div>
                    <div className="flex gap-2 items-center text-sm  justify-center cursor-pointer">
                      <GoBook className="text-sm sm:text-xl" />
                      <span className="text-sm">
                        {
                          comments.filter(
                            (comment) => comment?.post === news?._id
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex gap-2 items-center  justify-center cursor-pointer">
                      <IoEyeOutline className="text-sm sm:text-xl" />
                      <span className="text-sm">{news.numViews}</span>
                    </div>
                  </div>
                  <div className="text-SECONDARY_GRAY text-xs sm:py-2">
                    <ShowTime timestamp={news?.createdAt} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
