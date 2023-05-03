import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import Modal from "~/components/ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api, type RouterOutputs } from "~/utils/api";
import { foodCategories } from "~/utils/helperLists";

type Item = RouterOutputs["items"]["getAllItems"][0];

interface EditItemModalProps {
  showingEditItemModal: boolean;
  setShowingEditItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: Item;
}

interface EditItemInputProps {
  name: string;
  brand: string;
  expirationDate: Date;
  storageAreaId: string;
  foodCategories: string[];
  flavor: string;
  storageAreaName: string;
}

const editItemSchema = z.object({
  name: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(50, { message: "You have exceeded the characters amount." }),
  brand: z.string().optional(),
  flavor: z.string().optional(),
  // .union([
  //   z.string().length(0, {
  //     message: "Flavor needs at least two characters or blank.",
  //   }),
  //   z.string().min(2),
  // ])
  // .optional()
  // .transform((e) => (e === "" ? undefined : e)),
  storageAreaId: z.string(),
  foodCategories: z.string().array().optional(),
  expirationDate: z.coerce.date().optional(),
});

const EditItemModal = ({
  showingEditItemModal,
  setShowingEditItemModal,
  item,
}: EditItemModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditItemInputProps>({
    defaultValues: {
      name: item.name,
      brand: item.brand ?? "",
      flavor: item.flavor ?? "",
      storageAreaName: item.storageAreaName ?? "",
      foodCategories: item.foodCategories.map((foodCategory) => foodCategory),
    },
    resolver: zodResolver(editItemSchema),
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
      expirationDate: data.expirationDate,
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
        className="mt-4 flex flex-col space-y-2"
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
        {errors.name?.message && (
          <p className="text-sm italic text-red-500">{errors.name?.message}</p>
        )}
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
        {errors.brand?.message && (
          <p className="text-sm italic text-red-500">{errors.brand?.message}</p>
        )}
        {errors.flavor?.message && (
          <p className="text-sm italic text-red-500">
            {errors.flavor?.message}
          </p>
        )}
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
                defaultValue={dayjs(item.expirationDate)}
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
        <button
          type="submit"
          className="mx-auto w-1/2 rounded-2xl border border-slate-600 px-4 text-lg"
        >
          Edit Item
        </button>
      </form>
    </Modal>
  );
};

export default EditItemModal;
