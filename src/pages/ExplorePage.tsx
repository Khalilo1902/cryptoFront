import { useDispatch, useSelector } from "react-redux";
import MaxWithWrapper from "../components/MaxWithWrapper";
import ExploreSlider from "../components/user/explore/ExploreSlider";
import { AppDispatch, RootState } from "../feature/store";
import { displayUsers } from "../feature/reducers/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeletePost from "../components/crud/DeletePost";
import EditPost from "../components/crud/EditPost";
import Posts from "../components/user/post/Posts";
import CreatePost from "../components/crud/CreatePost";
import { setIsEditComponentActive, setIsPostComponentActive } from "../feature/reducers/appSlice";

const ExplorePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    isPostComponentActive,
    isDarkMode,
    inputValueSearchBox,
    isDeleteComponentActive,
    isEditComponentActive,
  } = useSelector((state: RootState) => state.app);

  const users = useSelector(displayUsers);
  useEffect(() => {
    console.log(inputValueSearchBox);
  }, [inputValueSearchBox]);
  return (
    <MaxWithWrapper className="">
      <div className="relative">
        <ul
          className={`z-50 ${
            isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
          } ${
            inputValueSearchBox != ""
              ? " sticky  inset-0  h-fit rounded-lg "
              : "hidden"
          }`}
        >
          {users
            .filter((user) =>
              user.firstName && user.firstName
                .toLowerCase()
                .includes(inputValueSearchBox.toLowerCase())
            )
            .map((user) => (
              <li
                key={user._id}
                className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE transition-all duration-200 text-BLACK "
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    className=" rounded-lg"
                    width={50}
                    height={50}
                    src={user.profile_photo}
                    alt=""
                  />
                  <p className=" font-FONT_VIGA font-bold">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="my-6">
        {" "}
        <ExploreSlider />
      </div>
      <div 
      onClick={() => dispatch(setIsPostComponentActive(true))}
      className=" text-right mb-4">
        <button className="btn btn-primary ">
          <span className="mr-1 ">+</span>
          Add new post
        </button>
      </div>
      <div>
        {" "}
        <Posts components="explorer" />
      </div>
      <div className={`${isDeleteComponentActive ? "" : "hidden"}`}>
        <DeletePost components="post" />
      </div>
      <div className={`${isEditComponentActive ? "" : "hidden"}`}>
        <EditPost components="post" />
      </div>
      <div
        className={`${isPostComponentActive ? "fixed inset-0 z-50" : "hidden"}`}
      >
        <CreatePost components="post" />
      </div>
    </MaxWithWrapper>
  );
};

export default ExplorePage;
