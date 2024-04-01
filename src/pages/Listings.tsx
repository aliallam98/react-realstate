import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;
import LoadingComponent from "../components/LoadingComponent";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { IListing } from "@/types";
import FlitteringMenu from "@/components/FlitteringMenu";

const FilteringMenu = () => {
  const [filteringData, setFilteringData] = useState({
    page: "1",
    limit: "8",
    searchTerm: "",
    purpose: "all",
    parking: false,
    furnished: true,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<IListing[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // const [isOpen, setIsOpen] = useState(false);
  // const toggleSidebar = () => setIsOpen(!isOpen);

  // const showMoreHandler = () => {
  //   const newPage = Number(filteringData.page) + 1;
  //   setFilteringData({ ...filteringData, page: newPage.toString() });

  //   // const urlParams = new URLSearchParams();
  //   // urlParams.set("page", newPage.toString());
  //   // const searchQuery = urlParams.toString();
  //   // axios
  //   //   .get(`http://localhost:5000/api/listing/?${searchQuery}`)
  //   //   .then((res) => {
  //   //     const newListings = res.data.results.listings as IListing[];
  //   //     setListings([...listings, ...newListings]);
  //   //     setTotalPages(res.data.results.totalPages);
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((error) => console.log(error));
  //   // navigate(`/listings?${searchQuery}`);
  // };
  return (
    <section className="relative p-4">
      <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-center mb-10 mt-5">
        Find Your Dream Home
      </h3>
      <div className="flex flex-col lg:flex-row ">
        <FlitteringMenu
          filteringData={filteringData}
          setFilteringData={setFilteringData}
          setLoading={setLoading}
          setListings={setListings}
          setTotalPages={setTotalPages}
        />
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="grid grow justify-center grid-cols-[repeat(auto-fill,minmax(270px,300px))] gap-4">
            {listings.map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="h-fit"
              >
                <Card
                  title={listing.title}
                  address={listing.address}
                  price={listing.price}
                  images={listing.images}
                  description={listing.description}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={filteringData.page}
        totalPages={totalPages}
        setFilteringData={setFilteringData}
        filteringData={filteringData}
      />
    </section>
  );
};

export default FilteringMenu;
