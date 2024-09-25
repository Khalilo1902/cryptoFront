import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../feature/store";
import { IPost, IUser } from "../../interface/index";
import { incrementAnalyzeViewsApi } from "../../feature/reducers/analyzeSlice";
import ShowTime from "../showTime/ShowTime";
import { incrementNewsViewsApi } from "../../feature/reducers/newsSlice";
import { incrementPostsViewsApi } from "../../feature/reducers/postSlice";

interface INavRightProps {
  component?: "post" | "news" | "analyze";
  post: IPost[];
  user: IUser;
}

const NavRight = ({ component, post, user }: INavRightProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  return (
    <div
      className={`sticky right-0 top-0  hidden lg:flex lg:flex-col lg:w-full 
    rounded-xl`}
    >
      <div className="glowRight text-xl font-FONT_VIGA font-bold bg-PRIMARY_BLUE text-SECONDARY_WHITE py-2 rounded-lg px-3">
        <h2 className="text-center">{`last ${component}`}</h2>
      </div>
      <div className={`my-2 flex flex-col gap-4`}>
        {post
          .slice(0, 5)
          .reverse()
          .map((newsIndex, index) => (
            <div
              key={index}
              className={`  ${
                isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
              } px-4 py-6 rounded-lg`}
            >
              <div>
                <div className=" my-1 w-full flex gap-6 font-FONT_SALSA  text-xs">
                  <ShowTime timestamp={newsIndex?.updatedAt} />
                  <p
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className=" text-PRIMARY_GRAY hover:underline cursor-pointer"
                  >
                    {" "}
                    by {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div
                  className=" flex flex-col items-center gap-2 "
                  key={newsIndex._id}
                >
            <div className="h-64 overflow-hidden rounded-lg">
            <img
                   className=" w-full cursor-pointer hover:scale-105 duration-300 "
                   src={String(newsIndex?.image || "")}
                   alt=""
                    onClick={async () => {
                      switch (component) {
                        case "analyze":
                          await dispatch(
                            incrementAnalyzeViewsApi({
                              postIdPublic: newsIndex?._id,
                            })
                          );
                          break;
                        case "news":
                          await dispatch(
                            incrementNewsViewsApi({
                              postIdPublic: newsIndex?._id,
                            })
                          );
                          break;
                        case "post":
                          await dispatch(
                            incrementPostsViewsApi({
                              postIdPublic: newsIndex?._id,
                            })
                          );
                      }

                      navigate(`/${component}/${newsIndex?._id}`);
                    }} 
                  />
            </div>
                  <p className=" text-sm font-FONT_ROBOTO font-bold w-full text-left px-4 line-clamp-1">
                    * {newsIndex?.title}
                  </p>
                  <p className=" text-sm line-clamp-2 font-FONT_SALSA text-left ">
                    {newsIndex?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavRight;
