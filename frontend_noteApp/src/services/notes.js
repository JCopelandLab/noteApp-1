import axios from "axios";
const baseUrl = "http://localhost:3000/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = (newObject) => {
  console.log("Axios: uploading Obj to server");
  axios.post(baseUrl, newObject).then((response) => {
    console.log("added", response.data);
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  add,
  update,
};
