import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Modal from "../ui/Modal";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { packageTypes, foodCategories } from "~/utils/foodTypes";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { type DateValidationError } from "@mui/x-date-pickers";

interface AddItemManuallyFormProps {
  showingAddItemModal: boolean;
  setShowingAddItemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddItemManuallyInputProps {
  name: string;
  brand: string;
  amount: number;
  amountType: string;
  expirationDate: string;
  storageAreaId: string;
  foodCategories: string[];
}

const addItemManuallySchema = z.object({
  name: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(50, { message: "You have exceeded the characters amount." }),
  brand: z
    .union([
      z
        .string()
        .length(0, { message: "You need at least two characters or blank." }),
      z.string().min(2),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  amount: z.coerce.number().min(1),
  amountType: z.string().optional(),
  storageAreaId: z.string(),
  foodCategories: z.string().array().optional(),
  expirationDate: z.coerce.date().optional(),
});

const AddItemManuallyForm = ({
  showingAddItemModal,
  setShowingAddItemModal,
}: AddItemManuallyFormProps) => {
  const { householdId } = useContext(GlobalContext);

  const [amount, setAmount] = useState("");

  const [error, setError] = React.useState<DateValidationError | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddItemManuallyInputProps>({
    resolver: zodResolver(addItemManuallySchema),
  });

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const createItemRoute = api.useContext().items;

  const createNewItem = api.items.createNewItem.useMutation({
    onSuccess: async () => {
      await createItemRoute.getAllItems.invalidate();
      toast.success("Item created!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating item.");
    },
  });

  const onSubmit = (data: AddItemManuallyInputProps) => {
    console.log(data.storageAreaId);
    const mutationData = {
      householdId,
      name: data.name,
      amount: +data.amount,
      amountType: data.amountType,
      storageAreaId: data.storageAreaId,
      brand: data.brand,
      expirationDate: new Date(data.expirationDate),
      foodCategories: data.foodCategories,
    };

    createNewItem.mutate(mutationData);
    reset();
    setShowingAddItemModal(false);
    setAmount("");
  };

  return (
    <Modal
      isOpen={showingAddItemModal}
      onClose={() => setShowingAddItemModal(false)}
      title="Add Item Manually"
    >
      {getStorageAreas.data && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex flex-col space-y-2"
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
            <p className="text-sm italic text-red-500">
              {errors.name?.message}
            </p>
          )}
          <TextField
            variant="outlined"
            {...register("brand")}
            fullWidth
            name="brand"
            label="Brand"
            type="text"
            id="brand"
          />
          {errors.brand?.message && (
            <p className="text-sm italic text-red-500">
              {errors.brand?.message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <TextField
              variant="outlined"
              {...register("amount")}
              name="amount"
              id="amount"
              type="number"
              label="Amount"
              required
              className="w-2/5"
              onChange={(e) => setAmount(e.target.value)}
            />

            <TextField
              className="w-[55%]"
              id="amountType"
              select
              label="Amount Type"
              {...register("amountType")}
            >
              {packageTypes.map((type, i) => (
                <MenuItem
                  key={i}
                  value={amount === "1" ? type.singular : type.plural}
                >
                  {amount === "1" ? type.singular : type.plural}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {errors.amount?.message && (
            <p className="text-sm italic text-red-500">
              {errors.amount?.message}
            </p>
          )}
          <LocalizationProvider
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dateAdapter={AdapterDayjs}
          >
            <Controller
              name="expirationDate"
              defaultValue={String(new Date())}
              control={control}
              render={({ field: { ref, onChange } }) => (
                <DatePicker
                  inputRef={ref}
                  className="mb-1 mt-2"
                  disablePast
                  label="Expiration Date"
                  onChange={(event) => {
                    onChange(event);
                  }}
                  onError={(newError) => setError(newError)}
                  slotProps={{
                    textField: {
                      helperText: error,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            className=""
            required
            select
            id="storageArea"
            label="Storage Area"
            {...register("storageAreaId")}
          >
            {getStorageAreas.data.map((area) => (
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
              />
            )}
            name="foodCategories"
            control={control}
          />
          <button
            type="submit"
            className="mt-3 rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400"
          >
            Create Item
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AddItemManuallyForm;
