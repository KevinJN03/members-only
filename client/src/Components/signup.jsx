import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Password from "./password";
const BaseUrl = import.meta.env.VITE_BASE_URL 
Axios.defaults.baseURL = BaseUrl

function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
        <Password/>

        <button type="submit" onClick={postData}>
          Submit
        </button>
      </form>
    </>
  );
}
export default SignUp;
