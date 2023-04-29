import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import CreateNewItem from "../items/CreateNewItem";
import FoodItems from "../items/FoodItems";
import CreateStorageArea from "../storage-areas/CreateStorageArea";

const FoodItemsPage = () => {
  const [filterItemsCategory, setFilterItemsCategory] = useState("All")

  const handleChange = (event: SelectChangeEvent) => {
    setFilterItemsCategory(event.target.value)
  }
  return <div>
    <div className="">
      <CreateNewItem />
    </div>
    <div className="">
      <CreateStorageArea />
    </div>
    <div className="w-4/5 mt-6 mx-auto">

      <FormControl fullWidth>
        <InputLabel id="filterItemsBy">Filter By:</InputLabel>
        <Select labelId="filterItemsBy" id="filterItemsBy" value={filterItemsCategory} label="Filter By" onChange={handleChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Storage Area">Storage Area</MenuItem>
          <MenuItem value="Food Type">Food Type</MenuItem>
          <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div className="">
      <FoodItems />
    </div>
  </div>;
};

export default FoodItemsPage;
