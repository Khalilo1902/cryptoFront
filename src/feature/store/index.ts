import { configureStore } from "@reduxjs/toolkit";

import userReducer, {
  checkTokenApi,
  fetchUsers,
  setToken,
} from "../reducers/userSlice";
import appReducer from "../reducers/appSlice";
import postReducer, { fetchPosts } from "../reducers/postSlice";
import analyzeReducer, { fetchAnalysis } from "../reducers/analyzeSlice";
import newsReducer, { fetchNews } from "../reducers/newsSlice";
import coinReducer, { fetchCoins } from "../reducers/coinSlice";
import commentReducer, { fetchComments } from "../reducers/commentSlice";
import quizReducer, { fetchRandomQuiz } from "../reducers/quizSlice";

import { refreshToken } from "../../services/users";
import { axiosJWT } from "../../services";
import journalReducer, { fetchJournal } from "../reducers/journalSlice";

export const store = configureStore({
  reducer: {
    coins: coinReducer,
    users: userReducer,
    app: appReducer,
    posts: postReducer,
    analysis: analyzeReducer,
    news: newsReducer,
    comments: commentReducer,
    quiz: quizReducer,
    journals: journalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const exp = localStorage.getItem("exp");
    if (Number(exp) * 1000 > currentDate.getDate()) {
      const response = await refreshToken();
      config.headers.Authorization = `Bearer ${response.data.refreshToken}`;
      store.dispatch(setToken(response.data.refreshToken));
      // store.dispatch(setUserInfoRefresh(response.data.userInfo_refresh));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

store.dispatch(fetchUsers());
store.dispatch(fetchCoins());
store.dispatch(fetchPosts());
store.dispatch(fetchAnalysis());
store.dispatch(fetchNews());
store.dispatch(checkTokenApi());
store.dispatch(fetchComments());
store.dispatch(fetchRandomQuiz());
store.dispatch(fetchJournal());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
