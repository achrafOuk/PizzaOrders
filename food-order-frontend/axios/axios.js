import axios from "axios";
import { routes } from "../routes";
function getToken() {
  let loginToken = localStorage.getItem("persist:root");
  if (loginToken == null || JSON.parse(loginToken).login == null) {
    return null;
  }
  loginToken = JSON.parse(loginToken).login;
  return JSON.parse(loginToken)?.token;
}

// get jwt token from local storage
let user_token = getToken();
let api;
if (user_token == null) {
  api = axios.create({ baseURL: routes.BASE_URL });
} else {
  api = axios.create({
    baseURL: routes.BASE_URL,
    headers: { Authorization: `Bearer ${user_token}` },
  });
}
export default api;
