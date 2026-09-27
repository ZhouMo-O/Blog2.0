import http from "../plugins/http";

//restFullApi
let restGetAll = async (url, query) => {
  return await http.get(`rest/${url}`, { params: query });
};

let restGetOne = async (url, params) => {
  return await http.get(`rest/${url}/${params}`);
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

//计数（阅读量/点赞数/评论数）：读者侧无需登录，只允许字段原子 +/-1
let counter = async (field, id, delta = 1) => {
  return await http.post(`counter/article/${id}`, { field, delta });
};

//点赞
let like = async articleData => {
  return await http.post(`like`, articleData);
};

//是否点赞
let beenLiked = async articleId => {
  return await http.get(`like/beenLiked/${articleId}`);
};

//文章点赞数量
let likeSum = async articleId => {
  return await http.get(`like/likeSum/${articleId}`);
};

//评论
let postComment = async data => {
  return await http.post(`comment`, data);
};

export {
  restGetAll,
  restGetOne,
  restUpdata,
  restPostData,
  restDeleteOne,
  counter,
  like,
  beenLiked,
  likeSum,
  postComment
};
