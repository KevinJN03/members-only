import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignUp from "./Components/signup"


const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "signup",
            element: <SignUp/>
        }
    ])
    return < RouterProvider router={router}/>;
};

export default Router