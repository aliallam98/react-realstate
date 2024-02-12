import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IListing } from "../types";

const useGetAllListings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState<IListing[]>([]);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/listing`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        setListings(res.data.results.listings)
        setTotalPages(res.data.results.totalPages)
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[listings]);
  return {isLoading,setIsLoading,listings , setListings ,totalPages,setTotalPages }
};

export default useGetAllListings;
