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
import EditListing from "../pages/EditListing";
import Services from "../pages/Services";
import About from "../pages/About";
import AuthMiddleware from "@/components/AuthMiddleware";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/listings",
  "/listings/:id",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

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
        element: (
          <AuthMiddleware>
            <Login />
          </AuthMiddleware>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthMiddleware>
            <Register />
          </AuthMiddleware>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthMiddleware>
            <Profile />
          </AuthMiddleware>
        ),
      },
      {
        path: "/create-list",
        element: (
          <AuthMiddleware>
            <CreateListing />
          </AuthMiddleware>
        ),
      },
      {
        path: "/edit-listing/:id",
        element: (
          <AuthMiddleware>
            <EditListing />
          </AuthMiddleware>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <AuthMiddleware>
            <UserListings />
          </AuthMiddleware>
        ),
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
