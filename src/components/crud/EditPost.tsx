/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { displayUser } from "../../feature/reducers/userSlice";
import { IoClose } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  setIsEditComponentActive,
  setIsSpinnerActive,
  setPostIdPublic,
} from "../../feature/reducers/appSlice";

import { useEffect, useRef, useState } from "react";

import Spinner from "../Spinner";
import { displayPost, editPostApi } from "../../feature/reducers/postSlice";
import { NotificationService } from "../../services/notificationServices";
import {
  displayAnalyze,
  editAnalyzeApi,
} from "../../feature/reducers/analyzeSlice";
import {
  displaySingleNews,
  editNewsApi,
} from "../../feature/reducers/newsSlice";

interface IEditPostProps {
  components: "post" | "news" | "explorer" | "analyse";
}

const EditPost = ({ components }: IEditPostProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isDarkMode, isSpinnerActive, postIdPublic, isEditComponentActive } = useSelector(
    (state: RootState) => state.app
  );

  const post = useSelector((state: RootState) => displayPost(state, postIdPublic));
  const analyse = useSelector((state: RootState) =>
    displayAnalyze(state, postIdPublic)
  );
  const news = useSelector((state: RootState) =>
    displaySingleNews(state, postIdPublic)
  );
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(String(post?.image || analyse?.image));
  const [formData, setFormData] = useState({
    title: post?.title || analyse?.title || news?.title,
    description: post?.description || analyse?.description || news?.description,
    image: "",
  });

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };
  const handleClick = () => {
    if (inputRef?.current !== null) {
      inputRef?.current.click();
    }
  };

  useEffect(() => {
    if (post || analyse || news) {
      setFormData({
        title: post?.title || analyse?.title || news?.title,
        description:
          post?.description || analyse?.description || news?.description,
        image: "",
      });
      setPreview(String(post?.image || analyse?.image || news?.image));
    }
  }, [postIdPublic]);

  const onChangeForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      postIdPublic,
      title: formData?.title,
      description: formData?.description,
      image: file || undefined,
      targetUser: post?.user,
    };
    switch (components) {
      case "post":
        try {
          const response = await dispatch(editPostApi(data)).unwrap();
          dispatch(setIsSpinnerActive(true));
          NotificationService.success(response.message);
          setTimeout(() => {
            dispatch(setIsEditComponentActive(false));
            dispatch(setIsSpinnerActive(false));
            setFormData({
              title: "",
              description: "",
              image: "",
            });
            setFile(null);
            dispatch(setPostIdPublic(""));
          }, 3000);
        } catch (error: any) {
          NotificationService.error(error.message);
          dispatch(setIsSpinnerActive(false));
        }
        break;
      case "explorer":
        try {
          const response = await dispatch(editPostApi(data)).unwrap();
          dispatch(setIsSpinnerActive(true));
          NotificationService.success(response.message);
          setTimeout(() => {
            dispatch(setIsEditComponentActive(false));
            dispatch(setIsSpinnerActive(false));
            setFormData({
              title: "",
              description: "",
              image: "",
            });
            setFile(null);
            dispatch(setPostIdPublic(""));
          }, 3000);
        } catch (error: any) {
          NotificationService.error(error.message);
          dispatch(setIsSpinnerActive(false));
        }
        break;
      case "analyse":
        try {
          const response = await dispatch(editAnalyzeApi(data)).unwrap();
          console.log("analyse", response);
          dispatch(setIsSpinnerActive(true));
          NotificationService.success(response.message);
          setTimeout(() => {
            dispatch(setIsEditComponentActive(false));
            dispatch(setIsSpinnerActive(false));
            setFormData({
              title: "",
              description: "",
              image: "",
            });
            setFile(null);
            dispatch(setPostIdPublic(""));
          }, 3000);
        } catch (error: any) {
          NotificationService.error(error.message);
          dispatch(setIsSpinnerActive(false));
        }
        break;

      case "news":
        try {
          const response = await dispatch(editNewsApi(data)).unwrap();
          dispatch(setIsSpinnerActive(true));
          NotificationService.success(response.message);
          setTimeout(() => {
            dispatch(setIsEditComponentActive(false));
            dispatch(setIsSpinnerActive(false));
            setFormData({
              title: "",
              description: "",
              image: "",
            });
            setFile(null);
            dispatch(setPostIdPublic(""));
          }, 3000);
        } catch (error: any) {
          NotificationService.error(error.message);
          dispatch(setIsSpinnerActive(false));
        }
        break;
    }
  };

  return (
    <div
      className={`fixed inset-0 w-full sm:bg-DARK_BLUE/50 sm:backdrop-blur-sm flex flex-col  justify-center items-center z-50  ${
        isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      }`}
    >
      <div
        className={`relative w-full h-fit sm:w-2/3 md:w-2/3 xl:w-1/3 my-4 rounded-md flex flex-col ${
          isDarkMode ? " bg-SECONDARY_BLACK" : " bg-SECONDARY_WHITE"
        }`}
      >
        <div className="p-4 grid grid-cols-5 border-b-2 mx-5 py-7">
          <div className="col-span-1"></div>
          <h1 className=" col-span-3">{`Edit ${components}`}</h1>

          <div className="col-span-1 flex justify-end items-center">
            <div
              className=" bg-SECONDARY_GRAY rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-PRIMARY_GRAY transition-all duration-150 "
              onClick={() => {
                console.log(isEditComponentActive)
                dispatch(setIsEditComponentActive(false))
                console.log(isEditComponentActive)
             
              }
                
              }
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
        <form>
          <div className="px-5">
            <input
              className={`w-full outline-none p-2 placeholder:text-center placeholder:text-xl text-xl font-FONT_VIGA border-2 rounded-lg ${
                isDarkMode ? " bg-PRIMARY_BLACK" : ""
              }`}
              placeholder="What is your Title?"
              type="text"
              name="title"
              value={formData?.title}
              onChange={onChangeForm}
            />
          </div>
          <div className="w-full flex justify-center">
            <div
              className={`w-full border-2 rounded-lg h-32 md:h-72 mx-5 my-4 relative  ${
                isDarkMode ? " bg-PRIMARY_BLACK " : "bg-LIGHT_BLUE"
              }`}
            >
              <div
                className={`relative flex flex-col w-full justify-center items-center gap-4 h-32 md:h-72 z-10`}
                onClick={handleClick}
              >
                <MdOutlineAddPhotoAlternate className=" text-4xl cursor-pointer " />
                <h3>Add Photo</h3>
                <input
                  className="cursor-pointer"
                  type="file"
                  value={formData?.image}
                  hidden
                  ref={inputRef}
                  onChange={loadImage}
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
              className={`w-full h-32 outline-none placeholder:text-center placeholder:text-xl p-2 text-xl font-FONT_VIGA border-2 rounded-lg ${
                isDarkMode ? " bg-PRIMARY_BLACK" : ""
              }`}
              name="description"
              value={formData?.description}
              onChange={onChangeForm}
              maxLength={1200}
              aria-controls="all"
              rows={10}
              cols={10}
              placeholder="What is your Description?"
            />
          </div>
          <div className=" w-full flex items-center justify-center ">
            <button
              type="button"
              className=" btn btn-primary !w-full my-4 mx-5"
              onClick={handleSubmit}
            >
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
    </div>
  );
};

export default EditPost;
