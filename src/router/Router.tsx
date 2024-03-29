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
import Services from "../pages/Services";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";









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
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
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
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "/create-list",
        element: <ProtectedRoute><CreateListing /></ProtectedRoute>,

      },
      {
        path: "/edit-listing/:id",
        element: <ProtectedRoute><EditListing/></ProtectedRoute>,

      },
      {
        path: "/my-listings",
        element: <ProtectedRoute><UserListings /></ProtectedRoute>,
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
