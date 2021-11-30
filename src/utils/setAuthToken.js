import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    sessionStorage.setItem("token", token);
  }
};

export default setAuthToken;
