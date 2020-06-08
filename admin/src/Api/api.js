import http from "../http/http";
//获取验证码
let getCodeSrc = async () => {
  return await http.get("/svgCaptcha");
};
//登录
let userLogin = async (parmas) => {
  return await http.post("/user/login", parmas);
};

//restFullApi  url：路由路径 parimas：路由参数 data：需要传递的数据,query:查询参数
let restgetAll = async (url, query) => {
  return await http.get(`rest/${url}`, { params: query });
};

let restgetOne = async (url, parmas) => {
  return await http.get(`rest/${url}/${parmas}`);
};

let restUpdata = async (url, parmas, data) => {
  return await http.put(`rest/${url}/${parmas}`, data);
};

let restPostData = async (url, data) => {
  return await http.post(`rest/${url}`, data);
};

let restDeleteOne = async (url, parmas) => {
  return await http.delete(`rest/${url}/${parmas}`);
};

//文件处理
let deleteFile = async (parmas) => {
  return await http.delete(`deleteFile/${parmas}`);
};

let uploadFile = async (file) => {
  return await http.post(`upload`, file);
};

export {
  getCodeSrc,
  userLogin,
  restgetOne,
  restUpdata,
  restPostData,
  restgetAll,
  restDeleteOne,
  deleteFile,
  uploadFile,
};
