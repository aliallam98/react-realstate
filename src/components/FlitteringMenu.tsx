import {
  ElementRef,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { IListing } from "../types";

import { IoExitOutline } from "react-icons/io5";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputWithLabel from "./InputWithLabel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlitteringMenu = ({
  filteringData,
  setFilteringData,
  setLoading,
  setListings,
  setTotalPages,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const formRef = useRef<ElementRef<"form">>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const searchQuery = urlParams.toString();
      await axios
        .get(`http://localhost:5000/api/listing/?${searchQuery}`)
        .then((res) => {
          const newListings = res.data.results.listings as IListing[];
          setListings(newListings);
          setTotalPages(res.data.results.totalPages);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    fetchListing();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, filteringData.page]);

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

  const toggleSidebar = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <form
        ref={formRef}
        className={`relative flex flex-col gap-10 p-4  max-w-[300px] h-fit lg:h-[550px]   ${
          isMenuOpen
            ? "mx-auto lg:w-[300px] border shadow-md"
            : "mr-auto w-fit lg:w-16"
        } `}
        onSubmit={onSubmitHandler}
      >
        {/* Wide Screen Menu Button */}
        <Button
          onClick={toggleSidebar}
          type="button"
          className="hidden lg:block p-1 w-8 mr-auto"
          variant={"ghost"}
        >
          {isMenuOpen ? (
            <IoExitOutline size={25} />
          ) : (
            <IoExitOutline size={25} className="rotate-180" />
          )}
        </Button>

        {/* Mobile Menu Button */}
        <Button className="lg:hidden" variant={"ghost"} onClick={onOpen}>
          {isOpen ? (
            <IoExitOutline size={25} />
          ) : (
            <IoExitOutline size={25} className="rotate-180" />
          )}{" "}
        </Button>
        {isMenuOpen && (
          <div className="hidden lg:block space-y-6">
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
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <Button className="block w-full mx-auto py-2 px-4 hover:scale-110 transition-transform border border-neutral-200 mt-4">
              Search
            </Button>
          </div>
        )}
      </form>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <button
            className="block text-2xl p-2 absolute right-0 top-2 w-fit"
            onClick={onClose}
          >
            <GrClose />
          </button>
          <DrawerHeader borderBottomWidth="1px">Welcome</DrawerHeader>
          <DrawerBody className="">
            <h3 className="text-center text-xl font-semibold my-6">
              Filtering
            </h3>
            <form
              ref={formRef}
              className="w-full space-y-6 mt-20"
              onSubmit={onSubmitHandler}
            >
              {/* <button onClick={toggleSidebar} type="button">

          </button> */}
              {isOpen && (
                <>
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
                      <option value="createdAt_asc">Oldest</option>
                    </select>
                  </div>
                  <Button className="w-full mt-4">Search</Button>
                </>
              )}
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FlitteringMenu;
