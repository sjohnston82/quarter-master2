import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "../items/CreateNewItem";
import FoodItems from "../items/FoodItems";
import CreateStorageArea from "../storageAreas/CreateStorageArea";
import Banner from "../ui/Banner";
import { type RouterOutputs, api } from "~/utils/api";
import BarcodeScanner from "../barcode/BarcodeScanner";
import Searchbar from "../ui/Searchbar";

type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];

const FoodItemsPage = () => {
  const {
    householdId,
    showingBarcodeScanner,
    setShowingBarcodeScanner,
    barcode,
  } = useContext(GlobalContext);
  const [filterItemsCategory, setFilterItemsCategory] = useState("All");
  const [foodTypesList, setFoodTypesList] = useState<FoodType[]>();
  const [selectedIds, setSelectedIds] = useState<string[] | null>(null);

  const storageAreaRoute = api.useContext().storageAreas;
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const getFoodTypesRoute = api.useContext().items;
  const getFoodTypes = api.items.getFoodCategoryCount.useQuery({
    householdId,
  });

  useEffect(() => {
    getFoodTypes.data && setFoodTypesList(getFoodTypes.data);
  }, [getFoodTypes.data]);

  const foodTypeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (foodTypeRef.current) {
      setSelectedIds([foodTypeRef.current.value]);
    }
  }, [foodTypeRef]);

  const storageAreaRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFilterItemsCategory(event.target.value);
  };
  return (
    <div>
      <div className="mx-3 mt-3 flex justify-between">
        <div className="">
          <CreateStorageArea />
        </div>
        <div className="">
          <CreateNewItem />
        </div>
      </div>
      {showingBarcodeScanner ? (
        <div className="">
          <p className="">{barcode?.toString()}</p>
          <BarcodeScanner />
        </div>
      ) : (
        <div className="">
          <div className="">
            <Searchbar />
          </div>
          <div className="">
            {filterItemsCategory === "All" && (
              <div className="mx-auto mt-2 w-4/5">
                <FormControl fullWidth>
                  <InputLabel id="filterItemsBy">Filter By:</InputLabel>
                  <Select
                    labelId="filterItemsBy"
                    id="filterItemsBy"
                    value={filterItemsCategory}
                    label="Filter By"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Storage Area">Storage Area</MenuItem>
                    <MenuItem value="Food Type">Food Type</MenuItem>
                    <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            {filterItemsCategory === "Expiring Soon" && (
              <div className="mx-auto mt-2 w-4/5">
                <FormControl fullWidth>
                  <InputLabel id="filterItemsBy">Filter By:</InputLabel>
                  <Select
                    labelId="filterItemsBy"
                    id="filterItemsBy"
                    value={filterItemsCategory}
                    label="Filter By"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Storage Area">Storage Area</MenuItem>
                    <MenuItem value="Food Type">Food Type</MenuItem>
                    <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            {filterItemsCategory === "Storage Area" && (
              <div className="mt-2 flex w-full gap-1 px-2">
                <FormControl className="w-full">
                  <InputLabel id="filterItemsBy">Filter By:</InputLabel>
                  <Select
                    labelId="filterItemsBy"
                    id="filterItemsBy"
                    value={filterItemsCategory}
                    label="Filter By"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Storage Area">Storage Area</MenuItem>
                    <MenuItem value="Food Type">Food Type</MenuItem>
                    <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  select
                  label="Storage area"
                  className="w-full"
                  id="storageArea"
                  inputRef={storageAreaRef}
                  onChange={async () => await storageAreaRoute.invalidate()}
                  defaultValue=""
                >
                  {getAllStorageAreas.data &&
                    getAllStorageAreas.data.map((area) => (
                      <MenuItem key={area.id} value={area.id}>
                        {area.name}
                      </MenuItem>
                    ))}
                </TextField>
              </div>
            )}

            {filterItemsCategory === "Food Type" && (
              <div className="mt-2 flex w-full gap-1 px-2">
                <FormControl className="w-full">
                  <InputLabel id="filterItemsBy">Filter By:</InputLabel>
                  <Select
                    labelId="filterItemsBy"
                    id="filterItemsBy"
                    value={filterItemsCategory}
                    label="Filter By"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Storage Area">Storage Area</MenuItem>
                    <MenuItem value="Food Type">Food Type</MenuItem>
                    <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  select
                  label="Food Type"
                  className="w-full"
                  id="foodType"
                  inputRef={foodTypeRef}
                  onChange={async () => {
                    await getFoodTypesRoute.invalidate();
                    console.log("first level", foodTypeRef.current?.value);
                    // foodTypeRef.current !== null && setSelectedIds([foodTypeRef.current.value])
                  }}
                  defaultValue=""
                >
                  {foodTypesList !== null &&
                    foodTypesList?.map((type, i) => (
                      <MenuItem key={i} value={type.ids}>
                        {type.name}({type.count})
                      </MenuItem>
                    ))}
                </TextField>
              </div>
            )}
          </div>

          <div className="mt-2">
            {/* <Banner >All Food Items</Banner> */}
            <FoodItems
              sortType={filterItemsCategory}
              storageAreaId={
                storageAreaRef.current && storageAreaRef.current.value
              }
              foodTypeIds={foodTypeRef}
              foodTypesList={foodTypesList!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemsPage;
