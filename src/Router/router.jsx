import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Home/Main";
import Login from "../Pages/login/Login";
import Register from "../Pages/register/Register";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>
    },
    {
      path:"/login",
      element:<Login></Login>
    },
    {
      path:"/register",
      element:<Register></Register>
    }
  ]);

