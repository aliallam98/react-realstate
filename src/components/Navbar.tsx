import { Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJWTExpired = (token: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwtDecode(token);
  const expirationTime = decoded?.exp * 1000;
  const currentTime = Date.now();
  return currentTime > expirationTime ? "Token Expired" : decoded;
};
if (localStorage.getItem("token")) {
  console.log(isJWTExpired(localStorage.getItem("token")));
}

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { logOutStart, logOutEnd } from "../redux/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { navLinks } from "@/constants";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser, loading }: any = useSelector(
    (state: RootState) => state.user
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const token = Cookies.get('token')

  const onClickHandler = async () => {
    dispatch(logOutStart());
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
    });
    localStorage.removeItem("token");
    dispatch(logOutEnd());
    navigate("/");
  };

  return (
    <header className="py-4 bg-mainColor text-white">
      <nav className="container flex items-center justify-between ">
        <div className="flex items-center  gap-12">
          <Link to={"/"}>
            <img width={80} height={80} src="/logo.png" />
          </Link>
          <ul className="hidden md:flex items-center gap-4">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {currentUser ? (
            <>
              <Button
                asChild
                className="bg-secondColor text-black hover:bg-secondColor/80"
              >
                <Link to={"/profile"}>{currentUser.userName}</Link>
              </Button>
              <Button onClick={onClickHandler} disabled={loading}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-secondColor/20 hover:bg-secondColor/10">
                <Link to={"/login"}>Log In</Link>
              </Button>
              <Button>
                <Link to={"/register"}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        <Button className="md:hidden" variant={"ghost"} onClick={onOpen}>
          <RxHamburgerMenu />
        </Button>
      </nav>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <button
            className="block text-2xl p-2 absolute right-0 top-2 w-fit"
            onClick={onClose}
          >
            <GrClose />
          </button>
          <DrawerHeader borderBottomWidth="1px">Welcome</DrawerHeader>
          <DrawerBody className="">
            <ul className="flex flex-col items-center gap-4 mt-6">
              {navLinks.map((link, i) => (
                <Link key={i} to={link.path} className="text-xl">
                  {link.label}
                </Link>
              ))}
            </ul>
          </DrawerBody>
          <DrawerFooter className="flex flex-col gap-4">
            {currentUser ? (
              <>
                <Button
                  asChild
                  className="bg-secondColor text-black hover:bg-secondColor/80 w-full"
                >
                  <Link to={"/profile"}>{currentUser.userName}</Link>
                </Button>
                <Button
                  onClick={onClickHandler}
                  disabled={loading}
                  className="w-full"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full">
                  <Link to={"/login"}>Log In</Link>
                </Button>
                <Button className="w-full">
                  <Link to={"/register"}>Sign Up</Link>
                </Button>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
