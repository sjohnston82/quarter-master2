import React, { useContext } from "react";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "./CreateNewItem";
import Item from "./Item";
import Banner from "../ui/Banner";
import ItemsByStorageArea from "./ItemsByStorageArea";

interface FoodItemsProps {
  sortType: string;
  storageAreaName?: string;
}

const FoodItems = ({ sortType, storageAreaName }: FoodItemsProps) => {
  const { householdId } = useContext(GlobalContext);
  const { data } = api.items.getAllItems.useQuery({ householdId });
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const itemsSortedAlphabetically = data?.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const itemsExpiringSoon = data?.filter((item) => item.daysUntilExpiry! < 8);
  console.log("exp soon", itemsExpiringSoon);
  // const itemsSortedByExpiringSoon = data?.sort((a, b) =>
  //   a.)
  return (
    <div className="mt-2">
      <div>{data?.length === 0 && <p>No Items</p>}</div>
      {sortType === "All" && (
        <div className="flex flex-col gap-1">
          <Banner>All Food Items</Banner>
          {itemsSortedAlphabetically?.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      )}
      {/* {sortType === "Storage Area" && (
        <ItemsByStorageArea 
      )} */}
    </div>
  );
};

export default FoodItems;
