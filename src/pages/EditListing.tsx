import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ElementRef, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl } from "@/lib/utils";

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
      .min(3, "Title must be at least 3 characters long.")
      .max(100, "Title cannot exceed 100 characters.")
      .optional(),
    description: yup
      .string()
      .min(3, "Description must be at least 3 characters long.")
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),
    address: yup.string().required("Address is required."),
    bedrooms: yup
      .number()
      .typeError("Bedrooms must be a number")
      .positive("Bedrooms must be a positive number.")
      .integer("Bedrooms must be a whole number.")
      .min(1, "Bedrooms must be at least 1.")
      .optional(),
    bathrooms: yup
      .number()
      .typeError("bathrooms must be a number")
      .positive("Bathrooms must be a positive number.")
      .integer("Bathrooms must be a whole number.")
      .min(1, "Bathrooms must be at least 1.")
      .optional(),
    price: yup
      .number()
      .typeError("price must be a number")
      .positive("Price must be a positive number.")
      .optional(),
    purpose: yup.string().required("Purpose is required."),
    // // category: yup.string().required(), // Add validation logic for category if needed
    furnished: yup.boolean().optional(),
    parking: yup.boolean().optional(),
    // // features: yup.string().required(), // Add validation logic for features if needed
    images: yup.mixed().optional(),
  })
  .required();
// type FormData = yup.InferType<typeof schema>;

interface image {
  secure_url: string;
  public_id: string;
}
interface IListing {
  title: string;
  slug: string;
  description: string;
  address: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  purpose: string;
  images: image[];
}

const EditListing = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<IListing>();

  const { id } = useParams();

  const [files, setFiles] = useState<File[] | null>([]);
  const [fileError, setFileError] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  // const useQuery = useQueryClient();

  const fileRef = useRef<ElementRef<"input">>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    if (selectedFiles.length > 6) {
      toast.error("Maximum Images Is 6 ");
      return;
    }

    try {
      const newImagesPreview = (await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          if (!file.type.startsWith("image")) {
            setFileError("Invalid file type. Only images are allowed.");
            return;
          }
          const url = await convertFileToUrl(file);
          return url;
        })
      )) as string[];
      setImagesPreview([...imagesPreview, ...newImagesPreview]);
      setFiles([...(files ?? []), ...selectedFiles]);
    } catch (error) {
      console.error("Error uploading files:", error);
      setFileError("An error occurred while uploading files.");
    }
  };

  const removeImage = (index: number) => {
    setImagesPreview((prevImages) => prevImages?.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index) ?? []);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/listing/${id}`)
      .then((res) => {
        setListing(res.data.isListingExist);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      title: listing?.title || "",
      description: listing?.description || "",
      address: listing?.address || "",
      bedrooms: listing?.bedrooms,
      bathrooms: listing?.bathrooms,
      price: listing?.price,
      purpose: listing?.purpose || "",
      furnished: listing?.furnished,
    },
  });

  const formData = new FormData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setLoading(true);
    for (const key in data) {
      if (key === "images" && data.images.length > 0) {
        const images = data[key];
        for (const image of images) {
          formData.append("images", image);
        }
      } else {
        formData.delete("images");
      }
      formData.append(key, data[key]);
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
      .put(`http://localhost:5000/api/listing/${id}`, formData)
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          toast.success("Successfully Updated");
          setLoading(false);
        } else {
          toast.error("SomeThing Went Wrong !");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
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

        {/* File */}
        <div>
          <div className="flex gap-2 justify-center py-5">
            {files?.length !== 6 && (
              <div className="relative w-[150px] h-[150px]  border rounded-md flex justify-center items-center  bg-cover bg-no-repeat bg-center">
                <Button
                  onClick={() => fileRef?.current?.click()}
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                >
                  Upload Images
                </Button>
                <input
                  multiple
                  {...register("images")}
                  ref={fileRef}
                  id="images"
                  className="absolute w-full h-full hidden"
                  disabled={loading}
                  placeholder="File"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            )}
            {imagesPreview?.map((item, i) => (
              <div
                key={i}
                className="relative w-[150px] h-[150px] border rounded-md  bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${item || ""})` }}
              >
                <Button
                  className={cn(
                    "absolute top-1 right-1 h-fit p-2 hidden hover:bg-transparent ",
                    item && "block"
                  )}
                  type="button"
                  variant={"ghost"}
                  onClick={() => removeImage(i)}
                >
                  <FaX />
                </Button>
              </div>
            ))}
          </div>
          <p
            className={cn(
              "hidden text-sm font-semibold text-red-600",
              fileError.length > 0 && "block"
            )}
          >
            {fileError}
          </p>
        </div>

        <Button
          className="w-full bg-mainColor hover:bg-mainColor/80"
          type="submit"
          disabled={loading}
        >
          {loading ? <PulseLoader /> : "Edit"}
        </Button>
      </form>
    </section>
  );
};

export default EditListing;

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
