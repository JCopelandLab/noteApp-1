import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAll = () => {
  try {
    return axios.get(baseUrl).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.log(`service error: GETALL; ${error}`);
  }
};

const create = (newObject) => {
  console.log("note services; create is prompted");
  axios.post(baseUrl, newObject).then((response) => {
    console.log("Obj created; ", response.data);
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  axios.delete(`${baseUrl}/id`, (req, res) => {
    return;
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
