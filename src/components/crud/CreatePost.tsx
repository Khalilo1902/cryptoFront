/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { displayUser } from "../../feature/reducers/userSlice";
import { IoClose } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  setIsPostComponentActive,
  setIsSpinnerActive,
} from "../../feature/reducers/appSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRef, useState } from "react";
import { createPostApi } from "../../feature/reducers/postSlice";
import { NotificationService } from "../../services/notificationServices";

import Spinner from "../Spinner";
import { createNewsApi } from "../../feature/reducers/newsSlice";
import { createAnalyzeApi } from "../../feature/reducers/analyzeSlice";

interface ICreatePostProps {
  components: "post" | "news" | "explorer" | "analyse";
}

const CreatePost = ({ components }: ICreatePostProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode, isSpinnerActive } = useSelector(
    (state: RootState) => state.app
  );
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  const formSchema = yup.object({
    title: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const data = {
        title: values.title,
        description: values.description,
        image: file || undefined,
        user: localStorage.getItem("userId") || "",
      };

      switch (components) {
        case "post":
          if (!isSubmitting) {
            setIsSubmitting(true);
            try {
              const response = await dispatch(createPostApi(data)).unwrap();
              dispatch(setIsSpinnerActive(true));
              NotificationService.success(response.message);
              setTimeout(() => {
                dispatch(setIsPostComponentActive(false));
                dispatch(setIsSpinnerActive(false));
                values.title = "";
                values.description = "";
                setFile(null);
                setPreview("");
              }, 3000);
            } catch (error: any) {
              NotificationService.error(error.message);
              dispatch(setIsSpinnerActive(false));
            } finally {
              setIsSubmitting(false); 
            }
          }

          break;

        case "analyse":
          if (!isSubmitting) {
            setIsSubmitting(true);
            try {
              const response = await dispatch(createAnalyzeApi(data)).unwrap();
              dispatch(setIsSpinnerActive(true));
              NotificationService.success(response.message);
              setTimeout(() => {
                dispatch(setIsPostComponentActive(false));
                dispatch(setIsSpinnerActive(false));
                values.title = "";
                values.description = "";
                setFile(null);
                setPreview("");
              }, 3000);
            } catch (error: any) {
              NotificationService.error(error.message);
              dispatch(setIsSpinnerActive(false));
            } finally {
              setIsSubmitting(false); 
            }
          }
          break;

        case "news":
          if (!isSubmitting){
            setIsSubmitting(true);
            try {
              const response = await dispatch(createNewsApi(data)).unwrap();
              dispatch(setIsSpinnerActive(true));
              NotificationService.success(response.message);
              setTimeout(() => {
                dispatch(setIsPostComponentActive(false));
                dispatch(setIsSpinnerActive(false));
                values.title = "";
                values.description = "";
                setFile(null);
                setPreview("");
              }, 3000);
             
            } catch (error: any) {
              NotificationService.error(error.message);
              setIsSpinnerActive(false);
            }finally {
              setIsSubmitting(false); 
            }
          }
       
          break;
      }
    },
  });

  return (
    <div
      className={`fixed inset-0 w-full sm:bg-DARK_BLUE/50  sm:backdrop-blur-sm flex flex-col  justify-center items-center z-50  ${
        isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
      }`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className={`relative w-full h-fit sm:w-2/3 md:w-2/3 xl:w-1/3 my-4 rounded-md flex flex-col ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        }`}
      >
        <div className="p-4 grid grid-cols-5 border-b-2 mx-5 py-7">
          <div className="col-span-1"></div>
          <h1 className=" col-span-3">{`Create ${components}`}</h1>

          <div className="col-span-1 flex justify-end items-center">
            <div
              className=" bg-SECONDARY_GRAY rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-PRIMARY_GRAY transition-all duration-150 "
              onClick={() => dispatch(setIsPostComponentActive(false))}
            >
              <IoClose className="text-PRIMARY_GRAY hover:text-SECONDARY_GRAY text-2xl transition-all duration-150 " />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4 px-5">
          <img
            className="w-12 h-12 rounded-full"
            src={user?.profile_photo}
            alt=""
          />
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
        </div>
        <div className="px-5">
          <input
            className={`w-full outline-none p-2 placeholder:text-center placeholder:text-xl text-xl font-FONT_VIGA border-2 rounded-lg ${
              isDarkMode ? " bg-PRIMARY_BLACK" : ""
            }`}
            placeholder="What is your Title?"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
        </div>
        <div className="w-full flex justify-center">
          <div
            className={`w-full border-2 rounded-lg h-32 md:h-72 mx-5 my-4 relative  ${
              isDarkMode ? " bg-PRIMARY_BLACK " : "bg-LIGHT_BLUE"
            }`}
          >
            <div
              onClick={handleClick}
              className={`relative flex flex-col w-full justify-center items-center gap-4 h-32 md:h-72 z-10`}
            >
              <MdOutlineAddPhotoAlternate className=" text-4xl cursor-pointer " />
              <h3>Add Photo</h3>
              <input
                className="cursor-pointer"
                value={formik.values.image}
                type="file"
                hidden
                ref={inputRef}
                onChange={loadImage}
                onBlur={formik.handleBlur("image")}
              />
            </div>
            <div
              className={`${
                preview
                  ? "absolute w-full inset-0  h-32 md:h-72 z-20"
                  : "hidden"
              }`}
            >
              <figure>
                <img
                  className=" rounded-lg w-full h-32 md:h-72 "
                  src={preview}
                  alt=""
                />
              </figure>
            </div>

            <div className=" absolute top-2 right-2 z-30">
              <div className=" bg-SECONDARY_WHITE rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-PRIMARY_GRAY transition-all duration-150 ">
                <IoClose
                  onClick={() => {
                    setPreview("");
                  }}
                  className="text-PRIMARY_GRAY hover:text-SECONDARY_WHITE text-2xl transition-all duration-150 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-5">
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            className={`w-full h-32 outline-none placeholder:text-center placeholder:text-xl p-2 text-xl font-semibold font-FONT_VIGA border-2 rounded-lg ${
              isDarkMode ? " bg-PRIMARY_BLACK" : ""
            }`}
            aria-controls="all"
            placeholder="What is your Description?"
          />
        </div>
        <div className=" w-full flex items-center justify-center ">
          <button type="submit" className=" btn btn-primary !w-full my-4 mx-5">
            Save
          </button>
        </div>
        <div>
          <div
            className={` ${
              isSpinnerActive ? " absolute inset-0 z-50" : "hidden"
            }`}
          >
            <Spinner />
            <p>In progress ...</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
