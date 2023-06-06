import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react'

interface FilterByAllProps {
  filterItemsCategory: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const FilterByAll = ({filterItemsCategory, handleChange}: FilterByAllProps) => {
  return (
    <div className="mx-auto mt-2 w-4/5 sm:w-1/2">
      <FormControl fullWidth>
        <InputLabel id="filterItemsBy">Filter By:</InputLabel>
        <Select
          labelId="filterItemsBy"
          id="filterItemsBy"
          value={filterItemsCategory}
          label="Filter By"
          onChange={handleChange}
          className="bg-slate-50 text-woodsmoke shadow"
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

export default FilterByAll