/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentApi,
  displayComments,
  editCommentApi,
} from "../../feature/reducers/commentSlice";
import { AppDispatch, RootState } from "../../feature/store";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineCheck } from "react-icons/md";
import { NotificationService } from "../../services/notificationServices";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

interface IShowProps {
  components: "analyze" | "news" | "post";
  postIdPublic: string;
}

const ShowComments = ({ postIdPublic }: IShowProps) => {
  const allComments = useSelector(displayComments);
  const comments = allComments.filter(
    (comment) => comment.post === postIdPublic
  );
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId") || "";
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const [TextAreaValue, setTextAreaValue] = useState("");
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [showTextArea, setShowTextArea] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleEditClick = (commentId: string) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [commentId]: !prevEditStates[commentId],
    }));
  };

  const handleShowTextArea = (commentId: string) => {
    setShowTextArea((prevShowTextArea) => ({
      ...prevShowTextArea,
      [commentId]: !prevShowTextArea[commentId],
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };
  return (
    <div className="w-full max-h-[500px] overflow-y-auto overflow-x-hidden flex flex-col items-center gap-4 p-2 my-6">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className={`w-full shadow-lg border-b-2 last:border-none flex flex-col gap-2 odd:mr-8 rounded-md px-2 ${
            userId === comment?.user?._id && isDarkMode
              ? "bg-DARK_SLATE "
              : userId === comment?.user?._id && !isDarkMode
              ? "bg-LIGHT_BLUE "
              : userId !== comment?.user?._id && isDarkMode
              ? " bg-SECONDARY_BLACK"
              : " bg-SECONDARY_WHITE "
          }
   `}
        >
          <div className="flex justify-between p-2">
            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={comment?.user?.profile_photo}
                alt=""
              />
              <p>
                {comment?.user?.firstName} {comment?.user?.lastName}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xl">
              <div
                className={`flex items-center gap-4 text-xl ${
                  editStates[comment._id] ? "hidden" : "flex"
                }`}
              >
                <CiEdit
                  onClick={() => {
                    setTextAreaValue(comment.comment);
                    handleEditClick(comment._id);
                  }}
                  className="cursor-pointer hover:text-SECONDARY_BLUE hover:text-2xl"
                />

                <IoCloseSharp
                  onClick={async () => {
                    try {
                      await dispatch(
                        deleteCommentApi({
                          targetUser: comment.user?._id,
                          commentIdPublic: comment._id,
                        })
                      ).unwrap();
                    } catch (error: any) {
                      NotificationService.error(error.message);
                    }
                  }}
                  className="cursor-pointer hover:text-SECONDARY_RED hover:text-2xl"
                />
              </div>
              <div>
                <MdOutlineCheck
                  onClick={async () => {
                    const data = {
                      targetUser: comment.user?._id,
                      commentIdPublic: comment._id,
                      comment: TextAreaValue,
                    };
                    try {
                      const response = await dispatch(
                        editCommentApi(data)
                      ).unwrap();
                      NotificationService.success(response.message);
                      console.log("response", response);
                      setEditStates((prevEditStates) => ({
                        ...prevEditStates,
                        [comment._id]: false,
                      }));
                    } catch (error: any) {
                      NotificationService.error(error.message);
                    }
                  }}
                  className={`cursor-pointer hover:text-SECONDARY_GREEN hover:text-2xl ${
                    editStates[comment._id] ? "flex" : "hidden"
                  }`}
                />
              </div>
            </div>
          </div>
          <div
            className="py-2 px-4 "
          >
            <div
              className={`flex flex-col ${
                editStates[comment._id] ? "hidden" : "flex"
              }`}
            >
              {showTextArea[comment._id] ? (
                (console.log(showTextArea[comment._id]),
                (
                  <p>
                    {comment.comment}{" "}
                    <span
                      onClick={() => handleShowTextArea(comment._id)}
                      className="underline cursor-pointer font-bold"
                    >
                      See Less
                    </span>
                  </p>
                ))
              ) : (
                <p>
                  {comment.comment.slice(0, 200)}...
                  {comment.comment.length > 200 && (
                    <span
                      onClick={() => handleShowTextArea(comment._id)}
                      className="underline cursor-pointer font-bold"
                    >
                      See More
                    </span>
                  )}
                </p>
              )}
            </div>
            <p className={` ${editStates[comment._id] ? "flex" : "hidden"}`}>
              <textarea
                onChange={handleChange}
                value={TextAreaValue}
                className="w-full line-clamp-3 p-2 overflow-y-auto outline-none font-FONT_SALSA h-fit"
                rows={10}
                cols={10}
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
