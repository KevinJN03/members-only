import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { useAuth } from "../Context/authContext";
function DashBoard() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [access, setAccess] = useState("");
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      console.log("token: ", token);
      axios
        .get("/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setAuthUser(res.data.user);

          localStorage.setItem("authUser", JSON.stringify(res.data.user))
        })
        .catch((err) => {
          navigate("/login");
        });

      setLoading(false);
    }, 2000);

    return () => {
      setLoading(true);
    };
  }, []);
  const postData = () => {
    axios
      .post("/message/create", {
        text,
        title,
      })
      .then((res) => {
        if (res.status == 200) {
          navigate("/");
        } else {
          navigate("/login");
        }
      });
  };

  const postAccess = (e) => {
    e.preventDefault();
    axios
      .post("/access", {
        access,
      })
      .then((res) => {
        if (res.status == 200) {
          setAuthUser({ ...authUser, access: true });
          localStorage.setItem("authUser", JSON.stringify(authUser));
        }
      });
  };

  function getDashBoard() {
    return (
      <>
        <h2>
          Hi,{" "}
          {authUser
            ? authUser.first_name[0].toUpperCase() +
              authUser.first_name.substring(1, authUser.first_name.length)
            : ""}
        </h2>
        {authUser && authUser.access == true ? (
          <></>
        ) : (
          <div id="access">
            <button type="submit" onClick={postAccess}>
              Gain Access
            </button>
            <input
              type="text"
              name="access"
              value={access}
              placeholder="Access Code"
              onChange={(e) => setAccess(e.target.value)}
            ></input>
          </div>
        )}

        <div id="create-message">
          <h2>Create Message</h2>
          <form onSubmit={(e) => e.preventDefault()} className="flexColumn">
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              type="text"
              name="text"
              value={text}
              placeholder="Message"
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button onClick={postData}>Submit</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <section id="dashboard" className="alignCenter justifyCenter">
        {/* <h2></h2> */}
        {loading ? (
          <MoonLoader
            color={"#6b01b7"}
            loading={loading}
            // cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          getDashBoard()
        )}
      </section>
    </>
  );
}

export default DashBoard;

// upadte the authauthUserwhen the authUsergain access
