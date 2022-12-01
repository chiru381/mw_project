import axios from "axios";

const BASE_URL = "http://localhost:4313/api";

const service = {
  getUsers: () => axios.get(BASE_URL + "/get-users"),

  createUser: (data) => axios.post(BASE_URL + "/user", data),

  updateUser: (data) => axios.put(BASE_URL + "/update-user", data),

  deleteUser: (id) => axios.delete(BASE_URL + `/deleteUser/${id}`),
};

export default service;
