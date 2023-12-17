import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import Card from "../components/Card";
import { Link } from "react-router-dom";

interface ICard {
  _id: string;
  title: string;
  address: string;
  price: string;
}

axios.defaults.withCredentials = true;
import Cookies from "js-cookie";
import InputWithLabel from "../components/InputWithLabel";
import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";
const token = Cookies.get("x");
console.log(token);

const FilteringMenu = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  console.log(listing);

  const navigate = useNavigate();
  const [filteringData, setFilteringData] = useState({
    searchTerm: "",
    purpose: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
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
      orderFromUrl
    ) {
      setFilteringData({
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
      setLoading(true);
      await axios
        .get(`http://localhost:5000/api/listing/?${searchQuery}`)
        .then((res) => {
          setListing(res.data.listings);
          setLoading(false);
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
      <h3 className="text-2xl font-semibold text-center my-4">
        Find Your Dream Home
      </h3>
      <div className="flex gap-10">
        <form
          className={`flex flex-col gap-4 p-4 max-w-[300px]  h-[600px] shadow-md border relative duration-150  ${
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
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
                    <label htmlFor="parking">Parking</label>
                    <input
                      name="parking"
                      type="checkbox"
                      id="parking"
                      checked={filteringData.parking}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div>
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
          
          {loading ? <LoadingComponent/> : listing.map((listing: ICard) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <Card
                id={listing._id}
                title={listing.title}
                address={listing.address}
                price={listing.price}
              />
            </Link>
          ))}
          
        </div>
      </div>
      <Button
          title="Show More"
          className="block mx-auto py-2 px-4 bg-[#223f39] text-white mt-6 "
          />
    </section>
  );
};

export default FilteringMenu;
