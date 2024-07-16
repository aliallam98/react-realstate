/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@/components/Card";
import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import useGetAllFavorites from "@/hooks/useGetUserFavorites";
import { useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, isLoading,setRefetchFavorites } = useGetAllFavorites();
  

  

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="py-10">
      <div className="container grid grow justify-center grid-cols-[repeat(auto-fill,minmax(270px,300px))] gap-4 ">
        {favorites.length > 0 &&
          favorites.map((ele) => {
            const isAddedToFavorites = favorites
              ? !!favorites?.find((ele) => ele._id === ele._id!)
              : false;
            return (
              <Card
                data={ele}
                key={ele._id}
                isAddedToFavorites={isAddedToFavorites}
                setRefetchFavorites = {setRefetchFavorites}
              />
            );
          })}
      </div>
      {!favorites.length && (
        <div className="w-full flex flex-col justify-center items-center py-10 gap-10">
          <h2>There No Listing In Your Favorites </h2>
          <Button
            className="rounded-3xl bg-mainColor hover:bg-mainColor/90"
            asChild
          >
            <Link to={"/listings"}>Discover Listings</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
