/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Item from "./Item";
import Banner from "../ui/Banner";
import ItemsByStorageArea from "./ItemsByStorageArea";
import ItemsByFoodType from "./ItemsByFoodType";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemsByExpiringSoon from "./ItemsByExpiringSoon";
import LoadingSpinner from "../ui/LoadingSpinner";
import ItemCard from "./ItemCard";
import { cn } from "~/utils/cn";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];
interface FoodItemsProps {
  sortType: string;
  storageAreaId?: string | null;
  selectedFoodCategory: FoodType | null;
}

const FoodItems = ({
  sortType,
  storageAreaId,
  selectedFoodCategory,
}: FoodItemsProps) => {
  const {
    householdId,
    debouncedValue,
    searchingForProduct,
    storageAreas,
    setLimit,
    showingItemCards,
    windowSize,
    limit,
  } = useContext(GlobalContext);

  useEffect(() => {
    function setLimitSize() {
      if (windowSize.innerWidth < 927 || !showingItemCards) {
        setLimit(10);
      }
      if (windowSize.innerWidth > 927 && showingItemCards) {
        setLimit(12);
      }
      if (windowSize.innerWidth > 1231 && showingItemCards) {
        setLimit(16);
      }

      if (windowSize.innerWidth > 1535 && showingItemCards) {
        setLimit(20);
      }
    }
    setLimitSize();
  }, [setLimit, showingItemCards, windowSize.innerWidth]);

  const getAllItemsInfinite = api.items.getAllItemsInfinite.useInfiniteQuery(
    { householdId, limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="mt-2 min-h-[calc(100vh-312px)] flex-1 bg-slate-400 sm:flex sm:flex-col ">
      {searchingForProduct ? (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-center text-lg font-semibold">
            Searching for product info...
          </p>
          <LoadingSpinner size={60} />
        </div>
      ) : sortType === "All" ? (
        <div className="flex h-full flex-col">
          {getAllItemsInfinite.isError && (
            <p className="pt-8 text-center text-lg">
              There was a problem loading items.
            </p>
          )}
          <Banner>All Food Items</Banner>
          {getAllItemsInfinite.isLoading && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-lg font-semibold">
                Loading items...
              </p>
              <LoadingSpinner size={60} />
            </div>
          )}
          {storageAreas.length === 0 &&
            !getAllItemsInfinite.isInitialLoading && (
              <p className="px-2 text-center text-lg font-semibold">
                You must add a storage area before you can add items!
              </p>
            )}
          {getAllItemsInfinite.data?.pages[0] &&
          getAllItemsInfinite.data?.pages[0].items.length === 0 &&
          storageAreas.length > 0 ? (
            <p className="text-center text-lg font-semibold">
              There are not currently any items added.
            </p>
          ) : (
            <InfiniteScroll
              dataLength={
                getAllItemsInfinite.data?.pages.flatMap((page) => page.items)
                  .length ?? 0
              }
              next={getAllItemsInfinite.fetchNextPage}
              hasMore={!!getAllItemsInfinite.hasNextPage}
              loader={
                <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
                  Loading...
                </h4>
              }
              endMessage={
                getAllItemsInfinite.data?.pages[0]?.items.length !== 0 &&
                !getAllItemsInfinite.isLoading && (
                  <p style={{ textAlign: "center" }}>
                    <b>End of items.</b>
                  </p>
                )
              }
            >
              <div className={cn("m-2 flex flex-wrap justify-center gap-1", {
                "gap-4 m-4": showingItemCards
              })}>
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
                    .map((item) => showingItemCards ? <ItemCard key={item.id} {...item} /> : <Item key={item.id} {...item} /> )}
              </div>
            </InfiniteScroll>
          )}
        </div>
      ) : sortType === "Storage Area" ? (
        <ItemsByStorageArea storageAreaId={storageAreaId!} />
      ) : sortType === "Food Type" ? (
        <ItemsByFoodType selectedFoodCategory={selectedFoodCategory} />
      ) : (
        sortType === "Expiring Soon" && (
          <div className="flex flex-col gap-1">
            <ItemsByExpiringSoon />
          </div>
        )
      )}
    </div>
  );
};

export default FoodItems;
