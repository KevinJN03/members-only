import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/signup"
import Login from "./Components/login";
import DashBoard from "./Components/dashboard";


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "/:name",
            element: <App />
        }

    ])
    return < RouterProvider router={router}/>;
};

export default Router