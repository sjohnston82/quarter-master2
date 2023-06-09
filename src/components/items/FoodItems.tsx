/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect, useState } from "react";
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
    showingItemCards,
  } = useContext(GlobalContext);


  

  const getAllItemsInfinite = api.items.getAllItemsInfinite.useInfiniteQuery(
    { householdId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="flex-1 rounded-b-xl bg-slate-400 lg:rounded-b-none lg:rounded-bl-xl  ">
      {searchingForProduct ? (
        <div className="flex h-[calc(100vh-298px)] w-full flex-col items-center justify-center sm:h-[calc(100vh-240px)] lg:h-[calc(100vh-222px)]">
          <p className="text-center text-lg font-semibold">
            Searching for product info...
          </p>
          <LoadingSpinner size={60} />
        </div>
      ) : sortType === "All" ? (
        <div className="">
          <Banner>All Food Items</Banner>
          <div
            className="flex h-[calc(100vh-346px)] flex-col overflow-y-scroll sm:h-[calc(100vh-288px)] lg:h-[calc(100vh-270px)]"
            id="scrollable-target"
          >
            {getAllItemsInfinite.isError && (
              <p className="pt-8 text-center text-lg">
                There was a problem loading items.
              </p>
            )}
            {getAllItemsInfinite.isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
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
                  !getAllItemsInfinite.isLoading &&
                  !getAllItemsInfinite.isError && (
                    <p style={{ textAlign: "center" }}>
                      <b>End of items.</b>
                    </p>
                  )
                }
                scrollableTarget="scrollable-target"
              >
                <div
                  className={cn(
                    "m-2 flex  flex-wrap justify-center gap-1 3xl:mx-auto ",
                    {
                      "m-4 gap-4": showingItemCards,
                    }
                  )}
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
                      .map((item) =>
                        showingItemCards ? (
                          <ItemCard key={item.id} {...item} />
                        ) : (
                          <Item key={item.id} {...item} />
                        )
                      )}
                </div>
              </InfiniteScroll>
            )}
          </div>
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
