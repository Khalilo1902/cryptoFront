import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NotificationService } from "../../services/notificationServices";
import { registerUserApi, setIsLoginFormOpen } from "../../feature/reducers/userSlice";
import logo from "../../assets/images/logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { AppDispatch } from "../../feature/store";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed in first name"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed in last name"),
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),

    gender: Yup.string().oneOf(["male", "female", "diverse"]),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    },
    onSubmit: async (values) => {
      try {
        const response = await dispatch(registerUserApi(values)).unwrap();
        NotificationService.success(response.message);
        setTimeout(() => {
          dispatch(setIsLoginFormOpen(true));
        }, 3000);
      } catch (error: any) {
        NotificationService.error(error.message);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <div className="flex flex-col items-center gap-12 rounded-xl">
        <div className="w-full sm:w-full md:w-[500px] lg:w-[500px] px-8 py-16 flex flex-col rounded-3xl bg-STONE_300 box-theme">
          <div className="w-full flex justify-center items-center gap-5 mb-8 cursor-pointer">
            <img className="w-16 h-16" src={logo} alt="" />
            <h3 className="font-ANTON text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              Crypto Currency
            </h3>
          </div>
          <div className="flex items-center gap-5 mb-8 justify-between mr-5">
            <h4 className="font-ANTON text-3xl">Register</h4>
            <FaArrowRightLong
              className="btn btn-primary"
              onClick={() => dispatch(setIsLoginFormOpen(true))}
            />
          </div>

          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <input
              className={`input-light ${formik.touched.firstName && formik.errors.firstName && "border-red-500"}`}
              placeholder="Firstname"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className={`input-light ${formik.touched.lastName && formik.errors.lastName && "border-red-500"}`}
              placeholder="Lastname"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className={`input-light ${formik.touched.email && formik.errors.email && "border-red-500"}`}
              placeholder="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="flex relative items-center justify-center">
              <input
                className={`input-light ${formik.touched.password && formik.errors.password && "border-red-500"}`}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                className={`input-light ${formik.touched.confirmPassword && formik.errors.confirmPassword && "border-red-500"}`}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {showPassword ? (
                <IoEyeSharp
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-500 absolute right-0 mx-3 text-2xl cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-6 text-lg">
              <div className="flex gap-2">
                <label className="flex items-center gap-2" htmlFor="male">
                  <input
                    className="w-6 h-6"
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "male"}
                  />
                  Male
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="female" className="flex items-center gap-2">
                  <input
                    className="w-6 h-6"
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "female"}
                  />
                  Female
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="diverse" className="flex items-center gap-2">
                  <input
                    className="w-6 h-6"
                    id="diverse"
                    type="radio"
                    name="gender"
                    value="diverse"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "diverse"}
                  />
                  Diverse
                </label>
              </div>
            </div>
            <div className={`input ${formik.isValid ? "hidden" : "border-red-500 text-red-500"}`}>
              {Object.values(formik.errors)[0]}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
