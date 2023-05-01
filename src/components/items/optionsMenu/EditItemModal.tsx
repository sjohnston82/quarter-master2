import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "~/components/ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api, type RouterOutputs } from "~/utils/api";
import { foodCategories } from "~/utils/foodTypes";

type Item = RouterOutputs["items"]["getAllItems"][0];

interface EditItemModalProps {
  showingEditItemModal: boolean;
  setShowingEditItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: Item;
}

interface EditItemInputProps {
  name: string;
  brand: string;
  expirationDate: string;
  storageAreaId: string;
  foodCategories: string[];
  flavor: string;
  storageAreaName: string;
}
const EditItemModal = ({
  showingEditItemModal,
  setShowingEditItemModal,
  item,
}: EditItemModalProps) => {
  const { register, handleSubmit, control } = useForm<EditItemInputProps>({
    defaultValues: {
      name: item.name,
      brand: item.brand ?? "",
      flavor: item.flavor ?? "",
      storageAreaName: item.storageAreaName ?? "",
      foodCategories: item.foodCategories.map((foodCategory) => foodCategory),
    },
  });
  const { householdId } = useContext(GlobalContext);

  const editItemRoute = api.useContext().items;

  const editItem = api.items.editItem.useMutation({
    onSuccess: async () => {
      toast.success("Item edited successfully!");
      await editItemRoute.invalidate();
    },
  });

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const onSubmit = (data: EditItemInputProps) => {
    const mutationData = {
      name: data.name,
      brand: data.brand,
      flavor: data.flavor,
      expirationDate: new Date(data.expirationDate),
      storageAreaId: data.storageAreaId,
      foodCategories: data.foodCategories,
      id: item.id,
    };
    editItem.mutate(mutationData);
    setShowingEditItemModal(false);
  };

  return (
    <Modal
      isOpen={showingEditItemModal}
      title="Edit Item Info"
      onClose={() => setShowingEditItemModal(false)}
    >
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField
          variant="outlined"
          {...register("name")}
          required
          fullWidth
          name="name"
          label="Item Name"
          type="text"
          id="name"
        />
        <div className="flex gap-1">
          <div className="flex flex-col">
            <TextField
              variant="outlined"
              {...register("brand")}
              name="brand"
              label="Brand"
              type="text"
              id="brand"
            />
          </div>
          <TextField
            variant="outlined"
            {...register("flavor")}
            name="flavor"
            label="Flavor"
            type="text"
            id="flavor"
          />
        </div>
        <LocalizationProvider
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          dateAdapter={AdapterDayjs}
        >
          <Controller
            name="expirationDate"
            control={control}
            render={({ field: { ref, onChange } }) => (
              <DatePicker
                inputRef={ref}
                className="mb-1 mt-2 w-full"
                disablePast
                label="Expiration Date"
                onChange={(event) => {
                  onChange(event);
                }}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          className="w-full"
          required
          select
          id="storageArea"
          label="Storage Area"
          {...register("storageAreaId")}
        >
          {getStorageAreas.data?.map((area) => (
            <MenuItem key={area.id} value={area.id}>
              {area.name}
            </MenuItem>
          ))}
        </TextField>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              filterSelectedOptions
              options={foodCategories}
              // value={item.foodCategories}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Food categories"
                  variant="outlined"
                />
              )}
              onChange={(_, data) => {
                onChange(data);
                return data;
              }}
              defaultValue={item.foodCategories.map(
                (foodCategory) => foodCategory
              )}
            />
          )}
          name="foodCategories"
          control={control}
        />
        <button type="submit">Edit Item</button>
      </form>
    </Modal>
  );
};

export default EditItemModal;
