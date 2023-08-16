import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/signup"
import Login from "./Components/login";


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "signup",
            element: <SignUp/>
        }, {
            path: "login",
            element: <Login/>
        }
    ])
    return < RouterProvider router={router}/>;
};

export default Router