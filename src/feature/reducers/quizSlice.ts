import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IQuiz } from "../../interface";
import { getRandomQuestions } from "../../services/quiz";
import { RootState } from "../store";

interface IQuizState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  coinId: string;
}

const quizAdapter = createEntityAdapter<IQuiz, string>({
  selectId: (quiz) => quiz._id,
});

export const fetchRandomQuiz = createAsyncThunk(
  "/quiz/fetchRandomQuiz",
  async () => {
    try {
      const response = await getRandomQuestions();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const initialState: IQuizState & EntityState<IQuiz, string> =
  quizAdapter.getInitialState({
    status: "idle",
    error: "",
    coinId: "",
  });

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomQuiz.fulfilled, (state, action) => {
        state.status = "success";
        quizAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchRandomQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An Error Occurred";
      });
  },
});

export const { selectAll: displayQuestions, selectById: displayQuestion } =
  quizAdapter.getSelectors((state: RootState) => state.quiz);

export default quizSlice.reducer;
