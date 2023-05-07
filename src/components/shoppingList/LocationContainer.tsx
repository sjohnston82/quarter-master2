import React, { useContext, useEffect } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { type RouterOutputs, api } from "~/utils/api";
import ShoppingListItem from "./ShoppingListItem";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface LocationContainerProps {
  location: string;
  items: Item[];
}

const LocationContainer = ({ location, items }: LocationContainerProps) => {
  const { householdId } = useContext(GlobalContext);

  // useEffect(() => {
  //   items.forEach((item) => {
  //     if (item.completed) {
  //       setIdsToDelete((prev) => [...prev, item.id]);
  //     }
  //   });
  // }, [setIdsToDelete]);

  // const toggleCompleteRoute = api.useContext().shoppingList;
  // const toggleComplete = api.shoppingList.toggleComplete.useMutation({
  //   onSuccess: async () => {
  //     await toggleCompleteRoute.invalidate();
  //   },
  // });

  return (
    <div className="flex w-full flex-col items-center" role="dialog">
      <h1 className="w-full bg-slate-800 text-center text-xl text-slate-200">
        {location}
      </h1>
      {items &&
        items.map((item) => <ShoppingListItem item={item} key={item.id} />)}
    </div>
  );
};

export default LocationContainer;
