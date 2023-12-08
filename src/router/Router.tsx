import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CreateListing from "../components/CreateListing";
import Listing from "../pages/Listing";
import UserListings from "../pages/UserListings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-list",
        element: <CreateListing />,
      },
      {
        path: "/my-listings",
        element: <UserListings />,
      },
      {
        path: "/listing",
        element: <Listing />,
      },
      
    ],
  },
]);

export default router;



