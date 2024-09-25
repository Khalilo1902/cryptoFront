import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { createComment, deleteComment, editComment, getComments, getPostComments, toggleDislikeComment, toggleLikeComment } from "../../services/comments";
import { RootState } from "../store";
import { IComment, TComment } from "../../interface";

interface ICommentState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  commentId: string;
}

const commentAdapter = createEntityAdapter<IComment, string>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
  selectId: (comment) => comment._id,
});

export const fetchComments = createAsyncThunk(
  "/comments/fetchComments",
  async () => {
    try {
      const response = await getComments();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const getPostCommentsApi = createAsyncThunk(
    "/comments/getPostCommentsApi",
    async (initialComment: TComment) => {
      try {
        const response = await getPostComments(initialComment);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );

export const createCommentApi = createAsyncThunk(
  "/comments/createCommentApi",
  async (initialComment: TComment) => {
    try {
      const response = await createComment(initialComment);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const editCommentApi = createAsyncThunk(
  "/comments/editCommentApi",
  async (initialComment: TComment) => {
    try {
      const response = await editComment(initialComment);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteCommentApi = createAsyncThunk(
  "/comments/deleteCommentApi",
  async (initialComment: TComment) => {
    try {
      const response = await deleteComment(initialComment);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleLikeCommentApi = createAsyncThunk(
  "/comments/toggleLikeCommentApi",
  async (initialComment: TComment) => {
    try {
      const response = await toggleLikeComment(initialComment);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleDisikeCommentApi = createAsyncThunk(
  "/comments/toggleDisikeCommentApi",
  async (initialComment: TComment) => {
    try {
      const response = await toggleDislikeComment(initialComment);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const initialState: ICommentState & EntityState<IComment, string> =
  commentAdapter.getInitialState({
    status: "idle",
    error: "",
    commentId: "",
  });

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "success";
        commentAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An Error Occurred";
      })
      .addCase(createCommentApi.fulfilled, (state, action) => {
        commentAdapter.addOne(state, action.payload.comment);
      })
      .addCase(getPostCommentsApi.fulfilled, (state, action) => {
        commentAdapter.setOne(state, action.payload.comment);
      })
      .addCase(editCommentApi.fulfilled, (state, action) => {
        commentAdapter.updateOne(state, action.payload._id);
        commentAdapter.setOne(state, action.payload.comment);
      })
      .addCase(deleteCommentApi.fulfilled, (state, action) => {
        commentAdapter.removeOne(state, action.payload._id);
      })
      .addCase(toggleLikeCommentApi.fulfilled, (state, action) => {
        commentAdapter.setOne(state, action.payload.post);
      })
      .addCase(toggleDisikeCommentApi.fulfilled, (state, action) => {
        commentAdapter.setOne(state, action.payload.post);
      })
  },
});

export const { setCommentId } = commentSlice.actions;

export const { selectAll: displayComments, selectById: displayComment } =
  commentAdapter.getSelectors((state: RootState) => state.comments);

export default commentSlice.reducer;
