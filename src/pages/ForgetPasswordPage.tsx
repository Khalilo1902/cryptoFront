import { useState } from "react";
import ChangePassword from "../components/forgetPassword/ChangePassword";
import Email from "../components/forgetPassword/Email";
import VerficationCode from "../components/forgetPassword/VerficationCode";



const ForgetPasswordPage = () => {
  const [isEmailActive,setIsEmailActive]=useState(true)
  const [isVerifyCodeActive,setIsVerifyCodeActive]=useState(false)
  const [isChangePasswordActive,setIsChangePasswordActive]=useState(false)
  return (
    <div>
      <div className={`${isEmailActive?"flex":"hidden"}`}>
        <Email  setIsEmailActive={setIsEmailActive} setIsVerifyCodeActive={setIsVerifyCodeActive}/>
      </div>
      <div className={`${isVerifyCodeActive?"flex":"hidden"} justify-center`}>
        <VerficationCode setIsVerifyCodeActive={setIsVerifyCodeActive} setIsChangePasswordActive={setIsChangePasswordActive}/>
      </div>
      <div className={`${isChangePasswordActive?"flex":"hidden"}`}>
        <ChangePassword setIsChangePasswordActive={setIsChangePasswordActive}/>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
