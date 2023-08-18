import { useEffect, useState, useContext, createContext } from "react";

import axios from "axios";
import Header from "./Components/header";
axios.defaults.withCredentials = true;
import "./App.css";
import Footer from "./Components/footer";
import Body from "./Components/Body";
import { AuthProvider } from "./Context/authContext";
export const MessageContext = createContext();
import moonLoader from "react-spinners/MoonLoader";
function App() {
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [headerOption, setHeaderOption] = useState("false");
  const [loading, setLoading] = useState(true)
   
  useEffect(() => {
    axios.get("/message").then((res) => {
      //const { message } = res.data;
      console.log("messages", res.data)
      setMessages(res.data);
    });
  }, []);
 
  return (
    <AuthProvider >
      <MessageContext.Provider value={messages}>
       
          <Header />
          {loading ? moonLoader : <Body />}
          <Footer />
        
      </MessageContext.Provider>
    </AuthProvider>
  );
}

export default App;
