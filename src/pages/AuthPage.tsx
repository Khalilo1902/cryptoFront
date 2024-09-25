import { useSelector } from "react-redux";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Lottie from "lottie-react";
import login from "../assets/animation/login.json"

import MaxWithWrapper from "../components/MaxWithWrapper";
import { RootState } from "../feature/store";

const AuthPage = () => {
  const { isLoginFormOpen } = useSelector((state: RootState) => state.users);

  return (
    <MaxWithWrapper>
      <div className="mt-32 flex justify-center items-center w-full gap-20">
        <div className="hidden lg:flex">
          <Lottie className="xl:w-[600px] lg:w-[400px]" animationData={login} />
        </div>
        <>
          <div className={` ${!isLoginFormOpen && "hidden"}`}>
            <Login />
          </div>
          <div className={`${isLoginFormOpen && "hidden"}`}>
            <Register />
          </div>
        </>
      </div>
    </MaxWithWrapper>
  );
};

export default AuthPage;
