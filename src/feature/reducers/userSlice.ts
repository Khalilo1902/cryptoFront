import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IUser, IUserInfo, TUser } from "../../interface";

import {
  accountVerification,
  profilePhotoUpload,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  verifyUserEmail,
  checkToken,
  editProfileUser,
  resetPassword,
  followUser,
  unFollowUser,
  deleteAccount,
  examScoreRegistration,
  confirmEmail,
  confirmVerificationCode,
  changePasswordWithotLogin,
  paymentJournl,
  checkAndUpdateExpDateJournal,
} from "../../services/users";
import { RootState } from "../store";

interface IUserState {
  isLoginFormOpen: boolean;
  isAccountVerified: boolean;
  userInfo: IUserInfo;
  token: string;
  file: File | null;
  userId: string;
  isVerificationCodeSent: boolean;
}

const userAdapter = createEntityAdapter<IUser, string>({
  selectId: (user) => user._id || "",
});

//checkUserIsLogin
export const checkTokenApi = createAsyncThunk(
  "/users/checkTokenApi",
  async () => {
    try {
      const response = await checkToken();
      localStorage.setItem("userId", response.data.user._id);
      return response.data;
    } catch (error: any) {
      // localStorage.clear();
      throw error.response.data.message;
    }
  }
);

//Register User
export const registerUserApi = createAsyncThunk(
  "/users/registerUserApi",
  async (initialUser: TUser) => {
    try {
      const response = await registerUser(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Login User
export const loginUserApi = createAsyncThunk(
  "/users/loginUserApi",
  async (initialUser: TUser) => {
    try {
      const response = await loginUser(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Logout User
export const logoutUserApi = createAsyncThunk(
  "/users/logoutUserApi",
  async () => {
    try {
      const response = await logoutUser();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Delete Account
export const deleteAccountApi = createAsyncThunk(
  "/users/deleteAccountApi",
  async (initialUserId: string) => {
    try {
      const response = await deleteAccount(initialUserId);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Verify Email
export const verifyUserEmailApi = createAsyncThunk(
  "/users/verifyUserEmailApi",
  async () => {
    try {
      const response = await verifyUserEmail();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Account Verification
export const accountVerificationApi = createAsyncThunk(
  "/users/accountVerificationApi",
  async (initialUser: TUser) => {
    try {
      const response = await accountVerification(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Get Users
export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  try {
    const response = await getAllUsers();
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

//Profile Photo Upload
export const profilePhotoUploadApi = createAsyncThunk(
  "/users/profilePhotoUploadApi",

  async (data: File) => {
    try {
      const response = await profilePhotoUpload(data);
      console.log("Profile Photo UserSlice: ", response.data.user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Edit Profile User(firstName,lastName,gender,bio)
export const editProfileUserApi = createAsyncThunk(
  "/users/editProfileUserApi",

  async (initialUser: TUser) => {
    try {
      const response = await editProfileUser(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Reset Password Wenn User is Login
export const resetPasswordApi = createAsyncThunk(
  "/users/resetPasswordApi",

  async (initialUser: TUser) => {
    try {
      const response = await resetPassword(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//Follow
export const followUserApi = createAsyncThunk(
  "/users/followUserApi",

  async (initialTargetUserId: TUser) => {
    try {
      const response = await followUser(initialTargetUserId);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//UnFollow
export const unFollowUserApi = createAsyncThunk(
  "/users/unFollowUserApi",

  async (initialTargetUserId: TUser) => {
    try {
      const response = await unFollowUser(initialTargetUserId);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//examScoreRegistration
export const examScoreRegistrationApi = createAsyncThunk(
  "/users/examScoreRegistrationApi",

  async (user: TUser) => {
    try {
      const response = await examScoreRegistration(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

//confirmEmailApi
export const confirmEmailApi = createAsyncThunk(
  "/users/confirmEmailApi",

  async (user: TUser) => {
    try {
      const response = await confirmEmail(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const confirmVerificationCodeApi = createAsyncThunk(
  "/users/confirmVerificationCodeApi",

  async (user: TUser) => {
    try {
      const response = await confirmVerificationCode(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const changePasswordWithotLoginApi = createAsyncThunk(
  "/users/changePasswordWithotLoginApi",

  async (user: TUser) => {
    try {
      const response = await changePasswordWithotLogin(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const paymentJournlApi = createAsyncThunk(
  "/users/paymentJournlApi",

  async (user: TUser) => {
    try {
      const response = await paymentJournl(user);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const checkAndUpdateExpDateJournalApi = createAsyncThunk(
  "/users/checkAndUpdateExpDateJournalApi",

  async () => {
    try {
      const response = await checkAndUpdateExpDateJournal();
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);
const initialState: IUserState & EntityState<IUser, string> =
  userAdapter.getInitialState({
    isLoginFormOpen: true,
    isAccountVerified: false,
    file: null,
    token: "",
    userInfo: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      photo: "",
      isAdmin: false,
      bio: "",
      iat: 0,
      exp: 0,
    },
    userId: "",
    isVerificationCodeSent: false,
  });

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoginFormOpen: (state, action) => {
      state.isLoginFormOpen = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setIsVerificationCodeSent: (state, action) => {
      state.isVerificationCodeSent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserApi.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload.user);
      })

      .addCase(loginUserApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user);
      })

      .addCase(profilePhotoUploadApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user);
      })
      .addCase(editProfileUserApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user);
      })
      .addCase(resetPasswordApi.fulfilled, (state, action) => {
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        userAdapter.upsertMany(state, action.payload);
      })

      .addCase(checkTokenApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user);
      })
      .addCase(followUserApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user[0]);
        userAdapter.setOne(state, action.payload.user[1]);
      })
      .addCase(unFollowUserApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload.user[0]);
        userAdapter.setOne(state, action.payload.user[1]);
      })
      .addCase(examScoreRegistrationApi.fulfilled, (state, action) => {
        userAdapter.updateOne(state, action.payload._id);
        userAdapter.setOne(state, action.payload.user);
      })

      .addCase(accountVerificationApi.fulfilled, (state, action) => {
        userAdapter.updateOne(state, action.payload._id);
        userAdapter.setOne(state, action.payload.user);
      })

      .addCase(paymentJournlApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload._id);
        userAdapter.setOne(state, action.payload.user);
      })

      .addCase(checkAndUpdateExpDateJournalApi.fulfilled, (state, action) => {
        userAdapter.setOne(state, action.payload._id);
        userAdapter.setOne(state, action.payload.user);
      })

      //Start Forget Password
      .addCase(confirmEmailApi.fulfilled, userAdapter.setOne)
      .addCase(confirmVerificationCodeApi.fulfilled, userAdapter.setOne)
      .addCase(changePasswordWithotLoginApi.fulfilled, userAdapter.updateOne)
      //End Forget Password

      .addCase(deleteAccountApi.fulfilled, userAdapter.removeOne)

      .addCase(verifyUserEmailApi.fulfilled, userAdapter.addOne);
  },
});

export const { selectAll: displayUsers, selectById: displayUser } =
  userAdapter.getSelectors((state: RootState) => state.users);

export const {
  setIsLoginFormOpen,
  setUserInfo,
  setToken,
  setFile,
  setUserId,
  setIsVerificationCodeSent,
} = userSlice.actions;

export default userSlice.reducer;
