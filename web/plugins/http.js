import axios from "axios";

const http = axios.create({
  baseURL: process.env.BASE_URL || "http://admins.blog5.net.cn/api",
  withCredentials: true
});
//顺序很重要必须要先在请求头中加上token
http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default http;
