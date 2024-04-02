import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
} from "@/router/Router";
import { jwtDecode } from "jwt-decode";

interface Decoded {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
}

interface IProps {
  children: string | JSX.Element | JSX.Element[];
}

const AuthMiddleware = ({ children }: IProps) => {
  const { pathname } = useLocation();

  const { loading, currentUser, token } = useSelector(
    (state: RootState) => state.user
  );

  const isLoggedIn = !!currentUser; //Return true | false
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  console.log(pathname);

  console.log(isLoggedIn);
  console.log(isPublicRoute);
  console.log(isAuthRoute);

  let expirationTime = 0;
  const currentTime = Date.now();

  // const token: string | null = localStorage.getItem("token") || null;

  // Improved token expiration check with optional chaining:
  // if (token) {
  //   const decoded: Decoded = jwtDecode(token) || null; // Explicitly type 'Decoded'

  //   if (decoded) {
  //     expirationTime = decoded.exp * 1000;

  //     // Check if token is expired:
  //     if (currentTime > expirationTime) {
  //       // Handle expired token:
  //       const handleExpiredToken = async () => {
  //         try {
  //           const response = await fetch(refreshTokenEndpoint, {
  //             method: "POST",
  //             // Include any necessary headers or body for refresh logic
  //           });

  //           if (response.ok) {
  //             const newToken = await response.json();
  //             localStorage.setItem("token", newToken);
  //             // Optional: Update redux state with new token information
  //             return children; // Allow access after successful refresh
  //           } else {
  //             // Handle refresh error (e.g., redirect to login)
  //             return <Navigate to={"/login"} />;
  //           }
  //         } catch (error) {
  //           console.error("Error refreshing token:", error);
  //           // Handle refresh error gracefully (e.g., redirect to login)
  //           return <Navigate to={"/login"} />;
  //         }
  //       };

  //       // Call the asynchronous token refresh handler:
  //       return handleExpiredToken();
  //     }
  //   }
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return <Navigate to={DEFAULT_LOGIN_REDIRECT} />;
    }
    return children;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default AuthMiddleware;
