import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  isMenuOpen: boolean;
  isUserPanelOpen: boolean;
  isUserPanelJournalOpen: boolean;
  isDarkMode: boolean;
  isSidebarMenuOpen: boolean;
  isSearchBoxActive: boolean;
  inputValueSearchBox: string;
  isSpinnerActive: boolean;
  isPostComponentActive: boolean;
  isEditComponentActive: boolean;
  isDeleteComponentActive: boolean;
  postIdPublic: string;
  commentIdPublic: string;
  isFollowComponentActive: boolean;
  isFollowersComponentActive: boolean;
  isJournalSideBarActive: boolean;
  isShort: boolean;
  getEmailForgetPassword: string;
  isPaid?: boolean;
  isVerified:boolean;
  isLogin:boolean;
  isProfit:boolean
}

const initialState: IAppState = {
  isMenuOpen: false,
  isUserPanelOpen: false,
  isDarkMode: false,
  isSidebarMenuOpen: false,
  isSearchBoxActive: false,
  inputValueSearchBox: "",
  isUserPanelJournalOpen: false,
  isPostComponentActive: false,
  isEditComponentActive: false,
  isDeleteComponentActive: false,
  isSpinnerActive: false,
  postIdPublic: "",
  commentIdPublic: "",
  isFollowComponentActive: false,
  isFollowersComponentActive: false,
  isJournalSideBarActive: false,
  isShort: false,
  getEmailForgetPassword: "",
  isPaid: false,
  isVerified:false,
  isLogin:false,
  isProfit:false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setIsUserPanelOpen: (state, action) => {
      state.isUserPanelOpen = action.payload;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setIsSidebarMenuOpen: (state, action) => {
      state.isSidebarMenuOpen = action.payload;
    },
    setIsSearchBoxActive: (state, action) => {
      state.isSearchBoxActive = action.payload;
    },
    setInputValueSearchBox: (state, action) => {
      state.inputValueSearchBox = action.payload;
    },
    setIsUserPanelJournalOpen: (state, action) => {
      state.isUserPanelJournalOpen = action.payload;
    },
    setIsPostComponentActive: (state, action) => {
      state.isPostComponentActive = action.payload;
    },
    setIsEditComponentActive: (state, action) => {
      state.isEditComponentActive = action.payload;
    },
    setIsDeleteComponentActive: (state, action) => {
      state.isDeleteComponentActive = action.payload;
    },
    setIsSpinnerActive: (state, action) => {
      state.isSpinnerActive = action.payload;
    },
    setPostIdPublic: (state, action) => {
      state.postIdPublic = action.payload;
    },
    setCommentIdPublic: (state, action) => {
      state.commentIdPublic = action.payload;
    },
    setIsFollowComponentActive: (state, action) => {
      state.isFollowComponentActive = action.payload;
    },
    setIsFollowersComponentActive: (state, action) => {
      state.isFollowersComponentActive = action.payload;
    },
    setIsJournalSideBarActive: (state, action) => {
      state.isJournalSideBarActive = action.payload;
    },
    setIsShort: (state, action) => {
      state.isShort = action.payload;
    },
    setEmailForgetPassword: (state, action) => {
      state.getEmailForgetPassword = action.payload;
    },
    setIsPaid: (state, action) => {
      state.isPaid =action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified =action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin =action.payload;
    },
    setIsProfit:(state, action) => {
      state.isProfit =action.payload;
    },
  },
});

export const {
  setIsMenuOpen,
  setIsUserPanelOpen,
  setIsDarkMode,
  setIsSidebarMenuOpen,
  setIsSearchBoxActive,
  setInputValueSearchBox,
  setIsUserPanelJournalOpen,
  setIsSpinnerActive,
  setIsPostComponentActive,
  setIsEditComponentActive,
  setIsDeleteComponentActive,
  setPostIdPublic,
  setCommentIdPublic,
  setIsFollowComponentActive,
  setIsFollowersComponentActive,
  setIsJournalSideBarActive,
  setIsShort,
  setEmailForgetPassword,
  setIsPaid,
  setIsProfit,
} = appSlice.actions;

export default appSlice.reducer;
