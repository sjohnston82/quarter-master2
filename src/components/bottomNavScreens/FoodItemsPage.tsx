import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "../items/CreateNewItem";
import FoodItems from "../items/FoodItems";
import CreateStorageArea from "../storageAreas/CreateStorageArea";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";

const FoodItemsPage = () => {
  const { householdId } = useContext(GlobalContext);
  const [filterItemsCategory, setFilterItemsCategory] = useState("All");

  const storageAreaRoute = api.useContext().storageAreas;
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

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
      {filterItemsCategory !== "Storage Area" ? (
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
      ) : (
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
      <div className="mt-2">
        {/* <Banner >All Food Items</Banner> */}
        <FoodItems
          sortType={filterItemsCategory}
          storageAreaId={
            storageAreaRef.current && storageAreaRef.current.value
          }
        />
      </div>
    </div>
  );
};

export default FoodItemsPage;
