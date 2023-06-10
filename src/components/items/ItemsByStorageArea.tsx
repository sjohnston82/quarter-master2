import React, { useContext } from "react";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";
import { GlobalContext } from "~/context/GlobalContextProvider";
import ItemCard from "./ItemCard";
import { cn } from "~/utils/cn";

interface ItemsByStorageAreaProps {
  storageAreaId: string;
}

const ItemsByStorageArea = ({ storageAreaId }: ItemsByStorageAreaProps) => {
  const { debouncedValue, showingItemCards, householdId } =
    useContext(GlobalContext);
  const shouldEnableQuery =
    !!storageAreaId && storageAreaId !== undefined && storageAreaId !== null;

  const getCurrentStorageArea = api.storageAreas.getStorageAreaById.useQuery(
    {
      storageAreaId,
    },
    {
      enabled: !!storageAreaId,
    }
  );
  const { data, isLoading, isError } = api.items.getItemsByStorageArea.useQuery(
    {
      storageAreaId,
    },
    {
      enabled: !!storageAreaId,
    }
  );
  const { data: allItems } = api.items.getAllItems.useQuery({ householdId });

  const shouldShowLoading = shouldEnableQuery && isLoading;
  return (
    <div className="min-h-[calc(100vh-312px)]">
      <Banner>
        {getCurrentStorageArea.data && getCurrentStorageArea.data.name}
      </Banner>
      {isError && (
        <p className="pt-8 text-center text-lg">
          There was a problem fetching storage area information.
        </p>
      )}
      {shouldShowLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center gap-2">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="text-lg font-semibold">Fetching items...</p>
            <LoadingSpinner size={60} />
          </div>
        </div>
      )}
      {allItems?.length === 0 ? (
        <p className="mx-2 mt-5 text-center text-lg">
          There are no items currently saved in this household.
        </p>
      ) : !data ? (
        <p className="pt-8 text-center text-lg">
          Select a storage area to see its items.
        </p>
      ) : data.length === 0 ? (
        <p className="pt-8 text-center text-lg">
          There are no items stored in this storage area.
        </p>
      ) : (
        <div
          className={cn("m-2 flex flex-wrap justify-center gap-1", {
            "m-4 gap-4": showingItemCards,
          })}
        >
          {data
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
      )}
    </div>
  );
};

export default ItemsByStorageArea;
