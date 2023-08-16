import React from "react";
import { useEffect, useState, useRef} from "react";
import{ useNavigate} from "react-router-dom"
import Password from "./password";
import axios from "axios";
// axios.defaults.headers.post["Content-Type"] = "application/json";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitButton = useRef();
const navigate = useNavigate()
  //console.log(submitButton.current)

  const postData = () => {
    
      axios
        .post("/login", {
          email,
          password,
        })
        .then((res) => {
          console.log("res: ", res.status);

          if(res.status == 200){
              navigate("/")
          }
          
        })
        .catch((err) => console.log("error: ", err));
   
  };
  return (
    <>
      <h2>Login</h2>
      <hr></hr>
      <form onSubmit={(e) => e.preventDefault()}>
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
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
