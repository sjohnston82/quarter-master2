/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Item from "./Item";
import Banner from "../ui/Banner";
import ItemsByStorageArea from "./ItemsByStorageArea";
import ItemsByFoodType from "./ItemsByFoodType";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];

interface FoodItemsProps {
  sortType: string;
  storageAreaId?: string | null;
  foodTypeIds?: React.RefObject<HTMLSelectElement> | null;
  foodTypesList: FoodType[];
}

const FoodItems = ({
  sortType,
  storageAreaId,
  foodTypeIds,
  foodTypesList
}: FoodItemsProps) => {
  const { householdId } = useContext(GlobalContext);
  const { data } = api.items.getAllItems.useQuery({ householdId });

  const itemsSortedAlphabetically = data?.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const itemsExpiringSoon = data?.filter((item) => item.daysUntilExpiry !== null && item.daysUntilExpiry < 8);
  const itemsSortedByExpiringSoon = itemsExpiringSoon?.sort((a, b) =>
    a.daysUntilExpiry! > b.daysUntilExpiry! ? 1 : -1)
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
      {sortType === "Food Type" && (
        <ItemsByFoodType
          foodTypeIds={foodTypeIds}
          foodTypesList={foodTypesList}
        />
      )}
      {sortType === "Expiring Soon" && (
        <div className="flex flex-col gap-1">
          <Banner>Expiring Soon</Banner>
          {itemsSortedByExpiringSoon?.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodItems;
