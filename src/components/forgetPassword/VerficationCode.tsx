import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import logoVerification from "../../assets/images/logoVerification.png";
import { AppDispatch, RootState } from "../../feature/store";
import { confirmVerificationCodeApi } from "../../feature/reducers/userSlice";
import { NotificationService } from "../../services/notificationServices";
import { setIsSpinnerActive } from "../../feature/reducers/appSlice";
import Spinner from "../Spinner";
let currentOTPIndex: number = 0;


interface IVerficationCodeProps{
  setIsVerifyCodeActive:(isVerifyCodeActive:boolean)=>void
   setIsChangePasswordActive:(isChangePasswordActive:boolean)=>void
}
const VerficationCode = ({setIsVerifyCodeActive,setIsChangePasswordActive}:IVerficationCodeProps) => {
  const { isDarkMode,getEmailForgetPassword,isSpinnerActive } = useSelector((state: RootState) => state.app);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleOnChange = (
    target: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = target.target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
    setOtp(newOTP);
  };
  const handleSubmit = async () => {
    const verifyCode = otp.join("").trim();
    if (!isSubmitting) {
      dispatch(setIsSpinnerActive(false));
      setIsSubmitting(true);
    try {
      await dispatch(
        confirmVerificationCodeApi({
          verificationCode: verifyCode,
          email:getEmailForgetPassword
        })
      ).unwrap();
      dispatch(setIsSpinnerActive(true));
      setTimeout(() => {
        dispatch(setIsSpinnerActive(false));
        setIsVerifyCodeActive(false);
        setIsChangePasswordActive(true);
      }, 3000);
    } catch (error: any) {
      NotificationService.error(error.message);
    }
    finally {
      setIsSubmitting(false);
    }
  }
  };
  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={` ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } py-16 px-16 shadow-sm shadow-SECONDARY_BLACK rounded-lg flex flex-col items-center gap-8`}
      >
        <img className="w-44" src={logoVerification} alt="" />
        <h2>Authentication</h2>
        <div className="flex gap-2">
          {otp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="number"
                  className="w-12 h-12 text-center border-2 border-PRIMARY_BLUE rounded-md bg-transparent outline-none
                    focus:border-SECONDARY_BLUE transitation duration-300 spin-button-none "
                  onChange={handleOnChange}
                  value={otp[index]}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  style={{
                    borderColor:
                      activeOTPIndex === index ? "#4B6AC5" : "#E5E5E5",
                  }}
                />
                {index === otp.length - 1 ? null : <span className=" " />}
              </React.Fragment>
            );
          })}
        </div>

        <div>
          <button className=" btn btn-primary" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <p>A message with a verification code has been sent to</p>
          <p className="text-center">
            your devices. Enter the code to continue.
          </p>
          <p className="text-center hover:underline cursor-pointer text-PRIMARY_BLUE">
            Didn’t get a verification code?
          </p>
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

export default VerficationCode;
