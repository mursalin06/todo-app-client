import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Home/Main";
import Login from "../Pages/login/Login";
import Register from "../Pages/register/Register";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Tasks from "../Pages/tasks/Tasks";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>
    },
    {
      path: "/tasks",
      element: (
        <PrivateRoute>
          <Tasks></Tasks>
        </PrivateRoute>
      ),
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

