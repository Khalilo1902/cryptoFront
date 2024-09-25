import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IJournal, TJournal } from "../../interface";
import {
  journalPositionClose,
  createJournal,
  editJournalOpen,
  getAllJournals,
  deleteJournalPosition,
} from "../../services/journal";
import { RootState } from "../store";

interface IJournalState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  journalId: string;
  getDate: string;
  isJournalPositionOpenEditActive: boolean;
  isDeleteJournalPositionActive: boolean;
  isClosePositionJournalActive: boolean;

  isShowPositionHeaderActive: boolean;
  navPositionType: "left" | "right" | "fake";
  positionsType: "open" | "profit" | "loss" | "all" | "fake";
  positionsCalenderType: "open" | "profit" | "loss" | "fake";
}

const journalAdapter = createEntityAdapter<IJournal, string>({
  selectId: (journal) => journal._id,
});

export const fetchJournal = createAsyncThunk(
  "/journals/fetchJournal",
  async () => {
    try {
      const response = await getAllJournals();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const createJournalApi = createAsyncThunk(
  "/journals/createJournalApi",
  async (initialJournal: TJournal) => {
    try {
      const response = await createJournal(initialJournal);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const editJournalOpenApi = createAsyncThunk(
  "/journals/editJournalOpenApi",
  async (initialJournal: TJournal) => {
    try {
      const response = await editJournalOpen(initialJournal);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const journalPositionCloseApi = createAsyncThunk(
  "/journals/journalPositionCloseApi",
  async (initialJournal: TJournal) => {
    try {
      const response = await journalPositionClose(initialJournal);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteJournalPositionApi = createAsyncThunk(
  "/journals/deleteJournalPositionApi",
  async (initialJournal: TJournal) => {
    try {
      const response = await deleteJournalPosition(initialJournal);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const initialState: IJournalState & EntityState<IJournal, string> =
  journalAdapter.getInitialState({
    status: "idle",
    error: "",
    journalId: "",
    getDate: "",
    isJournalPositionOpenEditActive: false,
    isDeleteJournalPositionActive: false,
    isClosePositionJournalActive: false,
    positionsType: "fake",
    isShowPositionHeaderActive: false,
    navPositionType: "fake",
    positionsCalenderType: "fake",
  });

const journalSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {
    setJournalId: (state, action) => {
      state.journalId = action.payload;
    },
    setDate: (state, action) => {
      state.getDate = action.payload;
    },
    setIsJournalPositionOpenEditActive: (state, action) => {
      state.isJournalPositionOpenEditActive = action.payload;
    },
    setIsDeleteJournalPositionActive: (state, action) => {
      state.isDeleteJournalPositionActive = action.payload;
    },
    setIsClosePositionJournalActive: (state, action) => {
      state.isClosePositionJournalActive = action.payload;
    },
    setPositionsType: (state, action) => {
      state.positionsType = action.payload;
    },
    setIsShowPositionHeaderActive: (state, action) => {
      state.isShowPositionHeaderActive = action.payload;
    },
    setNavPositionType: (state, action) => {
      state.navPositionType = action.payload;
    },
    setPositionsCalenderType: (state, action) => {
      state.positionsCalenderType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.status = "success";
        journalAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An Error Occurred";
      })
      .addCase(createJournalApi.fulfilled, (state, action) => {
        journalAdapter.setOne(state, action.payload.journal);
      })
      .addCase(editJournalOpenApi.fulfilled, (state, action) => {
        journalAdapter.updateOne(state, action.payload._id);
        journalAdapter.setOne(state, action.payload.journal);
      })
      .addCase(journalPositionCloseApi.fulfilled, (state, action) => {
        journalAdapter.updateOne(state, action.payload._id);
        journalAdapter.setOne(state, action.payload.journal);
      })
      .addCase(deleteJournalPositionApi.fulfilled, (state, action) => {
        journalAdapter.removeOne(state, action.payload._id);
      });
  },
});

export const { selectAll: displayJournals, selectById: displayJournal } =
  journalAdapter.getSelectors((state: RootState) => state.journals);

export const {
  setJournalId,
  setDate,
  setIsJournalPositionOpenEditActive,
  setIsDeleteJournalPositionActive,
  setIsClosePositionJournalActive,
  setPositionsType,
  setIsShowPositionHeaderActive,
  setNavPositionType,
  setPositionsCalenderType,
} = journalSlice.actions;

export default journalSlice.reducer;
