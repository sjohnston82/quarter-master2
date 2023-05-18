import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { RouterOutputs, api } from "~/utils/api";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];

interface ItemsByFoodTypeProps {
  foodTypeIds: React.RefObject<HTMLSelectElement> | undefined | null;
  foodTypesList: FoodType[];
}

const ItemsByFoodType = ({ foodTypeIds, foodTypesList }: ItemsByFoodTypeProps) => {
  const { debouncedValue } = useContext(GlobalContext)

  const idsToFind = foodTypeIds?.current?.value as unknown as string[];
  const shouldEnableQuery =
    !!idsToFind && idsToFind !== null && idsToFind !== undefined;

  const { data, isLoading } =
    api.items.getItemsByFoodType.useQuery(
      {
        idsToFind,
      },
      {
        enabled: shouldEnableQuery,
      }
    );

  // if this is not used, the isLoading will always be true before a category is selected
  const shouldShowLoading = shouldEnableQuery && isLoading;

  return (
    <div>
      {!data && <p className="text-center">Select a food category to retrieve items.</p>}
      {shouldShowLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center gap-2">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="font-semibold ">Fetching items...</p>
            <LoadingSpinner size={60} />
          </div>
        </div>
      )}
      {data && data.filter((item) => {
              if (debouncedValue === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(debouncedValue) ||
                item.brand?.toLowerCase().includes(debouncedValue)
              ) {
                return item;
              }
            }).map((item) => <Item key={item.id} {...item} />)}
    </div>
  );
};

export default ItemsByFoodType;
