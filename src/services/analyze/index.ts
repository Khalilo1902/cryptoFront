import { SERVER_URL, axiosJWT } from "..";
import { TPost } from "../../interface";

//GET ALL Analysis
export const getAllAnalysis = () => {
  const url = `${SERVER_URL}/analysis`;
  return axiosJWT.get(url);
};

//Create a Analyze
export const createAnalyze = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/create`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("user", post.user || "");
  return axiosJWT.post(url, formData);
};

//Edit a Analyze
export const editAnalyze = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/edit`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("postIdPublic", post.postIdPublic || "");
  formData.append("targetUser", post.targetUser || "");
  return axiosJWT.put(url, formData);
};

//Delete a Analyze
export const deleteAnalyze = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/delete`;
  const formData = {
    targetUser: post.targetUser,
    postIdPublic: post.postIdPublic,
  };

  return axiosJWT.delete(url, { data: formData });
};

//like
export const toggleLikeAnalyze = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/likes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

//dislike
export const toggleDislikeAnalyze = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/dislikes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

//incrementNewsViews
export const incrementAnalyzeViews = (post: TPost) => {
  const url = `${SERVER_URL}/analyze/incrementViews`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};
