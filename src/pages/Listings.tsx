import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import Card from "../components/Card";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;
import InputWithLabel from "../components/InputWithLabel";
import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";
import useGetAllListings from "../hooks/useGetAllListings";

const FilteringMenu = () => {
  const {isLoading,setIsLoading,listings,setListings,totalPages,setTotalPages} = useGetAllListings()


  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const [filteringData, setFilteringData] = useState({
    page: "1",
    limit: "5",
    searchTerm: "",
    purpose: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get("page");
    const limitFromUrl = urlParams.get("limit");
    const searchTermFromUrl = urlParams.get("searchTerm");
    const purposeFromUrl = urlParams.get("purpose");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      purposeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      pageFromUrl ||
      limitFromUrl
    ) {
      setFilteringData({
        page: String(pageFromUrl),
        limit: String(limitFromUrl),
        searchTerm: String(searchTermFromUrl),
        purpose: String(purposeFromUrl),
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: String(sortFromUrl),
        order: String(orderFromUrl),
      });
    }

    const fetchListing = async () => {
      const searchQuery = urlParams.toString();
      setIsLoading(true);
      await axios
        .get(`http://localhost:5000/api/listing/?${searchQuery}`)
        .then((res) => {
          setListings(res.data.results.listings);
          setTotalPages(res.data.results.totalPages);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    };

    fetchListing();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "parking" || name === "furnished") {
      setFilteringData({
        ...filteringData,
        [name]: checked,
      });
    } else if (e.target.id == "sort_order") {
      const sort = value.split("_")[0];
      const order = value.split("_")[1];
      console.log(sort, order);
      setFilteringData({
        ...filteringData,
        sort,
        order,
      });
    } else {
      setFilteringData({
        ...filteringData,
        [name]: value,
      });
    }
  };
  const onSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    const sort = value.split("_")[0];
    const order = value.split("_")[1];
    setFilteringData({
      ...filteringData,
      sort,
      order,
    });
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("page", filteringData.page);
    urlParams.set("limit", filteringData.limit);
    urlParams.set("searchTerm", filteringData.searchTerm);
    urlParams.set("purpose", filteringData.purpose);
    urlParams.set("parking", String(filteringData.parking));
    urlParams.set("furnished", String(filteringData.furnished));
    urlParams.set("sort", filteringData.sort);
    urlParams.set("order", filteringData.order);

    const searchQuery = urlParams.toString();
    navigate(`/listings?${searchQuery}`);
  };
  return (
    <section className="relative p-4">
      <h3 className="text-2xl font-semibold text-center my-6">
        Find Your Dream Home
      </h3>
      <div className="flex gap-10">
        <form
          className={`flex flex-col gap-4 p-4 max-w-[300px]  h-[600px] shadow-md border relative  ${
            isOpen ? "w-[300px]" : "w-16"
          } `}
          onSubmit={onSubmitHandler}
        >
          <button onClick={toggleSidebar} type="button">
            {isOpen ? (
              <IoExitOutline size={25} />
            ) : (
              <IoExitOutline size={25} className="rotate-180" />
            )}
          </button>
          {isOpen && (
            <>
              <h3 className="text-center text-xl font-semibold my-6">
                Filtering
              </h3>
              <InputWithLabel
                name="searchTerm"
                type="text"
                label="Search"
                value={filteringData.searchTerm}
                onChange={onChangeHandler}
              />
              <div className="">
                <h3 className="font-semibold">Purpose:</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="all">All</label>
                    <input
                      name="purpose"
                      type="radio"
                      value="all"
                      id="all"
                      onChange={onChangeHandler}
                      checked={filteringData.purpose === "all"}
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="forRent">For Rent</label>
                    <input
                      name="purpose"
                      type="radio"
                      value="For Rent"
                      id="forRent"
                      onChange={onChangeHandler}
                      checked={filteringData.purpose === "For Rent"}
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="forSale">For Sale</label>
                    <input
                      name="purpose"
                      type="radio"
                      value="For Sale"
                      id="forSale"
                      onChange={onChangeHandler}
                      checked={filteringData.purpose === "For Sale"}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <h3 className="font-semibold">Amenities:</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="parking">Parking</label>
                    <input
                      name="parking"
                      type="checkbox"
                      id="parking"
                      checked={filteringData.parking}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <label htmlFor="furnished">Furnished</label>
                    <input
                      name="furnished"
                      type="checkbox"
                      id="furnished"
                      checked={filteringData.furnished}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="font-semibold" htmlFor="sort_order">
                  Sort:
                </label>
                <select
                  name="sort_order"
                  id="sort_order"
                  className="border border-neutral-200 w-full p-2"
                  value={`${filteringData.sort}_${filteringData.order}`}
                  onChange={onSelectHandler}
                >
                  <option value="price_desc">Price High To Low</option>
                  <option value="price_asc">Price Low To High</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_ase">Oldest</option>
                </select>
              </div>
              <Button
                className="block w-[80%] mx-auto py-2 px-4 hover:scale-110 transition-transform border border-neutral-200 mt-4"
                title="Search"
              />
            </>
          )}
        </form>

        <div className="grid grow justify-center grid-cols-[repeat(auto-fill,minmax(270px,300px))] gap-4">
          {isLoading ? (
            <LoadingComponent />
          ) : (
            listings.map((listing) => (
              <Link key={listing._id} to={`/listing/${listing._id}`}>
                <Card
                  title={listing.title}
                  address={listing.address}
                  price={listing.price}
                  images={listing.images}
                  description={listing.description}
                />
              </Link>
            ))
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <Button
          title="Show More"
          className="block mx-auto py-2 px-4 bg-[#223f39] text-white mt-6 "
          onClick={() => {}}
        />
      )}
    </section>
  );
};

export default FilteringMenu;
