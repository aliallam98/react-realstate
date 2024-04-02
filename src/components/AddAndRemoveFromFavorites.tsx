import { FaHeart } from "react-icons/fa6";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AddAndRemoveFromFavorites = ({
  listingId,
  isAddedToFavorites,
}: {
  listingId: string;
  isAddedToFavorites: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    await axios
      .patch(`http://localhost:5000/api/listing/favorites/${listingId}`)
      .then((res) => {
        console.log(res);

        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      className="absolute top-4 right-4 z-10 hover:bg-white/10"
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
