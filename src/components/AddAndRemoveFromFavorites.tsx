import { FaHeart } from "react-icons/fa6";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const AddAndRemoveFromFavorites = ({
  listingId,
  isAddedToFavorites,
  setIsAddedToFavoritesState,
  setRefetchFavorites
}: {
  listingId: string;
  isAddedToFavorites: boolean;
  setIsAddedToFavoritesState:Dispatch<SetStateAction<boolean>>
  setRefetchFavorites?:Dispatch<SetStateAction<boolean>>
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const onClickHandler = async () => {
    if (!currentUser) {
      toast.error("Login first to add to favorite");
    } else {
      await axios
        .patch(`http://localhost:5000/api/listing/favorites/${listingId}`)
        .then((res) => {
          toast.success(res.data.message);
          setIsAddedToFavoritesState((prev)=> !prev)
          setRefetchFavorites?.((prev)=>!prev)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Button
      className="absolute top-4 right-4 z-50  hover:bg-white/10"
      variant={"ghost"}
      onClick={onClickHandler}
      disabled={isLoading}
      type="button"
    >
      <FaHeart
        className={cn(isAddedToFavorites ? "text-red-600" : "text-white")}
        size={20}
      />
    </Button>
  );
};

export default AddAndRemoveFromFavorites;
