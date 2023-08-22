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
  const [ user, setUser ] = useState();

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
        setUser(res.data.user)

          //  localStorage.setItem("user", JSON.stringify(res.data.user))
        })
        .catch((err) => {
          console.log("err", err)
          navigate("/login");
        });

      setLoading(false);
    }, 2000);

    return () => {
      setLoading(true);
    };
  }, []);
  const postData = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "/message/create",
        {
          text,
          title,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
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
    const token = localStorage.getItem("token");
    axios
      .post(
        "/access",
        {
          access,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setUser({ ...user, access: true });
        }
      });
  };

  function getDashBoard() {
    return (
      <>
        <h2>
          Hi,{" "}
          {user
            ? user.first_name[0].toUpperCase() +
              user.first_name.substring(1, user.first_name.length)
            : ""}
        </h2>
        {user && user.access ? (
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

// upadte the authuserwhen the usergain access
