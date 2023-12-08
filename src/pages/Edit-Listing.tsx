import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    title: yup.string().min(3).max(25).required(),
    description: yup.string().min(3).max(250).required(),
    address: yup.string().required(),
    beds: yup.number().positive().integer().min(1).required(),
    baths: yup.number().positive().integer().min(1).required(),
    price: yup.number().positive().required(),
    purpose: yup.string().required(),
    // category: yup.string().required(),
    // features: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateListing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <section className="p-10">
      <h2 className="text-center text-2xl font-medium mb-4">Create Listing</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-4"
      >
        {Object.keys(schema.fields)
          .slice(0, 6)
          .map((input,i) => {
            const fieldName = input as keyof FormData;
            return(
            <div key={i} className="relative">
              <input
                {...register(fieldName)}
                className="block w-full pb-1 px-6 pt-3 border border-gray-400 outline-none disabled:bg-transparent/10"
                type="text"
                name={input}
                id={input}
              />
              <label className="capitalize absolute left-6 -top-[14px] bg-white border-x-4 border-white" htmlFor={input}>{input}</label>
              {errors[fieldName]?.message && <span className="absolute bottom-0 left-6 text-red-600 text-xs ">This field is required</span>}
            </div>
          )})}

         <div className="relative">
         <select id="purpose"
          className="w-1/2 border border-neutral-200 p-2 aria-"
          {...register("purpose")}
          >
            <option value="">Select</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
          {errors.purpose?.message && <span className="absolute -bottom-4 left-0 text-red-600 text-sm select-none">This field is required</span>}
         </div>

         <div>
            <input type="file" name="images" id="images"  accept="image/*" multiple/>
         </div>

        <button className="block mx-auto py-2 px-4 border border-neutral-200 hover:scale-110 transition-transform"
        type="submit"
        >Create</button>
      </form>
    </section>
  );
};

export default CreateListing;
