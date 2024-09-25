import { SERVER_URL, axiosJWT } from "..";
import { TPost } from "../../interface";

//GET ALL News
export const getAllNews = () => {
  const url = `${SERVER_URL}/news`;
  return axiosJWT.get(url);
};

//Create a News

export const createNews = (post: TPost) => {
  const url = `${SERVER_URL}/news/create`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("user", post.user || "");
  return axiosJWT.post(url, formData);
};

//Edit a News
export const editNews = (post: TPost) => {
  const url = `${SERVER_URL}/news/edit`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("postIdPublic", post.postIdPublic || "");
  formData.append("targetUser", post.targetUser || "");
  return axiosJWT.put(url, formData);
};

//Delete a News
export const deleteNews = (post: TPost) => {
  const url = `${SERVER_URL}/news/delete`;
  const formData = {
    targetUser: post.targetUser,
    postIdPublic: post.postIdPublic,
  };

  return axiosJWT.delete(url, { data: formData });
};

//like
export const toggleLikeNews = (post: TPost) => {
  const url = `${SERVER_URL}/news/likes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

//dislike
export const toggleDislikeNews = (post: TPost) => {
  const url = `${SERVER_URL}/news/dislikes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

//incrementNewsViews
export const incrementNewsViews = (post: TPost) => {
  const url = `${SERVER_URL}/news/incrementViews`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};
