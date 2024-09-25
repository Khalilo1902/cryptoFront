import { useSelector } from "react-redux";
import TemplatePosts from "./TemplatePosts";
import { RootState } from "../../../feature/store";
import {
  displayPosts,
  selectPostsByUser,
} from "../../../feature/reducers/postSlice";
import { useParams } from "react-router-dom";
interface IPostProps {
  components: "profile" | "explorer";
}
const Posts = ({ components }: IPostProps) => {
  const { userId } = useParams();
  const profilePosts = useSelector((state: RootState) =>
    selectPostsByUser(userId!)(state)
  );
  const explorerPost = useSelector(displayPosts);

  return (
    <div>
      {components === "profile" && <TemplatePosts posts={profilePosts} />}
      {components === "explorer" && <TemplatePosts posts={explorerPost} />}{" "}
    </div>
  );
};

export default Posts;
