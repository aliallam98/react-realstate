/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import { registerFormSchema } from "@/schemas";
import toast from "react-hot-toast";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);

    await axios
      .post("http://localhost:5000/api/auth/signup", values)
      .then((res) => {
        res.data.success ? navigate("/login") : toast.error(res.data.message);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // const [userData, setUserData] = useState({
  //   userName: "",
  //   email: "",
  //   password: "",
  // });

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center p-10 ">
        <div>
          <h1 className="text-center text-3xl mb-2">Join ....</h1>
          <p className="text-center">Sign up to continue</p>
        </div>{" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-96 space-y-4  p-4 "
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </section>
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
