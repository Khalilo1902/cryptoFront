import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../feature/store";
import { useSelector } from "react-redux";
import {
  displayUser,
  followUserApi,
  setFile,
  unFollowUserApi,
} from "../../../feature/reducers/userSlice";
import { IoIosCamera } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "../../image/Image";
import { NotificationService } from "../../../services/notificationServices";
import { selectPostsByUser } from "../../../feature/reducers/postSlice";
import {
  setIsFollowComponentActive,
  setIsFollowersComponentActive,
} from "../../../feature/reducers/appSlice";

const HeaderProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();
  const userLoginId = localStorage.getItem("userId");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const userPosts = useSelector((state: RootState) =>
    selectPostsByUser(userId!)(state)
  );
  const [image, setImage] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const user = useSelector((state: RootState) => displayUser(state, userId!));

  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      dispatch(setFile(selectedFile));
      setImage(true);
    }
  };

  const checkIsFollow = useCallback(() => {
    const isUserFollow = user?.followers?.find(
      (follow) => follow === userLoginId
    );
    isUserFollow !== undefined ? setIsFollow(true) : setIsFollow(false);
  }, [user?.followers, isFollow, userLoginId]);

  useEffect(() => {
    checkIsFollow();
    checkIsFollow();
  }, [isFollow, checkIsFollow]);
  return (
    <div className="my-4">
      <div className="sm:flex sm:gap-4 font-FONT_VIGA sm:justify-start sm:items-center ">
        <div className="relative">
          <img
            className="w-20 sm:w-40 rounded-full"
            src={user?.profile_photo}
            alt=""
          />
          <div
            className={`${
              userId === userLoginId
                ? "flex items-center bg-SECONDARY_GRAY/80 absolute sm:p-1.5 left-14 -bottom-1 rounded-full sm:left-24 sm:-bottom-1 cursor-pointer"
                : "hidden"
            }`}
          >
            <button onClick={handleClick}>
              <IoIosCamera className="icon text-xs sm:text-2xl" />
            </button>
            <input
              name="file"
              className="cursor-pointer"
              type="file"
              hidden
              ref={inputRef}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-3 items-center w-full justify-between">
            <p className=" pt-3 font-FONT_VIGA sm:text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
            <div className="flex items-center gap-2">
              <button
                className={`${
                  userId === userLoginId
                    ? "hidden"
                    : "btn btn-primary text-xs sm:text-base"
                } ${isFollow && "hidden"}`}
                onClick={async () => {
                  try {
                    const response = await dispatch(
                      followUserApi({ targetUserId: userId })
                    ).unwrap();
                    setIsFollow(true);
                    NotificationService.success(response.message);
                  } catch (error: any) {
                    NotificationService.error(error.message);
                  }
                }}
              >
                follow
              </button>
              <button
                className={`${
                  userId === userLoginId
                    ? "hidden"
                    : "btn btn-primary text-xs sm:text-base"
                } ${!isFollow && "hidden"}`}
                onClick={async () => {
                  try {
                    const response = await dispatch(
                      unFollowUserApi({ targetUserId: userId })
                    ).unwrap();
                    console.log("first");
                    NotificationService.success(response.message);
                  } catch (error: any) {
                    console.log("2");
                    NotificationService.error(error.message);
                  }
                }}
              >
                unFollow
              </button>
              <div className={`${userId === userLoginId ? "flex" : "hidden"}`}>
                <IoMdSettings
                  className="cursor-pointer icon btn-icon"
                  onClick={() => navigate(`/edit-profile/${userId}`)}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <p>
              <span>{userPosts?.length} </span>POST
            </p>
            <div
              onClick={() => dispatch(setIsFollowersComponentActive(true))}
              className=" cursor-pointer "
            >
              <span>{user?.followers?.length} </span>Followers
            </div>

            <div
              onClick={() => dispatch(setIsFollowComponentActive(true))}
              className=" cursor-pointer"
            >
              {user?.following?.length} Following
            </div>
          </div>
          <div>
            <p className="text-sm py-2 text-PRIMARY_GRAY">{user?.email}</p>
          </div>
          <div className="text-base  sm:font-FONT_VIGA line-clamp-3">
            {user?.bio}
          </div>
        </div>
      </div>
      <div className="flex mt-2 items-center font-FONT_VIGA font-bold justify-evenly md:hidden">
        <div className="flex flex-col items-center gap-2">
          <span>{userPosts?.length}</span>
          <span>Post</span>
        </div>
        <div
          className="flex flex-col items-center gap-2"
          onClick={() => dispatch(setIsFollowersComponentActive(true))}
        >
          <span>{user?.followers?.length}</span>
          <span>Followers</span>
        </div>

        <div
          onClick={() => {
            dispatch(setIsFollowComponentActive(true));
          }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span>{user?.following?.length}</span>
          <span>Following</span>
        </div>
      </div>
      <div className={`${image ? "flex" : "hidden"}`}>
        <Image image={image} setImage={setImage} />
      </div>
    </div>
  );
};

export default HeaderProfile;
