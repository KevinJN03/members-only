import MessageItem from "./MessageItem";
import { useState, useEffect } from "react";
import axios from "axios";

import MoonLoader from "react-spinners/MoonLoader";
import { useAuth } from "../Context/authContext";
import "../App.css";
import Pagination from "./Pagination";

function Message() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
const [user, setUser] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState();
  
  // COmponent Did Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/user", {
      headers: {
        Authorization: token
      }
    }).then((res) => {
      setUser(res.data.user)
    })



    fetchMessages(1, setCount);

  }, []);

  const fetchMessages = (num, count) => {
    try {
      axios
        .get(`/message/query?page=${num}&limit=10`)
        .then((res) => {
          setMessages(res.data.message);

          if (count) {
            console.log("fetching for count")
            count(res.data.count);
          }
        })
        .then(
          setTimeout(() => {
            setLoading(false);
          }, 1500)
        );
    } catch (err) {
      console.log(err);
    }
  };


  // UseEffect for Current Page
  useEffect(() => {
    fetchMessages(currentPage);
    return () => {
      setLoading(true);
    };
  }, [currentPage]);



  useEffect(() => {
 
    setLoading(true);

    fetchMessages(1);

    return () => {
      setMessages([]);
      setUser("")
    };
  }, [isLoggedIn]);



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
                  user && user.access
                    ? msg.author.first_name
                    : "anonymous"
                }
                note={
                  user && user.access ? (
                    ""
                  ) : (
                    <span>
                      <strong>Note:</strong> Become a member to know who wrote
                      this message and when.{" "}
                    </span>
                  )
                }
                date={user && user.access ? msg.beautifyDate : ""}
                hr={user && user.access ? "" : <hr></hr>}
              />
            );
          })
        ) : (
          <h2>No messages</h2>
        )}
      </>
    );
  }

  const changePage = (e) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <section id="message-section" className="alignCenter flexColumn">
      <h2 id="title">Messages</h2>
      <div
        id="message-wrapper"
        className="flexColumn alignCenter justifyCenter"
      >
        {loading ? (
          <>
            <MoonLoader
              color={"#6b01b7"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
        ) : (
          <>{getMessages()}</>
        )}
      </div>
      <Pagination
        changePage={changePage}
        count={count}
        currentPage={currentPage}
      />
    </section>
  );
}

//need to update message when

export default Message;
