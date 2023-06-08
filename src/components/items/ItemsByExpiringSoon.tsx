import React, { useContext } from "react";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";

const ItemsByExpiringSoon = () => {
  const { householdId, debouncedValue } = useContext(GlobalContext);

  const getItemsByExpiryDate = api.items.getExpiredItems.useQuery({
    householdId,
  });
  return (
    <div className="flex min-h-[calc(100vh-312px)] flex-col gap-1">
      <Banner>Expiring Soon</Banner>
      {getItemsByExpiryDate.isError && (
        <p className="pt-8 text-center text-lg">
          There was a problem fetching items.
        </p>
      )}
      {getItemsByExpiryDate.isLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center gap-2">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="text-lg font-semibold">Fetching items...</p>
            <LoadingSpinner size={60} />
          </div>
        </div>
      )}
      {!getItemsByExpiryDate.data && !getItemsByExpiryDate.isLoading && (
        <p className="pt-8 text-center text-lg">
          There are no items that are expired or about to expire.
        </p>
      )}
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
          .map((item) => <Item key={item.id} {...item} />)}
    </div>
  );
};

export default ItemsByExpiringSoon;
