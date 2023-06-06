import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '~/context/GlobalContextProvider';
import { api, type RouterOutputs } from '~/utils/api';

interface FilterByFoodTypeProps {
  filterItemsCategory: string;
  handleChange: (event: SelectChangeEvent) => void;
  foodTypeRef: React.RefObject<HTMLSelectElement>;
  selectedFoodCategory: { name: string; count: number; ids: string[] } | null;
  setSelectedFoodCategory: React.Dispatch<React.SetStateAction<{ name: string; count: number; ids: string[] } | null>>;
}
type FoodType = RouterOutputs["items"]["getFoodCategoryCount"][0];


const FilterByFoodType = ({filterItemsCategory, handleChange, foodTypeRef, selectedFoodCategory, setSelectedFoodCategory}: FilterByFoodTypeProps) =>{
  const { householdId } = useContext(GlobalContext)
  const [foodTypesList, setFoodTypesList] = useState<FoodType[]>();

  const getFoodTypesRoute = api.useContext().items;
  const getFoodTypes = api.items.getFoodCategoryCount.useQuery({
    householdId,
  });

  useEffect(() => {
    getFoodTypes.data && setFoodTypesList(getFoodTypes.data);
  }, [getFoodTypes.data]);

   const handleFoodCategoryChange = (
     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     setSelectedFoodCategory(
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
       JSON.parse(event.target.value)
     ) as unknown as FoodType;
   };

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
          className="shadow sm:w-4/5"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Storage Area">Storage Area</MenuItem>
          <MenuItem value="Food Type">Food Type</MenuItem>
          <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
        </Select>
      </FormControl>
      <TextField
        select
        label="Category"
        className="w-full shadow sm:w-4/5"
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
  );
}

export default FilterByFoodType