import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  displayUser,
  resetPasswordApi,
} from "../../../feature/reducers/userSlice";
import { NotificationService } from "../../../services/notificationServices";
import { useNavigate } from "react-router";
import { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) =>
    displayUser(state, userId || "")
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formikSchema = Yup.object({
    password: Yup.string().min(
      6,
      "Die Password muss mindestens 06 Zeichen lang sein"
    ),
    newPassword: Yup.string().min(
      6,
      "Die Password muss mindestens 06 Zeichen lang sein"
    ),
    confirmPassword: Yup.string().min(
      6,
      "Die Password muss mindestens 06 Zeichen lang sein"
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await dispatch(resetPasswordApi(values)).unwrap();
        console.log("response", response);
        NotificationService.success(response.message);
        setTimeout(() => {
          navigate(`/profile/${userId}`);
        }, 3000);
      } catch (error: any) {
        NotificationService.error(error.message);
      }
    },

    validationSchema: formikSchema,
  });

  const { isDarkMode } = useSelector((state: RootState) => state.app);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-center items-center w-full mx-auto"
    >
      <div
        className={`p-6 rounded-lg w-full flex flex-col gap-3 ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        }`}
      >
        <h2 className="sm:text-4xl pt-6 font-bold font-FONT_VIGA mb-7">
          Change Password
        </h2>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={formik.values.password}
          className={`text-sm ${isDarkMode ? "input-dark" : "input-light"}`}
          placeholder="enter currentPassword"
        />
        <div className="flex relative items-center justify-center py-4 ">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
            defaultValue={formik.values.newPassword}
            type={showPassword ? "text" : "password"}
            className={` ${isDarkMode ? " input-dark" : " input-light"}`}
            placeholder="New Password"
          />
          {showPassword ? (
            <IoEyeSharp
              onClick={togglePasswordVisibility}
              className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
            />
          ) : (
            <RiEyeCloseFill
              onClick={togglePasswordVisibility}
              className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
            />
          )}
        </div>
        <div className="flex relative items-center justify-center">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.confirmPassword}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            className={` ${isDarkMode ? "input-dark" : "input-light"}`}
            placeholder="Confirm New Password"
          />
          {showPassword ? (
            <IoEyeSharp
              onClick={togglePasswordVisibility}
              className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
            />
          ) : (
            <RiEyeCloseFill
              onClick={togglePasswordVisibility}
              className="text-blue-500 absolute  right-0 mx-3 text-2xl cursor-pointer"
            />
          )}
        </div>
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={() => {
              formik.values.password === "";
              formik.values.newPassword === "";
              formik.values.confirmPassword === "";

              navigate("/profile");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
        <div className="w-full h-[130px]"></div>
      </div>
       
    </form>
  );
};

export default ChangePassword;
