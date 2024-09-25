import { FaLocationArrow } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import { displayUser } from "../../../feature/reducers/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCommentApi } from "../../../feature/reducers/commentSlice";
import { NotificationService } from "../../../services/notificationServices";

interface ICreateCommentProps {
  component: "post" | "news" | "analyze" | "explorer";
}
const CreateComment = ({ component }: ICreateCommentProps) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch<AppDispatch>();

  const userCommentProfile = useSelector((state: RootState) =>
    displayUser(state, userId!)
  );
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const formSchema = Yup.object({
    comment: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: formSchema,
      onSubmit: async (values) => {
        const data = {
          comment: values.comment,
        };
        switch (component) {
          case "analyze":
            try {
              await dispatch(createCommentApi(data));
            } catch (error:any) {
              NotificationService.error(error.message);
            }
            break;
        }
      },
    });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex w-full px-3 gap-2 items-center ">
        {/* Profilbild und Kommentareingabefeld */}
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={userCommentProfile?.profile_photo}
          alt={userCommentProfile?.firstName}
        />

        <input
          className={`w-full h-[46px] rounded-full px-5  ${
            isDarkMode ? "input-dark" : "input-light"
          }`}
          type="text"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur("comment")}
          placeholder="comment..."
        />
        <button type="submit">
          <FaLocationArrow className="text-xl text-PRIMARY_BLUE hover:text-SECONDARY_BLUE cursor-pointer" />
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
