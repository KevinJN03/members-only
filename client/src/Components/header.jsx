import axios from "axios";
import { useEffect, useState } from "react";

import { useAuth } from "../Context/authContext";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  //const refresh = () => window.location.reload(true)
  const [member, setMember] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [user, setUser] = useState();
  const [login, setlogin] = useState(isLoggedIn);
  //setlogin(isLoggedIn)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get("/user", {
        headers: {
          Authorization: token,
        },
      }).then((res )=> {
        console.log("user at header")
          setUser(res.data.user)
      });
    }
  }, []);

  useEffect(() => {
    memberStatus();
    setlogin(isLoggedIn);
  });
  const logout = (e) => {
    e.preventDefault();
    axios.get("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
 
   
    setIsLoggedIn(false);
    navigate("/");
  };
  function memberStatus() {
    if (user && user.access == true) {
      setMember("Member");
    } else {
      setMember("Not Member");
    }
  }

  const signup_LoginBtn = () => {
    return (
      <>
        <Link to="/signup">Signup</Link>
        <br></br>
        <Link to="/login">Login</Link>
      </>
    );
  };

  const account_Dropdown = () => {
    return (
      <>
        {/* <section id="dropdown-btn"> */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-header">Logged in as: </li>
            <li className="dropdown-header bolder">
              {user ? user.first_name : ""}{" "}
            </li>
            <li className="dropdown-header">
              {user ? user.email : ""}{" "}
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="dropdown-header">Membership Status</li>
            <li className="dropdown-header bolder">{member}</li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="/dashboard">DashBoard</Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
        {/* </section> */}
      </>
    );
  };

  return (
    <header id="header" className="flexrow alignCenter border-header-footer">
      <div id="logo">
        <Link to="/">
          <h1>
            Message<span>Club</span>
          </h1>
        </Link>
      </div>

      <section id="header-btns" className="flexrow">
        {login ? account_Dropdown() : signup_LoginBtn()}
      </section>
    </header>
  );
}

export default Header;
