import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react'

interface FilterByExpiringSoonProps {
  filterItemsCategory: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const FilterByExpiringSoon = ({ filterItemsCategory, handleChange}: FilterByExpiringSoonProps) => {
  return (
    <div className="mx-auto w-4/5 pb-2 sm:mx-0 sm:ml-10 sm:ml-4 sm:w-2/3 sm:justify-start sm:pb-0 md:w-1/2  lg:w-1/2 xl:w-1/3  2xl:w-1/4 3xl:w-1/4">
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
  );
}

export default FilterByExpiringSoon