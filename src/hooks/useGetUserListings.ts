import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IListing } from "../types";

const useGetAllListings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState<IListing[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/user`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        setListings(res.data.results);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listings]);
  return {
    isLoading,
    listings,
  };
};

export default useGetAllListings;
