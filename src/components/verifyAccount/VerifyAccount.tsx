import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../feature/store";
import {
  accountVerificationApi,
} from "../../feature/reducers/userSlice";
import { NotificationService } from "../../services/notificationServices";

const VerifyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("verify") || "";

  const navigate = useNavigate();



  useEffect(() => {
    const verifyAccount = async () => {
      try {
        console.log("useEffect",token);
        const response = await dispatch(accountVerificationApi({token:token})).unwrap();
        console.log(response);

        NotificationService.success(response.message);
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } catch (error: any) {
        NotificationService.error(error.message);
      }
    };
    verifyAccount();
  },[token]);
  return (
    <div className=" h-screen flex justify-center items-center w-full">
      (
      <div className="w-full md:w-2/3 h-32 bg-green-500 flex justify-center items-center font-FONT_VIGA font-bold text-3xl rounded-lg"></div>
      )
    </div>
  );
};

export default VerifyAccount;
