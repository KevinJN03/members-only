import { useEffect, useState } from "react";
import Axios from "axios";
import Password from "./password";
const BaseUrl = import.meta.env.VITE_BASE_URL;
Axios.defaults.baseURL = BaseUrl;
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      setLoading(true);
    };
  }, []);
  const postData = (e) => {
    e.preventDefault();
    Axios.post("/signup", {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
    })
      .then((res) => {
    
        if (res.status == 201) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id="signup" className="flexColumn alignCenter ">
      {loading ? (
        <MoonLoader
          color={"#6b01b7"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <h2>Sign Up</h2>
          <hr></hr>
          <form
            className="flexColumn alignCenter"
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
              autoComplete="off"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            <Password password={password} setPassword={setPassword} />

            <button type="submit" onClick={postData}>
              Sign Up
            </button>
          </form>
        </>
      )}
    </section>
  );
}
export default SignUp;
