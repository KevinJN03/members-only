

import axios from "axios";
import Header from "./Components/header";
axios.defaults.withCredentials = true;
import "./App.css";
import Footer from "./Components/footer";
import Body from "./Components/Body";
import { AuthProvider } from "./Context/authContext";
import { useEffect } from "react";

function App() {
  return (
    <AuthProvider>
      <section id="app">
        <Header />
        <Body />
        <Footer />
      </section>
    </AuthProvider>
  );
}

export default App;
