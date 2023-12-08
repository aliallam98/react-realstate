import { Link } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react'
import { GrClose } from "react-icons/gr";


import { jwtDecode } from "jwt-decode";
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

import {useNavigate} from 'react-router-dom'




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJWTExpired = (token : any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded : any = jwtDecode(token);
  const expirationTime = decoded?.exp * 1000;
  const currentTime = Date.now();
  return currentTime > expirationTime ? "Token Expired" : decoded
};
if(localStorage.getItem("token")){
  console.log(isJWTExpired(localStorage.getItem("token")));
}







import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
  } from '@chakra-ui/react'
  import { RxHamburgerMenu } from "react-icons/rx";
import { logOutStart,logOutEnd } from "../redux/user/userSlice";


const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Link",
    path: "/",
  },
  {
    label: "Link",
    path: "/",
  },
];


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const {currentUser,loading} :any = useSelector((state: RootState) => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const token = Cookies.get('token')
    
    const onClickHandler = async ()=>{
    dispatch(logOutStart())

        await fetch('http://localhost:5000/api/auth/logout',{
      method:"POST",
    })      
    localStorage.removeItem("token")
    dispatch(logOutEnd())
    navigate('/')
    }

  return (
    <header className="py-6 bg-[#223f39] text-white">
      <nav className="container flex items-center justify-between ">
        <Link to={"/"}>Logo</Link>
        <ul  className="hidden md:flex items-center gap-4">
          {links.map((link,i) => (
            <Link key={i} to={link.path}>{link.label}</Link>
          ))}
        </ul>


        {currentUser ? <div className="flex  items-center">
          <p className="cursor-pointer "><Link to={'/profile'}>{currentUser.name}</Link></p>
          <button 
          onClick={onClickHandler}
          disabled={loading}
          className="p-2 px-4">Log Out</button> 
        </div>: (
          <div>
          <button className="p-2 px-4"><Link to={'/login'}>Log In</Link></button>
          <button className="p-2 px-4"><Link to={'/register'}>Sign Up</Link></button>
        </div>
        )}
        
        <button type="button"
        className="md:hidden"
        onClick={onOpen}><RxHamburgerMenu  /></button>
      </nav>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <button className="block text-2xl p-2 absolute right-0 top-2 w-fit" onClick={onClose}><GrClose/></button>
          <DrawerHeader borderBottomWidth='1px'>Basic Drawer </DrawerHeader>
          <DrawerBody className="">
          <ul className="flex flex-col items-center gap-4">
          {links.map((link,i) => (
            <Link key={i} to={link.path}>{link.label}</Link>
          ))}
        </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
