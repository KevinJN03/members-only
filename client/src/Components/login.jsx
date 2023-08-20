import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Password from "./password";
import axios from "axios";
import "../App.css";
import { useAuth } from "../Context/authContext";
import MoonLoader from "react-spinners/MoonLoader";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { setAuthUser, setIsLoggedIn } = useAuth();

  const logIn = (userData) => {
    //e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authUser", JSON.stringify(userData));
    setIsLoggedIn(true), setAuthUser(userData);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      setLoading(true);
    };
  }, []);

  const postData = () => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        

        if (res.status == 200) {
          logIn(res.data.user);
          navigate("/dashboard");
        }
      
      })
      .catch((err) => console.log("error: ", err));
  };
  return (
    <>
      <section id="login" className="flexColumn alignCenter ">
        {/* <h2>Login</h2>
      <hr></hr> */}
        {loading ? (
          <MoonLoader
            color={"#6b01b7"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          // <section id="login" className="flexColumn alignCenter ">
          //   <h2>Login</h2>
          //   <hr></hr>
          <>
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
          </>
        )}
      </section>
    </>
  );
}

export default Login;
