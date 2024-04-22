import axios from "axios";

const API_URL = "/api/user";

const get = async () => {
  const response = await axios.get("https://support-desk-7hlh.onrender.com");
  console.log(response);
};

const login = async (formData) => {
  const response = await axios.post(API_URL + "/login", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const signup = async (formData) => {
  const response = await axios.post(API_URL + "/register", formData);
  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const authService = {
  get,
  login,
  signup,
};

export default authService;
