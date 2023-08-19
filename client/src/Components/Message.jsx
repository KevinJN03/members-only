import MessageItem from "./MessageItem";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import MoonLoader from "react-spinners/MoonLoader";
import { useAuth } from "../Context/authContext";
import "../App.css";
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
function Message() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, authUser } = useAuth();
  const [login, setLogin] = useState(isLoggedIn);
  const fetchMessages = () => {
    axios
      .get("/message")
      .then((res) => {
        setMessages(res.data);
      })
      .then(
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      );
  };
  useEffect(() => {
    console.log("message component did update");
    setLoading(true);

    fetchMessages();

    return () => {
      setMessages([]);
    };
  }, [isLoggedIn, authUser]);
  useEffect(() => {
    fetchMessages();

    return () => {
      setMessages([]);
    };
  }, []);

  function getMessages() {
    return (
      <>
        {messages ? (
          messages.map((msg) => {
            return (
              <MessageItem
                key={msg._id}
                title={msg.title}
                text={msg.text}
                author={
                  authUser && authUser.user.access
                    ? msg.author.first_name
                    : "anonymous"
                }
                note={
                  authUser && authUser.user.access ? (
                    ""
                  ) : (
                    <span>
                      <strong>Note:</strong> Become a member to know who wrote
                      this message and when.{" "}
                    </span>
                  )
                }
                date={authUser && authUser.user.access ? msg.beautifyDate : ""}
                hr={authUser && authUser.user.access ? "" : <hr></hr>}
              />
            );
          })
        ) : (
          <h2>No messages</h2>
        )}
      </>
    );
  }
  return (
    <section id="message-section" className="alignCenter flexColumn">
      <h2 id="title">Messages</h2>

      {loading ? (
        <MoonLoader
          color={"#6b01b7"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        getMessages()
      )}
    </section>
  );
}

//need to update message when

export default Message;
