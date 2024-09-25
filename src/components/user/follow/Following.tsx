import { useDispatch, useSelector } from "react-redux";
import {
  displayUsers,
  unFollowUserApi,
} from "../../../feature/reducers/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../feature/store";
import { NotificationService } from "../../../services/notificationServices";
import { IoClose } from "react-icons/io5";
import { setIsFollowComponentActive } from "../../../feature/reducers/appSlice";

const Following = () => {
  // Verwende displayUsers, um eine Liste von Benutzern zu erhalten
  const users = useSelector((state: RootState) => displayUsers(state));
  const { userId } = useParams();

  // Finde den Benutzer mit der angegebenen ID
  const currentUser = users.find((user) => user._id === userId);
const navigate = useNavigate();
  // Überprüfe, ob der Benutzer gefunden wurde, und filtere seine Follower
  const filteredUsers = currentUser
    ? users.filter((user) => currentUser.following.includes(user._id as never))
    : [];
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={`fixed inset-0 w-full sm:bg-DARK_BLUE/50  sm:backdrop-blur-sm flex flex-col  justify-center items-center z-50   ${
        isDarkMode ? " bg-PRIMARY_BLACK" : " bg-SECONDARY_WHITE"
      }`}
    >
      <div
        className={` rounded-xl  px-3 max-h-96 overflow-y-scroll ${
          isDarkMode ? " bg-PRIMARY_BLACK" : "bg-SECONDARY_WHITE"
        } `}
      
      >
        <div className="flex justify-between py-4 ">
          <h1 className="text-2xl font-bold text-start">Following</h1>
          <div
            onClick={() => {
              dispatch(setIsFollowComponentActive(false));
            }}
            className="text-xl cursor-pointer"
          >
            <IoClose />
          </div>
        </div>
        {filteredUsers.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Currently, there are no users being followed at this time. Be the
            first to follow!
          </p>
        ) : (
          filteredUsers.map((user,index) => (
            <div key={index}>
              <li
                className="items-center p-2 border-b cursor-pointer last:border-b-0 flex  justify-between w-68 sm:w-96  py-3 sm:px-4 rounded-lg"
              >
                <div
                onClick={()=>{
                  navigate(`/profile/${user._id}`)
                dispatch(setIsFollowComponentActive(false));
                }}
                className="flex items-center gap-2">
                  <img
                    className="rounded-full h-10 w-10 "
                    src={user.profile_photo}
                    alt={""}
                  />
                  <p className="text-xs font-bold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className=" ">
                  {currentUser?.following.includes(user._id as never) && (
                    <button
                      onClick={async () => {
                        try {
                          const response = await dispatch(
                            unFollowUserApi({ targetUserId: user._id })
                          ).unwrap();
                          NotificationService.success(response.message);
                        } catch (error: any) {
                          NotificationService.error(error.message);
                        }
                      }}
                      className="btn-delete !py-1 !px-1 text-sm"
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              </li>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Following;
