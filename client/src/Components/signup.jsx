import { useEffect, useState, useRef } from "react";
import Axios from "axios";
const BaseUrl = import.meta.env.VITE_BASE_URL 
Axios.defaults.baseURL = BaseUrl

import hide from "../assets/hide.png";
import show from "../assets/visible.png";
function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const visible = useRef();
  const passwordType = useRef();
  const changeVisibility = () => {
    passwordType.current.type === "password" && password.length > 0
      ? (passwordType.current.type = "text") && (visible.current.src = show)
      : (passwordType.current.type = "password") &&
        (visible.current.src = hide);
  };

  const postData = (e) => {
    e.preventDefault();
    Axios.post("/signup", {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
    })
      .then((res) => {
        console.log("Posting Data", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>SignUp form</h2>
      <hr></hr>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <section className="flexrow " id="password-section">
          <input
            ref={passwordType}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <div id="password_image_wrapper" onClick={changeVisibility}>
            <img id="password_image" src={hide} ref={visible} />
          </div>
        </section>

        <button type="submit" onClick={postData}>
          Submit
        </button>
      </form>
    </>
  );
}
export default SignUp;
