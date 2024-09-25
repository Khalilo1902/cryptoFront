import logoVerification from "../../assets/images/logoVerification.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import React, { useState } from "react";
import { setIsSpinnerActive } from "../../feature/reducers/appSlice";
import { changePasswordWithotLoginApi } from "../../feature/reducers/userSlice";
import { NotificationService } from "../../services/notificationServices";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

interface IChangePasswordProps {
  setIsChangePasswordActive: (isChangePasswordActive: boolean) => void;
}
const ChangePassword = ({
  setIsChangePasswordActive,
}: IChangePasswordProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode, isSpinnerActive, getEmailForgetPassword } = useSelector(
    (state: RootState) => state.app
  );
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <div
        className={`${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } my-10 px-5 mx-7 rounded-xl    flex flex-col items-center w-96 shadow-black shadow-2xl py-20`}
      >
        <div className=" flex flex-col gap-7 w-full items-center ">
          <div className=" w-full flex justify-center mb-10">
            <img className=" w-44" src={logoVerification} alt="" />
          </div>
          <div
            className={`${
              isDarkMode ? " bg-PRIMARY_BLACK" : " bg-PRIMARY_WHITE"
            } w-full text-center flex flex-row items-center justify-center rounded-xl px-4`}
          >
            <input
              className=" outline-none bg-transparent  w-full  p-2 "
              type="password"
              placeholder="New Password"
              value={inputPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputPassword(event.target.value);
              }}
            />
          </div>
          <div
            className={`${
              isDarkMode ? " bg-PRIMARY_BLACK" : " bg-PRIMARY_WHITE"
            } w-full text-center flex flex-row items-center justify-center rounded-xl px-4`}
          >
            <input
              className=" outline-none bg-transparent  w-full  p-2 "
              type="password"
              placeholder="Confirm Password"
              value={inputConfirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputConfirmPassword(event.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={async () => {
              if (!isSubmitting) {
                dispatch(setIsSpinnerActive(false));
                setIsSubmitting(true);
                try {
                  await dispatch(
                    changePasswordWithotLoginApi({
                      email: getEmailForgetPassword,
                      newPassword: inputPassword,
                      confirmPassword: inputConfirmPassword,
                    })
                  ).unwrap();

                  dispatch(setIsSpinnerActive(true));
                  setTimeout(() => {
                    dispatch(setIsSpinnerActive(false));

                    setIsChangePasswordActive(false);
                    navigate("/auth");
                  }, 3000);
                } catch (error: any) {
                  NotificationService.error(error.message);
                  setTimeout(() => {
                    setInputConfirmPassword("");
                    setInputPassword("");
                  }, 3000);
                } finally {
                  setIsSubmitting(false);
                }
              }
            }}
          >
            Confirm
          </button>
        </div>
        <div
            className={`${
              isSpinnerActive ? "flex" : "hidden"
            } w-full  items-center gap-4 px-10 `}
          >
            <p className=""> please Wait ...</p>
            <div className="w-4">
              <Spinner />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ChangePassword;
