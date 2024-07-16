import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IListing } from "../types";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const useGetAllFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<IListing[]>([]);
  const [refetchFavorites,setRefetchFavorites] = useState(false);
  console.log(refetchFavorites);
  
  const {currentUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if(currentUser){
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
    }
  }, [currentUser,refetchFavorites]);
  return {
    isLoading,
    favorites,
    refetchFavorites,
    setRefetchFavorites
  };
};

export default useGetAllFavorites;
