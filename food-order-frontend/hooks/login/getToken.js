export default function getToken() {
  let loginToken = localStorage.getItem("persist:root");
  if (loginToken == null || JSON.parse(loginToken).login == null) {
    return null;
  }
  loginToken = JSON.parse(loginToken).login;
  return JSON.parse(loginToken)?.token;
}
