import { useDispatch, useSelector } from "react-redux";
import {
  displayUser,
} from "../../../feature/reducers/userSlice";
import {  RootState } from "../../../feature/store";
import { useNavigate } from "react-router-dom";


const VerifyAccount = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);

  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) =>
    displayUser(state, userId || "")
  );
const navigate=useNavigate()
  if (user?.isAccountVerified) {
    return (
      <div
        className={`py-4 px-4 h-fit font-FONT_VIGA ${
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE rounded-lg"
        }`}
      >
        <div className="flex flex-col gap-4">
          <p>{`Dear ${user.firstName} ${user.lastName}`}</p>
          <p>
            Your account has been verified. We are delighted to have you join
            our community!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`py-4 px-4 h-fit font-FONT_VIGA ${
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
        }`}
      >
        <h1 className="w-full text-left text-4xl pt-6 font-bold font-FONT_VIGA ">
          Verify Account
        </h1>
        <div
          className={`border-b py-4 text-xl ${
            isDarkMode ? "bg-black" : "border-SECONDARY_GRAY"
          }`}
        />
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 sm:gap-2 w-full my-3">
          <div className=" flex flex-col items-center gap-1 sm:col-span-1  sm:border-r-2">
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

            <div>
              <p className="font-bold text-lg">Email: {user.email}</p>
            </div>
          </div>
          <div className=" font-FONT_SALSA text-xl text-justify px-3 sm:col-span-1 ">
            <p>
              Verifying your account not only enhances security but also unlocks
              a multitude of options on our website. Once your account is
              verified, you gain access to a wider range of features and
              functionalities, allowing you to make the most out of your
              experience. Verified accounts enjoy added benefits such as
              increased trust, smoother transactions, and access to exclusive
              content. Take the step towards account verification today and open
              up a world of possibilities.
            </p>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-center gap-4 w-full">
          <button
            onClick={ () => {
             navigate("/authentication")
            }}
            className="btn btn-primary"
          >
            Send Verification code
          </button>
        </div>
      </div>
    );
  }
};

export default VerifyAccount;
