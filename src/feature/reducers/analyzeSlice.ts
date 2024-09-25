/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  createAnalyze,
  deleteAnalyze,
  editAnalyze,
  getAllAnalysis,
  incrementAnalyzeViews,
  toggleDislikeAnalyze,
  toggleLikeAnalyze,
} from "../../services/analyze";
import { IPost, TPost } from "../../interface";

interface IAnalyzeState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  analyzeId: string;
}

const analyzeAdapter = createEntityAdapter<IPost, string>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
  selectId: (analyze) => analyze._id,
});

export const fetchAnalysis = createAsyncThunk(
  "/analysis/fetchAnalysis",
  async () => {
    try {
      const response = await getAllAnalysis();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const createAnalyzeApi = createAsyncThunk(
  "/analysis/createAnalyzeApi",
  async (initialAnalyze: TPost) => {
    try {
      const response = await createAnalyze(initialAnalyze);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const editAnalyzeApi = createAsyncThunk(
  "/analysis/editAnalyzeApi",
  async (initialPost: TPost) => {
    try {
      const response = await editAnalyze(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteAnalyzeApi = createAsyncThunk(
  "/analysis/deleteAnalyzeApi",
  async (initialPost: TPost) => {
    try {
      const response = await deleteAnalyze(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleLikeAnalyzeApi = createAsyncThunk(
  "/analysis/toggleLikeAnalyzeApi",
  async (initialPost: TPost) => {
    try {
      const response = await toggleLikeAnalyze(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const toggleDisikeAnalyzeApi = createAsyncThunk(
  "/analysis/toggleDisikeAnalyzeApi",
  async (initialPost: TPost) => {
    try {
      const response = await toggleDislikeAnalyze(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const incrementAnalyzeViewsApi = createAsyncThunk(
  "/analysis/incrementAnalyzeViewsApi",
  async (initialPost: TPost) => {
    try {
      const response = await incrementAnalyzeViews(initialPost);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const initialState: IAnalyzeState & EntityState<IPost, string> =
  analyzeAdapter.getInitialState({
    status: "idle",
    error: "",
    analyzeId: "",
  });

const analyzeSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalyzeId: (state, action) => {
      state.analyzeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysis.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.status = "success";
        analyzeAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAnalysis.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An Error Occurred";
      })
      .addCase(createAnalyzeApi.fulfilled, (state, action) => {
        analyzeAdapter.setOne(state, action.payload.analyze);
      })
      .addCase(editAnalyzeApi.fulfilled, (state, action) => {
        analyzeAdapter.setOne(state, action.payload.analyze);
      })
      .addCase(deleteAnalyzeApi.fulfilled, (state, action) => {
        analyzeAdapter.removeOne(state, action.payload._id);
      })
      .addCase(toggleLikeAnalyzeApi.fulfilled, (state, action) => {
        analyzeAdapter.setOne(state, action.payload.analyze);
      })
      .addCase(toggleDisikeAnalyzeApi.fulfilled, (state, action) => {
        analyzeAdapter.setOne(state, action.payload.analyze);
      })
      .addCase(incrementAnalyzeViewsApi.fulfilled, (state, action) => {
        analyzeAdapter.setOne(state, action.payload.analyze);
      });
  },
});

export const { setAnalyzeId } = analyzeSlice.actions;

export const { selectAll: displayanalysis, selectById: displayAnalyze } =
  analyzeAdapter.getSelectors((state: RootState) => state.analysis);

export default analyzeSlice.reducer;
