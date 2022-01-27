import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
  logIn(username, password) {
    return axios
      .post(API_URL + "logIn", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
          sessionStorage.setItem("isLoggedIn", true);
        }

        return response.data;
      });
  }

  logOut() {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("isLoggedIn", false)
  }

  signUp(name, username, email, password) {
    return axios.post(API_URL + "signUp", {
      name,
      username,
      email,
      password
    })
    .then(() => {
      console.log(username)
    })
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));;
  }

  loggedIn() {
    if (sessionStorage.getItem("user")) return true;
    return false;
  }
}

export default new AuthService();