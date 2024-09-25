import MaxWithWrapper from "../components/MaxWithWrapper";
import CreatePost from "../components/crud/CreatePost";

const CreatePostPage = () => {
    return (
        <MaxWithWrapper>
            <CreatePost components="post" />
        </MaxWithWrapper>
    );
}

export default CreatePostPage;