import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { RouterOutputs, api } from "~/utils/api";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface LocationContainerProps {
  location: string;
  items: Item[];
}

const LocationContainer = ({ location, items }: LocationContainerProps) => {
  const { householdId } = useContext(GlobalContext);



  const toggleCompleteRoute = api.useContext().shoppingList;
  const toggleComplete = api.shoppingList.toggleComplete.useMutation({
    onSuccess: async () => {
      await toggleCompleteRoute.invalidate();
    },
  });
  return (
    <div className="flex w-full flex-col items-center" role="dialog">
      <h1 className="text-xl underline">{location}</h1>
      {items &&
        items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleComplete.mutate({ id: item.id })}
          >
            <p className={`${item.completed ? "line-through" : ""}`}>
              {item.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default LocationContainer;
