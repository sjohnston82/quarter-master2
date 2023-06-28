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


const FilterByFoodType = ({filterItemsCategory, handleChange, foodTypeRef, setSelectedFoodCategory}: FilterByFoodTypeProps) =>{
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
    <div className="flex w-full gap-1 px-2 pb-2 sm:ml-4 sm:w-2/3 sm:px-0 sm:pb-0 md:gap-2 xl:w-1/2 ">
      <FormControl className="w-full">
        <InputLabel id="filterItemsBy">Filter By:</InputLabel>
        <Select
          labelId="filterItemsBy"
          id="filterItemsBy"
          value={filterItemsCategory}
          label="Filter By"
          onChange={handleChange}
          className="shadow "
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
        label="Category"
        className="w-full shadow "
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