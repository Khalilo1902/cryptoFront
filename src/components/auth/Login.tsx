import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  loginUserApi,
  setIsLoginFormOpen,
  setUserInfo,
} from "../../feature/reducers/userSlice";
import { NotificationService } from "../../services/notificationServices";
import { AppDispatch } from "../../feature/store";
import logo from "../../assets/images/logo.png";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const formSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await dispatch(loginUserApi(values)).unwrap();
        NotificationService.success(response.message);
        dispatch(setUserInfo(response.userInfo))
        localStorage.setItem("userId", response.userInfo.userId);
        localStorage.setItem("exp", response.userInfo.exp);
        setTimeout(() => {
          
          navigate("/home", { replace: true });
        }, 3000);
      } catch (error: any) {
        NotificationService.error(error.message);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div
      className={`
             "w-full flex justify-center"
        }`}
    >
      <div
        className={` h-fit w-full sm:w-full md:w-[500px]  lg:w-[500px] px-8 py-16 flex flex-col  rounded-3xl bg-STONE_300 box-theme`}
      >
        <div className="w-full flex justify-center items-center gap-5 mb-8 cursor-pointer">
          <img className="w-16 h-16" src={logo} alt="" />
          <h3 className=" font-ANTON text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
            Crypto Currency
          </h3>
        </div>
        <div className="flex items-center gap-5 mb-8 justify-start mr-5">
          <h4 className="">If you have an account, please log in.</h4>
        </div>

        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <input
            className="input-light"
            placeholder="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className="input-light"
            placeholder="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="mt-6">
          <NavLink to="/forget-password">Forgot Password?</NavLink>
        </div>
        <div className="my-6 flex w-full items-center gap-3">
          <div className="w-full border"></div>
          <h2 className="text-center w-fit">Or</h2>
          <div className="w-full border"></div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setIsLoginFormOpen(false));
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
