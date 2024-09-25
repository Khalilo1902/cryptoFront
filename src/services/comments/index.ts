import axios from "axios";

import { SERVER_URL, axiosJWT } from "..";
import { TComment } from "../../interface";

//Get All Comments
export const getComments = () => {
  const url = `${SERVER_URL}/comments`;
  return axios.get(url);
};

//Get postComments
export const getPostComments = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/postComments`;
  const formData = new FormData();
  formData.append("postIdPublic", comment.postIdPublic || "");
  return axiosJWT.post(url, formData);
};

//Create a Comments
export const createComment = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/create`;
  const formData = {
    postIdPublic: comment.postIdPublic,
    post:comment.post,
    user:comment.user?._id,
    comment:comment.comment
  };
  return axiosJWT.post(url, formData);
};

//Edit a Post
export const editComment = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/edit`;
  const formData = {
    targetUser: comment.targetUser,
    commentIdPublic: comment.commentIdPublic,
    comment:comment.comment
  };
  return axiosJWT.put(url, formData);
};

//Delete a Post
export const deleteComment = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/delete`;
  const formData = {
    targetUser: comment.targetUser,
    commentIdPublic: comment.commentIdPublic,
  };

  return axiosJWT.delete(url, { data: formData });
};

export const toggleLikeComment = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/likes`;
  const formData = {
    commentIdPublic: comment.commentIdPublic,
  };
  return axiosJWT.put(url, formData);
};

export const toggleDislikeComment = (comment: TComment) => {
  const url = `${SERVER_URL}/comments/dislikes`;
  const formData = {
    commentIdPublic: comment.commentIdPublic,
  };
  return axiosJWT.put(url, formData);
};
