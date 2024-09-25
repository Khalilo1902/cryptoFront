import { AppDispatch, RootState } from "../../../feature/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountApi,
  displayUser,
} from "../../../feature/reducers/userSlice";
import { NotificationService } from "../../../services/notificationServices";
import { useNavigate, useParams } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const userId = localStorage.getItem("userId");
  const {targetUserId}=useParams()
  const user = useSelector((state: RootState) =>
    displayUser(state, userId || "")
  );
const navigate=useNavigate()
  return (
    <div
      className={`py-4 px-4 h-fit font-FONT_VIGA ${
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
      }`}
    >
      <h1 className="text-4xl pt-6 font-bold font-FONT_VIGA text-PRIMARY_RED">
        Delete Account
      </h1>
      <div
        className={`border-b py-4 text-xl ${
          isDarkMode ? "bg-black" : "border-SECONDARY_GRAY"
        }`}
      />
      <div className="py-8 flex items-center gap-4">
        <img
          className="w-24 h-24 rounded-full"
          src={user.profile_photo}
          alt=""
        />
        <span className="flex items-center gap-1 text-lg">
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </span>
      </div>

      <p className="font-bold text-lg">Email: {user.email}</p>

      <div className="pt-6 flex items-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/edit-profile")}
        >
          CANCLE
        </button>
        <button
          className=" btn-delete "
          onClick={async () => {
            console.log("targetUserId",targetUserId);
            try {
              const response = await dispatch(
                deleteAccountApi(targetUserId!)
              ).unwrap();
              localStorage.clear()
              NotificationService.success(response.message);
              navigate("/")
            } catch (error: any) {
              NotificationService.error(error.message);
            }
          }}
        >
          DELETE
        </button>
      </div>
      <div className="w-full h-[200px]">

      </div>
    </div>
  );
};

export default DeleteAccount;
