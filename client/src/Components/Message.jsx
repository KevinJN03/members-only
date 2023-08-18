import MessageItem from "./MessageItem";
import { useContext } from "react";
import { MessageContext } from "../App";
import { useAuth } from "../Context/authContext";
import "../App.css";
function Message() {
  const dataContext = useContext(MessageContext);
  const { isLoggedIn, authUser } = useAuth();
  console.log("isloggedin", isLoggedIn);
  console.log("authUser: ", authUser);
  const messages = dataContext;
  return (
    <section id="message-section" className="alignCenter flexColumn">
      <h2 id="title">Messages</h2>
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
              note={authUser && authUser.user.access ? "" : (<span><strong>Note:</strong> Become a member to know who wrote this message and when. </span>)}
            />
          );
        })
      ) : (
        <h2>No messages</h2>
      )}
    </section>
  );
}

//need to update message when

export default Message;
