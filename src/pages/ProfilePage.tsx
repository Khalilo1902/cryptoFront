import { useSelector } from "react-redux";
import MaxWithWrapper from "../components/MaxWithWrapper";
import HeaderProfile from "../components/user/profile/HeaderProfile";
import { RootState } from "../feature/store";
import { displayUsers } from "../feature/reducers/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../components/crud/CreatePost";
import PostAdd from "../components/user/post/PostAdd";
import DeletePost from "../components/crud/DeletePost";
import EditPost from "../components/crud/EditPost";
import Posts from "../components/user/post/Posts";
import Followers from "../components/user/follow/Followers";
import Following from "../components/user/follow/Following";

const ProfilePage = () => {
  const {
    isDarkMode,
    inputValueSearchBox,
    isPostComponentActive,
    isDeleteComponentActive,
    isEditComponentActive,
    isFollowComponentActive,
    isFollowersComponentActive,
  } = useSelector((state: RootState) => state.app);

  const users = useSelector(displayUsers);
  const navigate = useNavigate();
  const { userId } = useParams();
  const userShowId = localStorage.getItem("userId");
  const postAddShow = userId === userShowId;

  return (
    <MaxWithWrapper>
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
              user?.firstName && user.firstName
                .toLowerCase()
                .includes(inputValueSearchBox.toLowerCase())
            )
            .map((user, index) => (
              <li
                key={index}
                className="py-2 px-5 border-b last:border-b-0 cursor-pointer hover:bg-PRIMARY_BLUE transition-all duration-200 text-BLACK"
                onClick={() => {
                  navigate(`/profile/${user?._id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    className=" rounded-lg"
                    width={50}
                    height={50}
                    src={user?.profile_photo}
                    alt=""
                  />
                  <p className=" font-FONT_VIGA font-bold">
                    {user?.firstName + " " + user?.lastName}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <HeaderProfile />
      </div>
      <div className={`${postAddShow ? "" : "hidden"}`}>
        <PostAdd />
      </div>

      <div className={`${isFollowComponentActive ? "flex" : "hidden"}`}>
        <Following />
      </div>

      <div className={`${isFollowersComponentActive ? "flex" : "hidden"}`}>
        <Followers />
      </div>

      <div className="pt-6">
        <Posts components="profile" />
      </div>

      <div className={`${isPostComponentActive ? " z-50 " : "hidden"}`}>
        <CreatePost components="post" />
      </div>
      <div className={`${isEditComponentActive ? "" : "hidden"}`}>
        <EditPost components="post" />
      </div>
      <div className={`${isDeleteComponentActive ? "" : "hidden"}`}>
        <DeletePost components="post" />
      </div>
    </MaxWithWrapper>
  );
};

export default ProfilePage;
