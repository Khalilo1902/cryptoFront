import axios from "axios";
import { TUser } from "../../interface";
import { SERVER_URL, axiosJWT } from "..";

//REGISTER
export const registerUser = (user: TUser) => {
  const url = `${SERVER_URL}/register`;
  return axios.post(url, user);
};

//LOGIN
export const loginUser = (user: TUser) => {
  const url = `${SERVER_URL}/login`;
  return axios.post(url, user);
};

//LOGOUT
export const logoutUser = () => {
  const url = `${SERVER_URL}/logout`;
  return axios.delete(url);
};

//SEND EMAIL TO USER
export const verifyUserEmail = () => {
  const url = `${SERVER_URL}/generate-verify-email-token`;
  return axiosJWT.post(url);
};

//VERIFY ACCOUNT
export const accountVerification = (user: TUser) => {
  const url = `${SERVER_URL}/verify-account`;
const formData={
  verificationCode:user.verificationCode
}
  return axiosJWT.put(url, formData);
};

//NEW TOKEN
export const refreshToken = () => {
  const url = `${SERVER_URL}/token`;
  return axios.get(url);
};

//Check to
export const checkToken = () => {
  const url = `${SERVER_URL}/check-token`;
  return axios.get(url);
};

//GET LIST OF ALL USERS
export const getAllUsers = () => {
  const url = `${SERVER_URL}/users`;
  return axios.get(url);
};

//Change Profile Photo
export const profilePhotoUpload = (data: File) => {
  const url = `${SERVER_URL}/users/profile_photo_upload`;
  const formData = new FormData();
  formData.append("image", data);
  return axiosJWT.put(url, formData);
};

//Change Profile User(firstName,lastName,gender and bio)
export const editProfileUser = (user: TUser) => {
  const url = `${SERVER_URL}/users/edit_profile_info`;
  return axiosJWT.put(url, user);
};

//Reset Password wenn User is loggin
export const resetPassword = (user: TUser) => {
  const url = `${SERVER_URL}/users/change_password`;
  return axiosJWT.put(url, user);
};

//Follow Users
export const followUser = (targetUserId: TUser) => {
  const url = `${SERVER_URL}/users/follow`;
  return axiosJWT.post(url, targetUserId);
};

//UnFollow Users
export const unFollowUser = (targetUserId: TUser) => {
  const url = `${SERVER_URL}/users/unfollow`;
  return axiosJWT.post(url, targetUserId);
};

//Delete Account
export const deleteAccount = (targetUserId: string) => {
  const url = `${SERVER_URL}/delete-account/${targetUserId}`;
  return axiosJWT.delete(url);
};

//UnFollow Users
export const examScoreRegistration = (user: TUser) => {
  const url = `${SERVER_URL}/users/examScoreRegistration`;
  const formData = {
    correctAnswers: user.correctAnswers,
    incorrectAnswers: user.incorrectAnswers,
    totalScore: user.totalScore,
    canAnalyze: user.canAnalyze,
  };
  return axiosJWT.put(url, formData);
};

//Start Forget Password
//Verify Email 
export const confirmEmail = (user: TUser) => {
  const url = `${SERVER_URL}/users/confirmEmail`;
  const formData = {
    email:user.email
  };
  return axios.post(url, formData);
};

export const confirmVerificationCode = (user: TUser) => {
  const url = `${SERVER_URL}/users/confirmVerificationCode`;
  const formData = {
    email:user.email,
    verificationCode:user.verificationCode
  };
  return axios.post(url, formData);
};

export const changePasswordWithotLogin = (user: TUser) => {
  const url = `${SERVER_URL}/users/changePasswordWithotLogin`;
  const formData = {
    email:user.email,
    newPassword:user.newPassword,
    confirmPassword:user.confirmPassword
  };
  return axios.put(url, formData);
};

//End Forget Password


// paypal 
export const paymentJournl = (user: TUser) => {
  const url = `${SERVER_URL}/users/paymentJournl`;
  const formData = {
    planJournal:user.planJournal,
    priceJournal:user.priceJournal,
  };
  return axiosJWT.put(url, formData);
};

// checkAndUpdateExpDateJournal 
export const checkAndUpdateExpDateJournal = () => {
  const url = `${SERVER_URL}/users/checkAndUpdateExpDateJournal`;
  return axiosJWT.put(url);
};

