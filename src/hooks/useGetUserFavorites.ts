import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IListing } from "../types";

const useGetAllFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<IListing[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/user/favorites`)
      .then((res) => {
        console.log(res);

        setFavorites(res.data.results);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return {
    isLoading,
    favorites,
  };
};

export default useGetAllFavorites;
