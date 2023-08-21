import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext();
export function useAuth() {
  return useContext(authContext);
}
export function AuthProvider(props) {
  useEffect(() => {
    // Check if the user was previously authenticated and set the state accordingly
    const storedAuthState = localStorage.getItem("isLoggedIn");
    if (storedAuthState === "true") {
      setIsLoggedIn(true);
    }
    //JSON.parse(localStorage.getItem("authUser"));
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);
  const [authUser,
    setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}

export default authContext;
