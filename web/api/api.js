import http from "../plugins/http";

let restGetAll = async (url, query) => {
  return await http.get(`rest/${url}`, { params: query });
};

let restGetOne = async (url, params) => {
  return await http.get(`rest/${url}/${params}`);
};

export { restGetAll, restGetOne };
