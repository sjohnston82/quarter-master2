import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react'

interface FilterByExpiringSoonProps {
  filterItemsCategory: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const FilterByExpiringSoon = ({ filterItemsCategory, handleChange}: FilterByExpiringSoonProps) => {
  return (
    <div className="mx-auto mt-2 w-4/5">
      <FormControl  fullWidth>
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