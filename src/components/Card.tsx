import { FaRegHeart } from "react-icons/fa";
// Import Swiper React components
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const imgArr = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-835435993677010128/original/32003197-b28a-456d-abd2-26abd57eeaf7.jpeg?im_w=1200",
  "https://a0.muscache.com/im/pictures/miso/Hosting-835435993677010128/original/94115cea-5913-48b1-99b8-aefb105f819f.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/miso/Hosting-835435993677010128/original/4d4dd825-78c2-4f4f-97a0-435f68ce19bc.jpeg?im_w=720",
];

const Card = () => {
  return (
    <section className="px-10 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      <article className="relative border border-neutral-200 shadow-md">
      <FaRegHeart className="absolute top-4 right-4 cursor-pointer z-10 " size={20}/>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {imgArr.map((ele,i) => (
            <SwiperSlide key={i}>
              <img className="h-[300px] object-cover bg-center" src={ele} alt="silder image" />
            </SwiperSlide>
          ))}
          
        </Swiper>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p>Adresse</p>
            <span>Rate</span>
          </div>
          <p >lorem</p>
          <p className="product-card-description">Price ${"60"} night </p>
        </div>
        
      </article>
    </section>
  );
};

export default Card;
