import http from "../plugins/http";

let restGetAll = async (url, query) => {
  return await http.get(`rest/${url}`, { params: query });
};

export { restGetAll };
