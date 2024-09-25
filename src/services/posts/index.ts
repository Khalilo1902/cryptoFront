import { SERVER_URL, axiosJWT } from "..";
import { TPost } from "../../interface";

//GET ALL COINS
export const getAllPosts = () => {
  const url = `${SERVER_URL}/posts`;
  return axiosJWT.get(url);
};

//Create a Post
export const createPost = (post: TPost) => {
  const url = `${SERVER_URL}/posts/create`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("user", post.user || "");
  return axiosJWT.post(url, formData);
};

//Edit a Post
export const editPost = (post: TPost) => {
  const url = `${SERVER_URL}/posts/edit`;
  const formData = new FormData();
  formData.append("title", post.title || "");
  formData.append("description", post.description || "");
  formData.append("image", post.image || "");
  formData.append("postIdPublic", post.postIdPublic || "");
  formData.append("targetUser", post.targetUser || "");
  return axiosJWT.put(url, formData);
};

//Delete a Post
export const deletePost = (post: TPost) => {
  const url = `${SERVER_URL}/posts/delete`;
  const formData = {
    targetUser: post.targetUser,
    postIdPublic: post.postIdPublic,
  };

  return axiosJWT.delete(url, { data: formData });
};

export const toggleLikePost = (post: TPost) => {
  const url = `${SERVER_URL}/posts/likes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

export const toggleDislikePost = (post: TPost) => {
  const url = `${SERVER_URL}/posts/dislikes`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};

//incrementNewsViews
export const incrementPostsViews = (post: TPost) => {
  const url = `${SERVER_URL}/posts/incrementViews`;
  const formData = {
    postIdPublic: post.postIdPublic,
  };
  return axiosJWT.put(url, formData);
};
