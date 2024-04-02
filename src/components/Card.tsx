// Import Swiper React components
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IListing } from "../types";
import { Skeleton } from "./ui/skeleton";
import AddAndRemoveFromFavorites from "./AddAndRemoveFromFavorites";
import { Link } from "react-router-dom";

interface IProps {
  data: IListing;
  isAddedToFavorites:boolean
}
const Card = ({ data,isAddedToFavorites }: IProps) => {
  return (
    <Link to={`/listing/${data._id}`}>
      <article className="relative border border-neutral-200  rounded-3xl overflow-hidden shadow-md h-[415px] max-w-[400px] mx-auto">
        <AddAndRemoveFromFavorites
          listingId={data._id!}
          isAddedToFavorites={isAddedToFavorites}
        />
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {data.images?.map((ele, i) => (
            <SwiperSlide key={i}>
              <img
                className="h-[300px] object-cover mx-auto "
                src={ele.secure_url}
                alt="silder image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p>{data.address}</p>
            <span>Rate</span>
          </div>
          <p className="">
            {data.description?.split(" ").slice(0, 9).join(" ")}
          </p>
          <p className="absolute bottom-2">${data.price} - Night </p>
        </div>
      </article>
    </Link>
  );
};

export default Card;

Card.Skeleton = function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-[250px] rounded-xl bg-black/10" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-black/10" />
        <Skeleton className="h-4 w-[250px] bg-black/10" />
        <Skeleton className="h-4 w-[200px] bg-black/10" />
      </div>
    </div>
  );
};
