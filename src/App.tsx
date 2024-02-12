import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor } from "./redux/store";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// import AuthContextProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ChakraProvider>
              <Toaster />
              <Navbar />
              <Outlet />
              <Footer />
            </ChakraProvider>
          </PersistGate>
        </Provider>
      {/* </AuthContextProvider> */}
      ,
    </>
  );
}

export default App;
