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
import HorizontalAddItemMenu from "../items/AddItemMenu";

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
  const [selectedFoodCategory, setSelectedFoodCategory] = useState<
    { name: string; count: number; ids: string[] } | null 
  >(null);

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

  const storageAreaRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFilterItemsCategory(event.target.value);
  };

  const handleFoodCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedFoodCategory(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      JSON.parse(event.target.value)
    ) as unknown as FoodType;
  };
  return (
    <div className="bg-snow">
      {showingBarcodeScanner ? (
        <div className="">
          {/* <p className="">{barcode?.toString()}</p> */}
          <BarcodeScanner />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full ">
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
                    className="bg-slate-50 text-woodsmoke"
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
                    className="shadow"
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
                  className="w-full shadow"
                  id="foodType"
                  inputRef={foodTypeRef}
                  onChange={async (e) => {
                    await getFoodTypesRoute.invalidate();
                    handleFoodCategoryChange(e);
                  }}
                  defaultValue=""
                >
                  {foodTypesList !== null &&
                    foodTypesList
                      ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((type) => (
                        <MenuItem key={type.name} value={JSON.stringify(type)}>
                          {type.name}({type.count})
                        </MenuItem>
                      ))}
                </TextField>
              </div>
            )}
          </div>

          <div className="mt-2">
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
