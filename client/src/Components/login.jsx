import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Password from "./password";
import axios from "axios";
import "../App.css";
import { useAuth } from "../Context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const logIn = (userData) => {
    //e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authUser", JSON.stringify(userData));
    setIsLoggedIn(true), setAuthUser(userData);
;
  };
  let route = useParams();

  const postData = () => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("res: ", res.status);

        if (res.status == 200) {
          logIn(res.data);
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log("error: ", err));
  };
  return (
    <section id="login" className="flexColumn alignCenter ">
      <h2>Login</h2>
      <hr></hr>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flexColumn alignCenter"
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          // autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Password password={password} setPassword={setPassword} />
        <button type="submit" onClick={postData}>
          Log In
        </button>
      </form>
    </section>
  );
}

export default Login;
