import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";

interface FilterByStorageAreaProps {
  storageAreaRef: React.RefObject<HTMLSelectElement>;
  filterItemsCategory: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const FilterByStorageArea = ({
  storageAreaRef,
  filterItemsCategory,
  handleChange,
}: FilterByStorageAreaProps) => {
  const { householdId } = useContext(GlobalContext);
  const storageAreaRoute = api.useContext().storageAreas;
  const getItemsByStorageAreaRoute = api.useContext().items;
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });
  return (
    <div className="mt-2 flex w-full gap-1 px-2 sm:mx-auto sm:w-4/5">
      <FormControl className="w-full">
        <InputLabel id="filterItemsBy">Filter By:</InputLabel>
        <Select
          labelId="filterItemsBy"
          id="filterItemsBy"
          value={filterItemsCategory}
          label="Filter By"
          onChange={handleChange}
          className="sm:w-4/5 "
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
        className="w-full sm:w-4/5"
        id="storageArea"
        inputRef={storageAreaRef}
        onChange={async () => {
          await storageAreaRoute.invalidate();
          await getItemsByStorageAreaRoute.invalidate();
        }}
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
  );
};

export default FilterByStorageArea;
