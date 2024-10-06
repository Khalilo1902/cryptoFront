import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../feature/store";
import {
  accountVerificationApi,
  verifyUserEmailApi,
} from "../feature/reducers/userSlice";
import React, { useEffect, useState } from "react";
import { NotificationService } from "../services/notificationServices";
import MaxWithWrapper from "../components/MaxWithWrapper";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png"
let currentOTPIndex: number = 0;

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    try {
      await dispatch(
        accountVerificationApi({
          verificationCode: verifyCode,
        })
      ).unwrap();
      NotificationService.success("Account verified successfully");
      setTimeout(() => {
        navigate("/journal");
      }, 3000);
    } catch (error: any) {
      NotificationService.error(error.message);
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
  // const [formData, setFormData] = useState({
  //   num1: "",
  //   num2: "",
  //   num3: "",
  //   num4: "",
  //   num5: "",
  //   num6: "",
  // });

  // const onChangeForm = (
  //   event: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const sendVerifyCode = async () => {
    try {
      await dispatch(verifyUserEmailApi()).unwrap();
    } catch (error: any) {
      NotificationService.error(error.message);
    }
  };
  useEffect(() => {
    sendVerifyCode();
  }, []);

  // const handleSubmit = async () => {
  //   const verifyCode =
  //     formData.num1 +
  //     formData.num2 +
  //     formData.num3 +
  //     formData.num4 +
  //     formData.num5 +
  //     formData.num6;

  //   try {
  //     const response = await dispatch(
  //       accountVerificationApi({
  //         verificationCode: verifyCode,
  //       })
  //     ).unwrap();
  //     NotificationService.success(response.message);
  //     setTimeout(()=>{
  //       navigate("/home")
  //     },3000)
  //   } catch (error: any) {
  //     NotificationService.error(error.message);
  //   }
  // };
  return (
    <MaxWithWrapper className="flex justify-center items-center h-screen">
      <div
        className={` ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        } py-16 px-16 shadow-sm shadow-SECONDARY_BLACK rounded-lg flex flex-col items-center gap-8`}
      >
        <img
          className="w-44"
          src={Logo}
          alt=""
        />
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
      </div>
    </MaxWithWrapper>
  );
};

export default AuthenticationPage;