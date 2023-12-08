import { ChakraProvider } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import {Outlet} from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistor} from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider>
      <Navbar/>
      <Outlet />
    </ChakraProvider>
    </PersistGate>
    </Provider>,
    </>
  )
}

export default App
