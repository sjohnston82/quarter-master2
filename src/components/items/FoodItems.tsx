import React, { useContext } from "react";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "./CreateNewItem";
import Item from "./Item";

const FoodItems = () => {
  const { householdId } = useContext(GlobalContext);
  const { data } = api.items.getAllItems.useQuery({ householdId });
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const itemsSortedAlphabetically = data?.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  // console.log(data);
  return (
    <div>
      <div>{data?.length === 0 && <p>No Items</p>}</div>
      <div className="">
        <div className="flex justify-between">
          <p className="mx-7 font-semibold">Name</p>
          <p className="mx-7 font-semibold">Amount</p>
          <p className="mx-7 font-semibold">Location</p>
        </div>
        {itemsSortedAlphabetically?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
