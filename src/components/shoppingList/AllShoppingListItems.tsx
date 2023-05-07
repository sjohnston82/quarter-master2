import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { type RouterOutputs, api } from "~/utils/api";
import ShoppingListItem from "./ShoppingListItem";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface AllShoppingListItemsProps {
  data: Item[] | undefined;
  isLoading: boolean;
}

const AllShoppingListItems = ({
  data,
  isLoading,
}: AllShoppingListItemsProps) => {
  return (
    <div className="relative h-full w-full">
      <h1 className="w-full bg-slate-800 text-center text-xl text-slate-200">
        All Shopping List Items
      </h1>
      {isLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="font-semibold">Fetching items...</p>
            <LoadingSpinner size={40} />
          </div>
        </div>
      )}
      {data &&
        data.map((item) => <ShoppingListItem item={item} key={item.id} />)}
    </div>
  );
};

export default AllShoppingListItems;
