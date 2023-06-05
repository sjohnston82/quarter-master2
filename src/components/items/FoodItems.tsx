/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Item from "./Item";
import Banner from "../ui/Banner";
import ItemsByStorageArea from "./ItemsByStorageArea";
import ItemsByFoodType from "./ItemsByFoodType";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemsByExpiringSoon from "./ItemsByExpiringSoon";
import LoadingSpinner from "../ui/LoadingSpinner";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];
interface FoodItemsProps {
  sortType: string;
  storageAreaId?: string | null;
  selectedFoodCategory: FoodType | null;
}

const FoodItems = ({
  sortType,
  storageAreaId,
  selectedFoodCategory
}: FoodItemsProps) => {
  const { householdId, debouncedValue, searchingForProduct } = useContext(GlobalContext);
  const getAllItemsInfinite = api.items.getAllItemsInfinite.useInfiniteQuery(
    { householdId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="mt-2 sm:bg-schooner sm:flex sm:flex-col">
      {searchingForProduct ? (<div className="flex flex-col"><p className="text-center">Searching for product info...</p><LoadingSpinner size={60} /></div>) : 
      sortType === "All" ? (
        <div className="flex flex-col ">
          <Banner>All Food Items</Banner>
          {getAllItemsInfinite.isLoading && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-lg">Loading items...</p>
              <LoadingSpinner size={60} />
            </div>
          )}
          <InfiniteScroll
            dataLength={
              getAllItemsInfinite.data?.pages.flatMap((page) => page.items)
                .length ?? 0
            }
            next={getAllItemsInfinite.fetchNextPage}
            hasMore={!!getAllItemsInfinite.hasNextPage}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            endMessage={
              !getAllItemsInfinite.isLoading && (
                <p style={{ textAlign: "center" }}>
                  <b>End of items.</b>
                </p>
              )
            }
          >
            {getAllItemsInfinite.isSuccess &&
              getAllItemsInfinite.data?.pages
                .flatMap((page) => page.items)
                .filter((item) => {
                  if (debouncedValue === "") {
                    return item;
                  } else if (
                    item.name
                      .toLowerCase()
                      .includes(debouncedValue.toLowerCase()) ||
                    item.brand
                      ?.toLowerCase()
                      .includes(debouncedValue.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => <Item key={item.id} {...item} />)}
          </InfiniteScroll>
        </div>
      ) :
      sortType === "Storage Area" ? (
        <ItemsByStorageArea storageAreaId={storageAreaId!} />
      ) :
      sortType === "Food Type" ? (
        <ItemsByFoodType selectedFoodCategory={selectedFoodCategory}/>
      ) :
      sortType === "Expiring Soon" && (
        <div className="flex flex-col gap-1">
          <ItemsByExpiringSoon />
        </div>
      )}
    </div>
  );
};

export default FoodItems;
