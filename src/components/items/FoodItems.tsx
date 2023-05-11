import React, { MutableRefObject, useContext } from "react";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "./CreateNewItem";
import Item from "./Item";
import Banner from "../ui/Banner";
import ItemsByStorageArea from "./ItemsByStorageArea";
import ItemsByFoodType from "./ItemsByFoodType";

interface FoodItemsProps {
  sortType: string;
  storageAreaId?: string | null;
  foodTypeIds?: React.RefObject<HTMLSelectElement> | null
}

const FoodItems = ({
  sortType,
  storageAreaId,
  foodTypeIds,
}: FoodItemsProps) => {
  const { householdId } = useContext(GlobalContext);
  const { data } = api.items.getAllItems.useQuery({ householdId });

  const itemsSortedAlphabetically = data?.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const itemsExpiringSoon = data?.filter((item) => item.daysUntilExpiry! < 8);
  // console.log("exp soon", itemsExpiringSoon);
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
      {sortType === "Storage Area" && (
        <ItemsByStorageArea storageAreaId={storageAreaId!} />
      )}
      {sortType === "Food Type" && <ItemsByFoodType foodTypeIds={foodTypeIds} />}
    </div>
  );
};

export default FoodItems;
