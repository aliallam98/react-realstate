/* eslint-disable @typescript-eslint/no-explicit-any */
import { BeatLoader } from "react-spinners";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios
      .post("http://localhost:5000/api/auth/signup", userData)
      .then(() => {
        navigate("/login");
      })
      .catch((error: any) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="h-screen flex justify-center p-10 ">
        <form
          className="flex flex-col w-[400px] shadow-lg p-10 h-fit mt-20 space-y-4"
          onSubmit={handleOnSubmit}
        >
          <p className="text-center font-medium mb-4">Sign up to continue</p>
          {error && (
            <p className="text-center font-medium mb-4 text-red-400">{error}</p>
          )}
          <input
            className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
            type="text"
            name="userName"
            placeholder="Enter Your username"
            onChange={onChangeHandler}
            disabled={loading}
          />
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
            className="p-2 border border-neutral-200 shadow-md"
            onClick={handleOnSubmit}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} margin={1} /> : "Sign Up "}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;

{
  /* <span className="text-center text-sm mt-2">OR</span>

<button className="flex items-center justify-center p-2 shadow-md font-medium text-sm mb-4 border border-neutral-200
"
disabled={loading}
> */
}
{
  /* <Image src={''} alt="Google Icon" width={16} height={16} /> */
}
// <span className="w-11/12">Continue with Google</span>
// </button>
