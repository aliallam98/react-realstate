import { ChakraProvider } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import {Outlet} from 'react-router-dom'


function App() {

  return (
    <>
    <ChakraProvider>
      <Navbar/>
      <Outlet />
    </ChakraProvider>

    </>
  )
}

export default App
