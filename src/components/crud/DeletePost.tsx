/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../feature/store";
import { deletePostApi, displayPost } from "../../feature/reducers/postSlice";
import MaxWithWrapper from "../MaxWithWrapper";
import {
  setIsDeleteComponentActive,
  setIsSpinnerActive,
} from "../../feature/reducers/appSlice";
import Spinner from "../Spinner";
import { NotificationService } from "../../services/notificationServices";
import { useState } from "react";
import { deleteAnalyzeApi, displayAnalyze } from "../../feature/reducers/analyzeSlice";
import { deleteNewsApi, displaySingleNews } from "../../feature/reducers/newsSlice";
 

interface IDeletePostProps {
  components: "post" | "news" | "explorer" | "analyse";
}

const DeletePost = ({ components }: IDeletePostProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode, isSpinnerActive, postIdPublic } = useSelector(
    (state: RootState) => state.app
  );
  const post = useSelector((state: RootState) =>
    displayPost(state, postIdPublic)
  );
  const news = useSelector((state: RootState) =>
    displaySingleNews(state, postIdPublic)
  );
  const analyse = useSelector((state: RootState) =>
    displayAnalyze(state, postIdPublic)
  );
  return (
    <MaxWithWrapper>
      <div className="fixed inset-0 bg-DARK_BLUE/50 backdrop-blur-md z-50 flex justify-center items-center">
        <div
          className={`relative px-5 mx-5 w-full sm:w-1/2 lg:w-1/3 rounded-lg ${
            isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
          }`}
        >
          <div className="py-5 text-center border-b-2">
            <h2 className=" font-FONT_ROBOTO font-bold ">
              delete {components}
            </h2>
          </div>
          <div className="py-5">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div className="pb-6 flex justify-center gap-4 font-FONT_VIGA text-PRIMARY_WHITE">
            <button
              className="border-2 bg-PRIMARY_RED w-20 py-1 rounded-lg hover:bg-transparent hover:border-PRIMARY_RED hover:text-PRIMARY_RED"
              onClick={async () => {
                switch (components) {
                  case "post":
                    if (!isSubmitting) {
                      setIsSubmitting(true);
                      try {
                        await dispatch(
                          deletePostApi({
                            postIdPublic,
                            targetUser: post?.user,
                          })
                        ).unwrap();
                        dispatch(setIsSpinnerActive(true));
                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                        }, 3000);
                        setIsSpinnerActive(false);
                      } catch (error: any) {
                        NotificationService.error(error.message);
                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                          setIsSpinnerActive(false);
                        }, 3000);
                      } finally {
                        setIsSubmitting(false); // Nach Abschluss der Funktion setIsSubmitting auf false setzen
                      }
                    }
                    break;
                  case "news":
                    if (!isSubmitting) {
                      setIsSubmitting(true);
                      try {
                        await dispatch(
                          deleteNewsApi({
                            postIdPublic,
                            targetUser: news?.user,
                          })
                        ).unwrap();
                        dispatch(setIsSpinnerActive(true));

                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                        }, 3000);
                        setIsSpinnerActive(false);
                      } catch (error: any) {
                        NotificationService.error(error.message);
                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                          setIsSpinnerActive(false);
                        }, 3000);
                      } finally {
                        setIsSubmitting(false); // Nach Abschluss der Funktion setIsSubmitting auf false setzen
                      }
                    }
                    break;
                  case "analyse":
                    if (!isSubmitting) {
                      setIsSubmitting(true);
                      try {
                        await dispatch(
                          deleteAnalyzeApi({
                            postIdPublic,
                            targetUser: analyse?.user,
                          })
                        ).unwrap();
                        dispatch(setIsSpinnerActive(true));

                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                        }, 3000);
                        setIsSpinnerActive(false);
                      } catch (error: any) {
                        NotificationService.error(error.message);
                        setTimeout(() => {
                          dispatch(setIsDeleteComponentActive(false));
                          setIsSpinnerActive(false);
                        }, 3000);
                      } finally {
                        setIsSubmitting(false); // Nach Abschluss der Funktion setIsSubmitting auf false setzen
                      }
                    }

                    break;
                  case "explorer":
                    try {
                      await dispatch(
                        deletePostApi({
                          postIdPublic,
                          targetUser: post?.user,
                        })
                      ).unwrap();
                      dispatch(setIsSpinnerActive(true));

                      setTimeout(() => {
                        dispatch(setIsDeleteComponentActive(false));
                      }, 3000);
                      setIsSpinnerActive(false);
                    } catch (error: any) {
                      NotificationService.error(error.message);
                      setTimeout(() => {
                        dispatch(setIsDeleteComponentActive(false));
                        setIsSpinnerActive(false);
                      }, 3000);
                    }
                    break;
                }
              }}
            >
              sure
            </button>
            <button
              className="border-2 bg-PRIMARY_BLUE w-20 py-1 rounded-lg hover:bg-transparent hover:border-PRIMARY_BLUE hover:text-PRIMARY_BLUE"
              onClick={() => dispatch(setIsDeleteComponentActive(false))}
            >
              Cancle
            </button>
          </div>
          <div
            className={` ${isSpinnerActive ? "absolute inset-0" : "hidden"} `}
          >
            <Spinner />
          </div>
        </div>
      </div>
    </MaxWithWrapper>
  );
};

export default DeletePost;
