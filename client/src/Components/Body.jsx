import { useParams, useNavigate } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Message from "./message";
import DashBoard from "./dashboard";
function Body() {
  var content;
  const navigate = useNavigate();
  const { name } = useParams();

  function changeContent() {
    if (name === "login") {
      return (content = <Login />);
    } else if (name === "signup") {
      return (content = <SignUp />);
    } else if (name === "dashboard") {
      return (content = <DashBoard firstName={"Kevin"} />);
    }
    if (!name) {
      return (content = <Message />);
    } else {
      navigate("/");
    }
  }
  changeContent();

  return (
    <main id="main" className="alignCenter flexColumn">
      {content}
    </main>
  );
}

export default Body;
