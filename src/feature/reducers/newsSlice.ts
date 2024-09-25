import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IPost, TPost } from "../../interface";
import { RootState } from "../store";
import { createNews, deleteNews, editNews, getAllNews, incrementNewsViews, toggleDislikeNews, toggleLikeNews } from "../../services/news";


  
  interface INewsState {
    status: "idle" | "loading" | "success" | "failed"; 
    error: string | null;
    newsId:string;
  }
  
  const newsAdapter = createEntityAdapter<IPost, string>({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
    selectId: (news) => news._id, 
  });
  
  export const fetchNews = createAsyncThunk(
    "/news/fetchNews",
    async () => {
      try {
        const response = await getAllNews();
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );

  export const createNewsApi = createAsyncThunk(
    "/news/createNewsApi",
    async (initialNews: TPost) => {
      try {
        const response = await createNews(initialNews);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );

  export const editNewsApi = createAsyncThunk(
    "/news/editNewsApi",
    async (initialPost: TPost) => {
      try {
        const response = await editNews(initialPost);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );
  
  export const deleteNewsApi = createAsyncThunk(
    "/news/deleteNewsApi",
    async (initialPost: TPost) => {
      try {
        const response = await deleteNews(initialPost);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );

  export const toggleLikeNewsApi = createAsyncThunk(
    "/news/toggleLikeNewsApi",
    async (initialPost: TPost) => {
      try {
        const response = await toggleLikeNews(initialPost);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );
  
  export const toggleDisikeNewsApi = createAsyncThunk(
    "/news/toggleDisikeNewsApi",
    async (initialPost: TPost) => {
      try {
        const response = await toggleDislikeNews(initialPost);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );

  export const incrementNewsViewsApi = createAsyncThunk(
    "/news/incrementNewsViewsApi",
    async (initialPost: TPost) => {
      try {
        const response = await incrementNewsViews(initialPost);
        return response.data;
      } catch (error: any) {
        throw error.response.data.message;
      }
    }
  );
  
  const initialState: INewsState & EntityState<IPost, string> =
    newsAdapter.getInitialState({
      status: "idle",
      error: "",
      newsId:""
    });
  
  const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
      setNewsId:(state,action)=>{
        state.newsId=action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNews.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
          state.status = "success";
          newsAdapter.upsertMany(state, action.payload);
        })
        .addCase(fetchNews.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "An Error Occurred"; 
        })
        .addCase(createNewsApi.fulfilled, (state, action) => {
            newsAdapter.setOne(state, action.payload.news);
          })
          .addCase(editNewsApi.fulfilled, (state, action) => {
            newsAdapter.setOne(state, action.payload.news);
          })
          .addCase(deleteNewsApi.fulfilled, (state, action) => {
            newsAdapter.removeOne(state, action.payload._id);
          })
          .addCase(toggleLikeNewsApi.fulfilled, (state, action) => {
            newsAdapter.setOne(state, action.payload.news);
          })
          .addCase(toggleDisikeNewsApi.fulfilled, (state, action) => {
            newsAdapter.setOne(state, action.payload.news);
          })
          .addCase(incrementNewsViewsApi.fulfilled, (state, action) => {
            newsAdapter.setOne(state, action.payload.news);
          })
    },
  });
  
  
  export const {setNewsId} = newsSlice.actions
  
  export const { selectAll: displayNews, selectById: displaySingleNews } =
    newsAdapter.getSelectors((state: RootState) => state.news);
  
 
  
  
  export default newsSlice.reducer;
  