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

  const { loading, currentUser } = useSelector(
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
  const token: string | null = localStorage.getItem("token") || null;
  if (token) {
    const decoded: Decoded = jwtDecode(token) || null; // Explicitly type 'JwtPayload'
    console.log(decoded);
    decoded ? (expirationTime = decoded?.exp * 1000) : 0; // Use optional chaining to avoid accessing '.exp' on undefined
    const currentTime = Date.now();
    // return token && currentTime > expirationTime ? <Navigate to='/login' /> : children;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return <Navigate to={DEFAULT_LOGIN_REDIRECT} />;
    }
    return children;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return <Navigate to={"/login"} />;
  }

  return children
};

export default AuthMiddleware;
