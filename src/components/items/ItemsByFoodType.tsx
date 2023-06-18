import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { type RouterOutputs, api } from "~/utils/api";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";
import Banner from "../ui/Banner";
import ItemCard from "./ItemCard";
import { cn } from "~/utils/cn";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];
interface ItemsByFoodTypeProps {
  selectedFoodCategory: FoodType | null;
}

const ItemsByFoodType = ({ selectedFoodCategory }: ItemsByFoodTypeProps) => {
  const { debouncedValue, showingItemCards } = useContext(GlobalContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const idsToFind = selectedFoodCategory?.ids ?? [];
  const capitalizedName = selectedFoodCategory?.name
    ? selectedFoodCategory?.name.charAt(0).toUpperCase() +
      selectedFoodCategory?.name.slice(1)
    : "";

  const shouldEnableQuery = idsToFind.length > 0;

  const { data, isLoading, isError } = api.items.getItemsByFoodType.useQuery(
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
    <div className="">
      <Banner>{capitalizedName}</Banner>
      <div className="h-[calc(100vh-346px)] overflow-y-scroll sm:h-[calc(100vh-288px)] lg:h-[calc(100vh-270px)]">
        {isError && (
          <p className="pt-8 text-center text-lg">
            There was an error fetching items.
          </p>
        )}
        {idsToFind.length === 0 && (
          <p className="pt-8 text-center text-lg">
            Select a food category to retrieve items.
          </p>
        )}
        {shouldShowLoading && (
          <div className="relative mt-10 flex h-full flex-col items-center justify-center gap-2">
            <div className="absolute  -top-20 flex h-full w-full flex-col items-center justify-center ">
              <p className="text-lg font-semibold">Fetching items...</p>
              <LoadingSpinner size={60} />
            </div>
          </div>
        )}
        <div
          className={cn("m-2 flex flex-wrap justify-center gap-1", {
            "m-4 gap-4": showingItemCards,
          })}
        >
          {data &&
            data
              .filter((item) => {
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

export default ItemsByFoodType;
