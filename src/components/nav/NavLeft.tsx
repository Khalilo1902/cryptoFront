import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../feature/store";
import { IPost, IUser } from "../../interface/index";
import ShowTime from "../showTime/ShowTime";
import { incrementAnalyzeViewsApi } from "../../feature/reducers/analyzeSlice";
import { incrementPostsViewsApi } from "../../feature/reducers/postSlice";
import { incrementNewsViewsApi } from "../../feature/reducers/newsSlice";

interface INavLeftProps {
  component?: "post" | "news" | "analyze";
  post: IPost[];
  user: IUser;
}

const NavLeft = ({ component, post, user }: INavLeftProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useSelector((state: RootState) => state.app);

  return (
    <div
      className={`sticky right-0 top-0 hidden lg:flex lg:flex-col lg:w-full rounded-xl `}
    >
      <div className="text-xl font-FONT_VIGA font-bold bg-SECONDARY_GREEN text-PRIMARY_WHITE  py-2 rounded-lg px-3">
        <h2 className="glow text-center ">{`Top ${component}`}</h2>
      </div>
      <div className={`my-2 flex flex-col`}
      >
        {/* max-h-[400px] overflow-y-auto hinzugefügt, um Scrollen zu ermöglichen */}
        {post
        .slice(0, 10)
        .map((newsIndex, index) => (
          <div
            
            key={index}
            className={`  hover:text-stone-500 border-b-2 last:border-b-0 ${
              isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
            } px-4 py-6 rounded-lg`}
          >
            <div className="" key={newsIndex._id}>
              <div className="flex items-center gap-4">
                <div className="text-left w-full flex flex-col gap-2 ">
                  <p className="text-sm font-FONT_ROBOTO font-bold text-left line-clamp-1 ">
                    * {newsIndex?.title}...
                  </p>
                  <p
                    onClick={() => navigate(`/${component}/${newsIndex?._id}`)}
                    className="text-xs font-FONT_ROBOTO text-left line-clamp-3 hover:underline cursor-pointer "
                  >
                    {newsIndex?.description}...
                  </p>
                </div>
                <div
                  className="cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/${component}/${newsIndex?._id}`)}
                >
                  <img
                    onClick={async () => {
                      switch (component) {
                        case "post":
                          await dispatch(
                            incrementPostsViewsApi({
                              postIdPublic: newsIndex?._id,
                            })
                          );
                          break;
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
                      }
                    }}
                    className=" w-24 rounded-md hover:scale-105 hover:rounded-lg transition-all duration-500"
                    src={String(newsIndex?.image || "")}
                    alt=""
                  />
                </div>
              </div>
              <div className=" my-1 w-full flex gap-6 font-FONT_SALSA  text-xs">
                <ShowTime timestamp={newsIndex?.createdAt} />
                <p
                  onClick={() => navigate(`/profile/${user?._id}`)}
                  className=" text-PRIMARY_GRAY hover:underline cursor-pointer"
                >
                  {" "}
                  by {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLeft;
