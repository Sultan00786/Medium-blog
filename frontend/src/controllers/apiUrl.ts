const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authApi = {
   CREATE_NEW_USER: BASE_URL + "/user/signup",
   LOGIN_USER: BASE_URL + "/user/signin",
};

export const blogApi = {
   GET_ALL_BLOGS: BASE_URL + "/blog/bulk",
   GET_BLOG: BASE_URL + "/blog/getBlog",
   UPDATE_BLOG: BASE_URL + "/blog/updateBlog",
   CREATE_BLOG: BASE_URL + "/blog/createBlog",
};
