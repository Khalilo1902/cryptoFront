import { FaArrowRight } from "react-icons/fa";
import logoVerification from "../../assets/images/logoVerification.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { confirmEmailApi } from "../../feature/reducers/userSlice";
import React, { useEffect, useState } from "react";
import { NotificationService } from "../../services/notificationServices";
import Spinner from "../Spinner";
import {
  setEmailForgetPassword,
  setIsSpinnerActive,
} from "../../feature/reducers/appSlice";

interface IEmailProps {
  setIsEmailActive: (isEmailActive: boolean) => void;
  setIsVerifyCodeActive: (isVerifyCodeActive: boolean) => void;
}
const Email = ({ setIsVerifyCodeActive, setIsEmailActive }: IEmailProps) => {
  const { isSpinnerActive } = useSelector((state: RootState) => state.app);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const { isDarkMode } = useSelector((state: RootState) => state.app);

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
              type="text"
              placeholder="Enter your email"
              value={inputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.target.value);
              }}
            />
            <FaArrowRight
              className=" cursor-pointer"
              onClick={async () => {
                if (!isSubmitting) {
                  dispatch(setIsSpinnerActive(false));
                  setIsSubmitting(true);
                  try {
                    const response = await dispatch(
                      confirmEmailApi({ email: inputValue })
                    ).unwrap();
                    dispatch(setEmailForgetPassword(response.email));
                    dispatch(setIsSpinnerActive(true));
                    setTimeout(() => {
                      dispatch(setIsSpinnerActive(false));
                      setIsEmailActive(false);
                      setIsVerifyCodeActive(true);
                    }, 3000);
                  } catch (error: any) {
                    NotificationService.error(error.message);
                    setTimeout(() => {
                      setInputValue("");
                    }, 3000);
                  } finally {
                    setIsSubmitting(false);
                  }
                }
              }}
            />
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
    </div>
  );
};

export default Email;
