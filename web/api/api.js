import http from "../plugins/http";

let restGetAll = async url => {
  await http.get(`rest/${url}`);
};

export { restGetAll };
