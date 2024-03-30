import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
import { loginFormSchema } from "@/schemas";

// import { jwtDecode } from "jwt-decode";

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigate = useNavigate();
  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  const { loading, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    dispatch(signInStart());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await axios
      .post("http://localhost:5000/api/auth/login", values)
      .then((res) => {
        dispatch(signInSuccess(res.data.payload));
        // localStorage.setItem("realEstate-Auth", res.data.payload);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return dispatch(signInFailure(error.response.data.message));
      });
  }

  return (
    <>
      {currentUser ? (
        <Navigate to={"/"} />
      ) : (
        <section className="h-screen py-10">
          <div className="container h-full  flex flex-col justify-center items-center gap-10">
            <div>
              <h1 className="text-center text-3xl mb-2">Welcome Back</h1>
              <p className="text-center">Login to continue</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 space-y-4  p-4 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Email"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;

{
  /* <span className="text-center text-sm mt-2">OR</span> */
}

{
  /* <button
  className="flex items-center justify-center p-2 shadow-md font-medium text-sm mb-4 border border-neutral-200 "
  disabled={loading}
> */
}
{
  /* <Image src={''} alt="Google Icon" width={16} height={16} /> */
}
{
  /* <span className="w-11/12">Continue with Google</span> */
}
{
  /* </button> */
}
