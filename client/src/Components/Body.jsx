import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Message from "./message";

import DashBoard from "./dashboard";
import {useAuth} from "../Context/authContext";
function Body({}) {
 
  const {isLoggedIn} = useAuth()
  var content;
const navigate = useNavigate()
  const { name } = useParams();
const [loading, setLoading] = useState()
  function changeContent() {
    if (name === "login") {
      return (content = <Login />);
    } else if (name === "signup") {
      return (content = <SignUp />);
    }  else if (name === "dashboard") {
      return content = (<DashBoard firstName={"Kevin"}/>)
    }
    if (!name) {
      return (content = <Message />);
    }
  }
  changeContent();

  return <main id="main" className="alignCenter flexColumn">{content}</main>;
}

export default Body;
