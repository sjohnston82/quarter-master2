import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";

interface LocationContainerProps {
  location: string;
}

const LocationContainer = ({ location }: LocationContainerProps) => {
  const { householdId } = useContext(GlobalContext);

  const { data } = api.shoppingList.findByLocation.useQuery({
    householdId,
    location,
  });

  const toggleCompleteRoute = api.useContext().shoppingList;
  const toggleComplete = api.shoppingList.toggleComplete.useMutation({
    onSuccess: async () => {
      await toggleCompleteRoute.invalidate();
    },
  });
  return (
    <div>
      <h1
        className={`text-2xl underline ${
          data && data.length > 0 ? "font-semibold" : ""
        }`}
      >
        {location}
      </h1>
      {data &&
        data.map((item) => (
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
