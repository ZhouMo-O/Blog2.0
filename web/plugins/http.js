import axios from "axios";

const isServer = typeof window === "undefined";

// 服务端直连本机 API（避免绕公网 DNS/TLS），客户端走同源 /api（由 nginx 反代），
// 同源可彻底消除跨域预检，减少每个请求的额外往返。
const baseURL = isServer
  ? process.env.API_BASE_URL_SERVER || "http://127.0.0.1:5555/api"
  : process.env.API_BASE_URL || "/api";

const http = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: !isServer
});
//顺序很重要必须要先在请求头中加上token
http.interceptors.request.use(
  config => {
    // 服务端渲染时不存在 localStorage，必须做保护，否则 SSR 直接抛错
    if (!isServer && typeof localStorage !== "undefined" && localStorage.token) {
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
    const response = err && err.response;
    if (response && response.data && response.data.message) {
      if (response.status === 401 && !isServer) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default http;
