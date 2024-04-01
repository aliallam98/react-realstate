import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// interface IFormData {
//   userName?: string;
//   email?: string;
//   password?: string;
//   profileImage?: {
//     downloadURL: string;
//     fileName: string;
//   };
// }

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profilerFormSchema } from "@/schemas";

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

const Profile = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser, loading, error }: any = useSelector(
    (state: RootState) => state.user
  );

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePres, setFilePres] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof profilerFormSchema>>({
    resolver: zodResolver(profilerFormSchema),
    defaultValues: {
      userName: currentUser.userName || "",
      email: currentUser.email || "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof profilerFormSchema>) {
    dispatch(userUpdateStart());
    axios
      .put("http://localhost:5000/api/user/", values)
      .then((res) => {
        dispatch(userUpdateSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(userUpdateFailure(err.message));
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = file.name + uuidv4();
    const storageRef = ref(storage, `Profile-Images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePres(Math.round(progress));
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .put("http://localhost:5000/api/user/", {
              profileImage: { downloadURL, fileName },
            })
            .then((res) => {
              console.log(res.data.results);
              dispatch(userUpdateSuccess({ ...res.data.results }));
            })
            .catch((err) => {
              dispatch(userUpdateFailure(err.message));
            });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <section className="pb-20 ">
      <div className="relative bg-secondColor h-[200px] py-6">
        <h3 className="text-center text-4xl mb-6 capitalize">
          Hello, {currentUser.userName}
        </h3>

        {/* Image */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
          <img
            className="w-40 h-40 rounded-full mx-auto my-4 object-contain   shadow-md bg-white"
            src={
              currentUser.profileImage?.downloadURL //formData?.profileImage?.downloadURL ||
            }
            alt="profileImage"
            onClick={() => fileRef?.current?.click()}
          />
          {error && <p className="text-center text-red-600">{error}</p>}
          <div
            className={`text-center ${
              fileUploadError ? "text-red-600" : "text-green-600"
            }`}
          >
            {fileUploadError ? (
              <p>There Is Something Wrong With uploading Image</p>
            ) : filePres > 0 && filePres < 100 ? (
              <p>{`Uploading .. ${filePres}%`}</p>
            ) : filePres === 100 ? (
              <p>Uploaded ..</p>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* End Image */}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-lg space-y-4 p-4 mx-auto mt-10"
        >
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            ref={fileRef}
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files?.[0])
            }
          />

          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} disabled={loading} />
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
                  <Input placeholder="Enter Your Email" {...field} disabled />
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
          <Button
            type="submit"
            className="w-full bg-secondColor border-secondColor rounded-3xl text-black hover:bg-secondColor/80"
            disabled={loading}
          >
            Submit
          </Button>
          <Button
            asChild
            type="submit"
            className="w-full bg-mainColor hover:bg-mainColor/80 text-white  rounded-3xl"
            disabled={loading}
          >
            <Link to={"/my-listings"}>My Listings</Link>
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Profile;
