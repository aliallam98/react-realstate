import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import axios from 'axios'
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// const dataInputs = [
//   "name",
//   "description",
//   "address",
//   "Images",
//   "beds",
//   "baths",
//   "price",
//   "sell-rent",
// ];

const schema = yup
  .object({
    title: yup
      .string()
      .min(3, "Required And At Least 3 Char and max 25 ")
      .max(100)
      .required(),
    description: yup.string().min(3).max(500).required(),
    address: yup.string().required(),
    bedrooms: yup.number().positive().integer().min(1).required(),
    bathrooms: yup.number().positive().integer().min(1).required(),
    price: yup.number().positive().required(),
    purpose: yup.string().required(),
    // // category: yup.string().required(),
    furnished: yup.boolean(),
    parking: yup.boolean(),
    // // features: yup.string().required(),
    images: yup.mixed().required(),
  })
  .required();

// type FormData = yup.InferType<typeof schema>;
// interface FormData {
//   title: string;
//   description: string;
//   address: string;
//   bedrooms: number;
//   bathrooms: number;
//   price: number;
//   purpose: string;
//   furnished: boolean
// }

const CreateListing = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formData = new FormData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {

    setLoading(true);
    for (const key in data) {
      if (key === "images") {
        const images = data[key];
        for (const image of images) {
          formData.append("images", image);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    // formData.append('title',data.title)
    // formData.append('address',data.address)
    // formData.append('bathrooms',data.bathrooms.toString())
    // formData.append('bedrooms',data.bedrooms.toString())
    // formData.append('price',data.price.toString())
    // formData.append('purpose',data.purpose)
    // formData.append('description',data.description)
    // formData.append('furnished',data.furnished)
    // formData.append('images',data.images)
    axios
      .post("http://localhost:5000/api/listing/", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Successfully Created");
          navigate(`/listing/${res.data.results._id}`)
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="p-10">
      <h2 className="text-center text-2xl font-medium mb-4">Create Listing</h2>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-4"
      >
        {/* Title Input */}
        <Input
          {...register("title")}
          name="title"
          type="text"
          disabled={loading}
        />
        {errors.title?.message && (
          <span className=" text-red-600 text-sm select-none">
            {errors.title?.message}
          </span>
        )}
        {/* Address Input */}
        <Input
          {...register("address")}
          name="address"
          type="text"
          disabled={loading}
        />
        {errors.address?.message && (
          <span className=" text-red-600 text-sm select-none">
            {errors.address?.message}
          </span>
        )}
        <div className="flex flex-col sm:flex-row  flex-wrap  justify-between gap-4">
          {/* Bedrooms Input */}
          <Input
            {...register("bedrooms")}
            name="bedrooms"
            type="text"
            disabled={loading}
          />
          {errors.bedrooms?.message && (
            <span className=" text-red-600 text-sm select-none">
              {errors.bedrooms?.message}
            </span>
          )}
          {/* Bathrooms Input */}
          <Input
            {...register("bathrooms")}
            name="bathrooms"
            type="text"
            disabled={loading}
          />
          {errors.bathrooms?.message && (
            <span className=" text-red-600 text-sm select-none">
              {errors.bathrooms?.message}
            </span>
          )}
          {/* Price Input */}
          <Input
            {...register("price")}
            name="price"
            type="text"
            disabled={loading}
          />
          {errors.price?.message && (
            <span className=" text-red-600 text-sm select-none">
              {errors.price?.message}
            </span>
          )}
          {/* Purpose Select */}
          <div className="relative">
            <select
              id="purpose"
              disabled={loading}
              className="block w-[230px] border border-neutral-200 p-2"
              {...register("purpose")}
            >
              <option value="">Select</option>
              <option value="For Rent">For Rent</option>
              <option value="For Sale">For Sale</option>
            </select>
            <label
              htmlFor="purpose"
              className="capitalize absolute left-6 -top-[14px] bg-white border-x-4 border-white"
            >
              Purpose
            </label>
            {errors.purpose?.message && (
              <span className=" left-0 text-red-600 text-sm select-none">
                This field is required
              </span>
            )}
          </div>
        </div>
        {/* Description Text Area */}
        <div className="relative">
          <textarea
            disabled={loading}
            {...register("description")}
            id="description"
            className="border border-neutral-200 focus:outline-none p-2 w-full resize-none"
          ></textarea>
          <label
            className="capitalize absolute left-6 -top-[14px] bg-white border-x-4 border-white"
            htmlFor={"description"}
          >
            description
          </label>
          {errors.description?.message && (
            <span className="absolute -bottom-4 left-0 text-red-600 text-sm select-none">
              {errors.description?.message}
            </span>
          )}
        </div>
        {/* CheckBox */}
        <div className="flex items-center gap-4">
          <label htmlFor="furnished">Furnished</label>
          <input
            type="checkbox"
            {...register("furnished")}
            id="furnished"
            disabled={loading}
          />
        </div>
        {/* CheckBox */}
        <div className="flex items-center gap-4">
          <label htmlFor="parking">Parking</label>
          <input
            type="checkbox"
            {...register("parking")}
            id="parking"
            disabled={loading}
          />
        </div>

        {/* Upload Files */}
        <div>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            {...register("images")}
            disabled={loading}
          />
          {/* <p>{errors.images?.message} </p> */}
        </div>

          <button
            className="block mx-auto py-2 px-4 border border-neutral-200 hover:scale-110 transition-transform"
            type="submit"
            disabled={loading}
          >
            {loading ? <PulseLoader />: "Create"}
          </button>
      </form>
    </section>
  );
};

export default CreateListing;

// {Object.keys(schema.fields)
//   .slice(0, 6)
//   .map((input,i) => {
//     const fieldName = input as keyof FormData;
//     return(
//     <div key={i} className="relative">
//       <input
//         {...register(fieldName)}
//         className="block w-full pb-1 px-6 pt-3 border border-gray-400 outline-none disabled:bg-transparent/10"
//         type="text"
//         name={input}
//         id={input}
//       />
//       <label className="capitalize absolute left-6 -top-[14px] bg-white border-x-4 border-white" htmlFor={input}>{input}</label>
//       {errors[fieldName]?.message && <span className="absolute bottom-0 left-6 text-red-600 text-xs ">This field is required</span>}
//     </div>
//   )})}
