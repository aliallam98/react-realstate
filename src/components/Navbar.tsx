import { Link } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react'
import { GrClose } from "react-icons/gr";

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
  } from '@chakra-ui/react'
  import { RxHamburgerMenu } from "react-icons/rx";


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
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <header className="shadow-md p-4">
      <nav className="container flex items-center justify-between ">
        <Link to={"/"}>Logo</Link>
        <ul  className="hidden md:flex items-center gap-4">
          {links.map((link,i) => (
            <Link key={i} to={link.path}>{link.label}</Link>
          ))}
        </ul>
        
        <button type="button"
        className="md:hidden"
        onClick={onOpen}><RxHamburgerMenu  /></button>
      </nav>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <button className="text-2xl p-2 absolute right-0 top-2" onClick={onClose}><GrClose/></button>
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
