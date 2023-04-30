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
      z.string().min(4),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  amount: z.coerce.number().min(1),
  // .number()
  // .or(z.string().regex(/\d+/).transform(Number))
  // .refine((n) => n >= 0),
  amountType: z.string().optional(),
  expirationDate: z.string().optional(),
});

const AddItemManuallyForm = ({
  showingAddItemModal,
  setShowingAddItemModal,
}: AddItemManuallyFormProps) => {
  const { householdId } = useContext(GlobalContext);

  const [amount, setAmount] = useState("");

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

  const createNewItem = api.items.createNewItem.useMutation();

  const onSubmit = (data: AddItemManuallyInputProps) => {
    const mutationData = {
      householdId,
      name: data.name,
      amount: +data.amount,
      amountType: data.amountType,
      storageAreaId: data.storageAreaId,
      brand: data.brand,
      expirationDate: data.expirationDate,
      foodCategories: data.foodCategories,
    };
    // alert(JSON.stringify(data));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 flex flex-col space-y-2"
      >
        <TextField
          variant="outlined"
          // margin="dense"
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
        <TextField
          variant="outlined"
          // margin="dense"
          {...register("brand")}
          fullWidth
          name="brand"
          label="Brand"
          type="text"
          id="brand"
        />
        {errors.brand?.message && (
          <p className="text-sm italic text-red-500">{errors.brand?.message}</p>
        )}
        <div className="flex items-center justify-between">
          <TextField
            variant="outlined"
            // margin="dense"
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
            // margin="dense"
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
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          // margin="dense"
          className=""
          required
          select
          id="storageArea"
          label="Storage Area"
          {...register("storageAreaId")}
        >
          {getStorageAreas.data &&
            getStorageAreas.data.map((area) => (
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
    </Modal>
  );
};

export default AddItemManuallyForm;
