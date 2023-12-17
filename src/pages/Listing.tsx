import { Link, useParams } from "react-router-dom";
import Fancybox from "../components/Fancybox";
import { useEffect, useState } from "react";
import axios from "axios";
import toast , { Toaster } from "react-hot-toast";
import LoadingComponent from "../components/LoadingComponent";



interface image{
  secure_url:string
  public_id:string
}
interface IListing {
  _id:string
  title : string
  slug : string
  description : string
  address : string
  price : number
  bathrooms : number
  bedrooms : number
  furnished : boolean
  purpose : string
  images : image[]
}


const Listing = () => {
  const {id} = useParams()
  const [listing,setListing] = useState<IListing>()
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/api/listing/${id}`).then((res)=>{
      setListing(res.data.isListingExist)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      toast.error(error.message)
      
    })
  },[id])
  const images = [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/17188ebc-a038-47c3-95a9-a7b498da964c.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/a4eedf9e-a7e3-471d-9d61-4d3741be2635.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/6e8c0b8f-ab6e-496f-b372-acf054561787.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/9d799b97-924b-4c42-b59a-378656c5e26c.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/17188ebc-a038-47c3-95a9-a7b498da964c.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/a4eedf9e-a7e3-471d-9d61-4d3741be2635.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/6e8c0b8f-ab6e-496f-b372-acf054561787.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1020803619969682230/original/9d799b97-924b-4c42-b59a-378656c5e26c.jpeg?im_w=720",
  ];
  // const apiImages = listing?.images
  const renderImages = images?.map((image, i) => (
      <Link key={i} data-fancybox="gallery" to={`${listing?._id}`} className="h-fit">
        <img src={image} 
        className="w-[300px] bg-cover"
        />
      </Link>
    ))
  return (
    <section className="p-10">
      <Toaster/>
      {loading ? <LoadingComponent/> : (
        <div className="container">
        <h3 className="text-2xl font-semibold">Four Seasons Apartment Living</h3>
          <div  className="flex items-center justify-between">
              <p className="font-medium">Qasr El Nil, Cairo Governorate, Egypt</p>
              <div className="flex items-center gap-8 my-4">
                  <button className="border-b-2 border-neutral-200">Share</button>
                  <button className="border-b-2 border-neutral-200">Save</button>
              </div>
          </div>
        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
          }}
        >
          <div className="w-full h-full flex flex-wrap justify-center gap-5">
            <div>
            <Link data-fancybox="gallery" to={images[0]}>
              <img src={images[0]}
              className="h-[500px] object-cover"
              />
            </Link>
            </div>
  
            <div className="flex gap-5 rounded-md">
            {renderImages?.slice(0,5)}
            </div>
          </div>
        </Fancybox>
        </div>
      )}
    </section>
  );
};

export default Listing;
