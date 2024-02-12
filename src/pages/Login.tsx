import { BeatLoader } from "react-spinners";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// import { jwtDecode } from "jwt-decode";

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { loading, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(signInStart());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await axios
      .post("http://localhost:5000/api/auth/login", userData)
      .then((res) => {
        dispatch(signInSuccess(res.data.payload));
        // localStorage.setItem("realEstate-Auth", res.data.payload);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        return dispatch(signInFailure(error.message));
      })
      
  };

  return (
    <>
      {currentUser ? (
        <Navigate to={"/"} />
      ) : (
        <div className="h-screen flex justify-center p-10 ">
          <form
            className="flex flex-col w-[400px] shadow-lg p-10 h-fit mt-20 space-y-4 "
            onSubmit={handleOnSubmit}
          >
            <p className="text-center font-medium mb-4">Login to continue</p>
            <input
              className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
              type="text"
              name="email"
              placeholder="Enter Your Email"
              onChange={onChangeHandler}
              disabled={loading}
            />
            <input
              className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
              disabled={loading}
            />
            <p className="text-xs my-4">
              By signing up, I accept the Atlassian Cloud Terms of Service and
              acknowledge the Privacy Policy.
            </p>
            <button
              type="submit"
              className="p-2 border border-neutral-200 shadow-md"
              disabled={loading}
            >
              {loading ? <BeatLoader size={10} margin={1} /> : "Log In "}
            </button>

          </form>
        </div>
      )}
    </>
  );
}

export default Login;


{/* <span className="text-center text-sm mt-2">OR</span> */}

{/* <button
  className="flex items-center justify-center p-2 shadow-md font-medium text-sm mb-4 border border-neutral-200 "
  disabled={loading}
> */}
  {/* <Image src={''} alt="Google Icon" width={16} height={16} /> */}
  {/* <span className="w-11/12">Continue with Google</span> */}
{/* </button> */}