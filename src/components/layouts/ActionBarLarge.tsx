import React, { useEffect, useRef, useState } from "react";
import { type SelectChangeEvent } from "@mui/material";
import FilterByAll from "../items/filters/FilterByAll";
import FilterByExpiringSoon from "../items/filters/FilterByExpiringSoon";
import FilterByStorageArea from "../items/filters/FilterByStorageArea";
import FilterByFoodType from "../items/filters/FilterByFoodType";
import { type RouterOutputs } from "~/utils/api";
import AddItemMenu from "../items/AddItemMenu";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];

interface ActionBarLargeProps {
  filterItemsCategory: string;
  setFilterItemsCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedFoodCategory: FoodType | null;
  setSelectedFoodCategory: React.Dispatch<
    React.SetStateAction<FoodType | null>
  >;
  storageAreaRef: React.RefObject<HTMLSelectElement>;
  foodTypeRef: React.RefObject<HTMLSelectElement>;
  handleChange: (event: SelectChangeEvent) => void;
}

const ActionBarLarge = ({
  filterItemsCategory,
  setFilterItemsCategory,
  selectedFoodCategory,
  storageAreaRef,
  setSelectedFoodCategory,
  handleChange,
  foodTypeRef,
}: ActionBarLargeProps) => {
  // const foodTypeRef = useRef<HTMLSelectElement>(null);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div className="flex items-center border-b-2 border-woodsmoke ">
      <div className="flex w-4/5">
        {filterItemsCategory === "All" && (
          <FilterByAll
            filterItemsCategory={filterItemsCategory}
            handleChange={handleChange}
          />
        )}
        {filterItemsCategory === "Expiring Soon" && (
          <FilterByExpiringSoon
            filterItemsCategory={filterItemsCategory}
            handleChange={handleChange}
          />
        )}
        {filterItemsCategory === "Storage Area" && (
          <FilterByStorageArea
            storageAreaRef={storageAreaRef}
            filterItemsCategory={filterItemsCategory}
            handleChange={handleChange}
          />
        )}

        {filterItemsCategory === "Food Type" && (
          <FilterByFoodType
            filterItemsCategory={filterItemsCategory}
            handleChange={handleChange}
            foodTypeRef={foodTypeRef}
            selectedFoodCategory={selectedFoodCategory}
            setSelectedFoodCategory={setSelectedFoodCategory}
          />
        )}
      </div>

      <AddItemMenu />
    </div>
  );
};

export default ActionBarLarge;
