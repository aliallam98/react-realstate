import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CreateListing from "../pages/CreateListing";
import Listing from "../pages/Listing";
import UserListings from "../pages/MyListings";
import Listings from "../pages/Listings";
import EditListing from '../pages/EditListing'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/edit-listing/:id",
        element: <EditListing/>,
      },
      {
        path: "/my-listings",
        element: <UserListings />,
      },
      {
        path: "/listing/:id",
        element: <Listing />,
      },
      {
        path: "/listings",
        element: <Listings />,
      },
    ],
  },
]);

export default router;
