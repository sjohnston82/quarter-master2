import { type SelectChangeEvent } from "@mui/material";
import { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import FoodItems from "../items/FoodItems";
import BarcodeScanner from "../barcode/BarcodeScanner";
import Searchbar from "../ui/Searchbar";
import FilterByAll from "../items/filters/FilterByAll";
import FilterByExpiringSoon from "../items/filters/FilterByExpiringSoon";
import FilterByStorageArea from "../items/filters/FilterByStorageArea";
import FilterByFoodType from "../items/filters/FilterByFoodType";

const FoodItemsPage = () => {
  const { showingBarcodeScanner, setSelectedStorageArea } =
    useContext(GlobalContext);
  const [filterItemsCategory, setFilterItemsCategory] = useState("All");
  const [selectedFoodCategory, setSelectedFoodCategory] = useState<{
    name: string;
    count: number;
    ids: string[];
  } | null>(null);

  const foodTypeRef = useRef<HTMLSelectElement>(null);
  const storageAreaRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFilterItemsCategory(event.target.value);
  };

  useEffect(() => {
    storageAreaRef.current?.value &&
      setSelectedStorageArea(storageAreaRef.current.value);
    console.log(storageAreaRef.current?.value);
  }, [setSelectedStorageArea]);

  return (
    <div className=" flex-1 bg-snow text-woodsmoke">
      {showingBarcodeScanner ? (
        <div className="">
          <BarcodeScanner />
        </div>
      ) : (
        <div className=" w-full">
          <div className="w-full ">
            <Searchbar />
          </div>
          <div className="-mt-2">
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

          <div className="mt-2 flex h-[calc(100vh-304px)]  flex-col overflow-y-scroll lg:h-[calc(100vh-248px)]">
            <FoodItems
              sortType={filterItemsCategory}
              storageAreaId={
                storageAreaRef.current && storageAreaRef.current.value
              }
              selectedFoodCategory={selectedFoodCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemsPage;
