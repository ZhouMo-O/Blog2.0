import http from "../plugins/http";

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

export { restGetAll, restGetOne, restUpdata, restPostData, restDeleteOne };
