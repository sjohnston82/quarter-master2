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
  const { data } = api.items.getAllItems.useQuery({ householdId });
  const getAllStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });
  return (
    <div className="flex w-full gap-1 px-2 pb-2 sm:ml-4 sm:w-2/3 sm:px-0 sm:pb-0 md:gap-2 xl:w-1/2 ">
      <FormControl className="w-full">
        <InputLabel id="filterItemsBy">Filter By:</InputLabel>
        <Select
          labelId="filterItemsBy"
          id="filterItemsBy"
          value={filterItemsCategory}
          label="Filter By"
          onChange={handleChange}
          className="w-full"
        >
          <MenuItem value="All">
            <span className="font-semibold">All Items</span>
          </MenuItem>
          <MenuItem value="Storage Area">
            <span className="font-semibold">Storage Area</span>
          </MenuItem>
          <MenuItem value="Food Type">
            <span className="font-semibold">Food Type</span>
          </MenuItem>
          <MenuItem value="Expiring Soon">
            <span className="font-semibold">Expiring Soon/Expired</span>
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        select
        label="Storage area"
        className="w-full "
        id="storageArea"
        inputRef={storageAreaRef}
        onChange={async () => {
          await storageAreaRoute.invalidate();
        }}
        defaultValue=""
        disabled={data?.length === 0}
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
