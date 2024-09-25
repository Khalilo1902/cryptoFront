import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IPost, TPost } from "../../interface";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  incrementPostsViews,
  toggleDislikePost,
  toggleLikePost,
} from "../../services/posts";
import { RootState } from "../store";

interface IPostState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  postId: string ;
}

const postAdapter = createEntityAdapter<IPost, string>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
  selectId: (post) => post?._id,
});

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const response = await getAllPosts();
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const createPostApi = createAsyncThunk(
  "/posts/createPostApi",
  async (initialPost: TPost) => {
    try {
      const response = await createPost(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const editPostApi = createAsyncThunk(
  "/posts/editPostApi",
  async (initialPost: TPost) => {
    try {
      const response = await editPost(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deletePostApi = createAsyncThunk(
  "/posts/deletePostApi",
  async (initialPost: TPost) => {
    try {
      const response = await deletePost(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleLikePostApi = createAsyncThunk(
  "/posts/toggleLikePost",
  async (initialPost: TPost) => {
    try {
      const response = await toggleLikePost(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleDisikePostApi = createAsyncThunk(
  "/posts/toggleDisikePostApi",
  async (initialPost: TPost) => {
    try {
      const response = await toggleDislikePost(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const incrementPostsViewsApi = createAsyncThunk(
  "/posts/incrementPostsViewsApi",
  async (initialPost: TPost) => {
    try {
      const response = await incrementPostsViews(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const initialState: IPostState & EntityState<IPost, string> =
  postAdapter.getInitialState({
    status: "idle",
    error: "",
    postId: ""
  });

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An Error Occurred";
      })
      .addCase(createPostApi.fulfilled, (state, action) => {
        postAdapter.setOne(state, action.payload.post);
      })
      .addCase(editPostApi.fulfilled, (state, action) => {
        postAdapter.setOne(state, action.payload.post);
      })
      .addCase(deletePostApi.fulfilled, (state, action) => {
        postAdapter.removeOne(state, action.payload._id);
      })
      .addCase(toggleLikePostApi.fulfilled, (state, action) => {
        postAdapter.setOne(state, action.payload.post);
      })
      .addCase(toggleDisikePostApi.fulfilled, (state, action) => {
        postAdapter.setOne(state, action.payload.post);
      })
      .addCase(incrementPostsViewsApi.fulfilled, (state, action) => {
        postAdapter.setOne(state, action.payload.post);
      });
  },
});

export const {setPostId} = postSlice.actions;

export const { selectAll: displayPosts, selectById: displayPost } =
  postAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = (userId: string) =>
  createSelector([displayPosts], (posts) =>
    posts.filter((post) => post?.user === userId)
  );

export default postSlice.reducer;
