
import MaxWithWrapper from "../components/MaxWithWrapper";
import CoinMarquee from "../components/coins/CoinMarquee";
import EditPost from "../components/crud/EditPost";
import TopNewsCardSlider from "../components/news/TopNewsCardSlider";
import SinglePost from "../components/user/post/SinglePost";
import { useSelector } from "react-redux";
import { RootState } from "../feature/store";
import DeletePost from "../components/crud/DeletePost";

const PostPage = () => {
  const { isEditComponentActive, isDeleteComponentActive } = useSelector(
    (state: RootState) => state.app
  );
  return (
    <MaxWithWrapper>
      <div className="my-4">
        <CoinMarquee />
      </div>
      <div className="my-6">
        <TopNewsCardSlider />
      </div>
      <SinglePost />
      <div className={`${isEditComponentActive ? "" : "hidden"}`}>
        <EditPost components="post" />
      </div>
      <div className={`${isDeleteComponentActive ? "" : "hidden"}`}>
        <DeletePost components="post" />
      </div>
    </MaxWithWrapper>
  );
};

export default PostPage;
