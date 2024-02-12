import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


// interface Decoded {
//     email:string
//     exp:number
//     iat:number
//     id:string
//     name:string
//     }
    type Props = {
      children: string | JSX.Element | JSX.Element[] 
    }

    const ProtectedRoute = ({children}:Props) => {
      const { loading, currentUser } = useSelector(
        (state: RootState) => state.user
      );
      return !currentUser && !loading ? <Navigate to='/login' /> : children
      


      
        // let expirationTime = 0
        // const token:string | null = localStorage.getItem('token') || null;
        // if (token) {
        //   const decoded : Decoded  = jwtDecode(token) || null // Explicitly type 'JwtPayload'
        //   console.log(decoded);
        //   decoded ? expirationTime =  decoded?.exp * 1000  : 0  // Use optional chaining to avoid accessing '.exp' on undefined
        //   const currentTime = Date.now();
        //   return token && currentTime > expirationTime ? <Navigate to='/login' /> : children;
        // }

    }

      export default ProtectedRoute