import React, { useContext } from "react";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";
import ItemCard from "./ItemCard";
import { cn } from "~/utils/cn";

const ItemsByExpiringSoon = () => {
  const { householdId, debouncedValue, showingItemCards } =
    useContext(GlobalContext);

  const getItemsByExpiryDate = api.items.getExpiredItems.useQuery({
    householdId,
  });
  console.log(getItemsByExpiryDate.data);
  return (
    <div className="">
      <Banner>Expiring Soon</Banner>
      <div className="h-[calc(100vh-346px)]  overflow-y-scroll sm:h-[calc(100vh-288px)] lg:h-[calc(100vh-270px)]">
        {getItemsByExpiryDate.isError && (
          <p className="pt-8 text-center text-lg">
            There was a problem fetching items.
          </p>
        )}
        {getItemsByExpiryDate.isLoading && (
          <div className="relative mt-10 flex h-full flex-col items-center justify-center gap-2">
            <div className="absolute  -top-20 flex h-full w-full flex-col items-center justify-center ">
              <p className="text-lg font-semibold">Fetching items...</p>
              <LoadingSpinner size={60} />
            </div>
          </div>
        )}
        {getItemsByExpiryDate.data?.length === 0 &&
          !getItemsByExpiryDate.isLoading && (
            <p className="px-2 pt-8 text-center text-lg">
              There are no items that are expired or about to expire.
            </p>
          )}
        <div
          className={cn("m-2 flex flex-wrap justify-center gap-1", {
            "m-4 gap-4": showingItemCards,
          })}
        >
          {getItemsByExpiryDate.isSuccess &&
            getItemsByExpiryDate.data
              ?.filter((item) => {
                if (debouncedValue === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(debouncedValue) ||
                  item.brand?.toLowerCase().includes(debouncedValue)
                ) {
                  return item;
                }
              })
              .map((item) =>
                showingItemCards ? (
                  <ItemCard key={item.id} {...item} />
                ) : (
                  <Item key={item.id} {...item} />
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default ItemsByExpiringSoon;
