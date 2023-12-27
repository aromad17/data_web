import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.36.0.92:9999/analysis ",
});

export default instance;
