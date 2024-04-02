import { Link, useParams } from "react-router-dom";
import Fancybox from "../components/Fancybox";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingComponent from "../components/LoadingComponent";
import { IListing } from "../types";

const Listing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<IListing>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/listing/${id}`)
      .then((res) => {
        setListing(res.data.isListingExist);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, [id]);
  const renderImages = listing?.images?.map((image, i) => (
    <Link
      key={i}
      data-fancybox="gallery"
      to={image.secure_url}
      className="h-fit"
    >
      <img
        src={image.secure_url}
        className=" w-[200px] h-[80px] lg:w-[300px] lg:h-[200px] bg-cover"
      />
    </Link>
  ));
  return (
    <section className="py-10">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container">
          <h3 className="text-2xl font-semibold capitalize">
            {listing?.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-medium capitalize">{listing?.address}</p>
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
                <Link
                  data-fancybox="gallery"
                  to={listing?.images?.[0].secure_url as string}
                  className="w-fit"
                >
                  <img
                    src={listing?.images?.[0].secure_url}
                    className="w-[800px] object-cover mx-auto"
                  />
                </Link>
              </div>
              <div className="flex gap-5 rounded-md">
                {renderImages?.slice(1, 5)}
              </div>
            </div>
          </Fancybox>
        </div>
      )}
    </section>
  );
};

export default Listing;
