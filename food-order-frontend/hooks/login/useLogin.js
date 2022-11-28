import { routes } from "../../routes";

export default async function useLogin(event, username, password, setMessage) {
  event.preventDefault();
  if (username === "" || password === "") {
    setMessage(
      "you cannot leave the username field or passowrd field is empty"
    );
    return;
  }
  console.log("login endpoint:", routes.LOGIN);
  let user_data = JSON.stringify({
    user: username,
    password: password,
  });
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    name: username,
    password: password,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let user = await fetch("http://localhost:8000/api/login", requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      setMessage("Error occured! try again");
    });
  if (user === undefined) {
    return;
  }
  let data = {
    username: user.username,
    token: user.access_token,
  };
  return data;
}
