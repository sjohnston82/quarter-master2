import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { Controller, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Modal from "../../ui/Modal";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { packageTypes, foodCategories } from "~/utils/helperLists";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { type DateValidationError } from "@mui/x-date-pickers";

interface AddItemManuallyInputProps {
  name: string;
  brand_name: string;
  amount: number;
  amountType: string;
  expirationDate: string | undefined;
  storageAreaId: string;
  foodCategories: string[];
  flavor: string;
}

const addItemManuallySchema = z.object({
  name: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  amount: z.coerce.number().min(1),
  amountType: z.string().optional(),
  flavor: z.string().optional(),
  storageAreaId: z.string(),
  foodCategories: z.string().array().optional(),
  expirationDate: z.coerce.date().optional(),
});

const AddItemForm = () => {
  const {
    householdId,
    setShowingAddItemModal,
    showingAddItemModal,
    currentItemByUPC,
    setCurrentItemByUPC,
  } = useContext(GlobalContext);

  const [amount, setAmount] = useState("1");
  const [showingMessage, setShowingMessage] = useState(false);
  const [error, setError] = React.useState<DateValidationError | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AddItemManuallyInputProps>({
    resolver: zodResolver(addItemManuallySchema),
    defaultValues: {
      brand_name: currentItemByUPC?.brand_name,
      name: currentItemByUPC?.name,
      storageAreaId: "",
      amount: parseInt(amount),
    },
  });

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const createItemRoute = api.useContext().items;

  const createNewItem = api.items.createNewItem.useMutation({
    onSuccess: async () => {
      await createItemRoute.getAllItemsInfinite.invalidate();
      await createItemRoute.getExpiredItems.invalidate();
      toast.success("Item created!");
    },
  });

  useEffect(() => {
    currentItemByUPC !== null && reset(currentItemByUPC);
  }, [currentItemByUPC, reset]);

  const onSubmit = (data: AddItemManuallyInputProps) => {
    const mutationData = {
      householdId,
      name: data.name,
      amount: +data.amount,
      amountType: data.amountType,
      storageAreaId: data.storageAreaId,
      brand_name: data.brand_name,
      expirationDate:
        data.expirationDate === undefined
          ? null
          : new Date(data.expirationDate),
      foodCategories: data.foodCategories,
      flavor: data.flavor,
    };

    createNewItem.mutate(mutationData);
    reset();
    setShowingAddItemModal(false);
    setAmount("");
    setCurrentItemByUPC(null);
  };

  return (
    <Modal
      isOpen={showingAddItemModal}
      onClose={() => setShowingAddItemModal(false)}
      title="Add Item"
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
          <div className="flex gap-1">
            <div className="flex flex-col">
              <TextField
                variant="outlined"
                {...register("brand_name")}
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
            {errors.flavor?.message && (
              <p className="text-sm italic text-red-500">
                {errors.flavor?.message}
              </p>
            )}
          </div>
          {errors.brand_name?.message && (
            <p className="text-sm italic text-red-500">
              {errors.brand_name?.message}
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
              defaultValue={parseInt(amount)}
              required
              className="w-2/5"
              onChange={(e) => setAmount(e.target.value)}
            />

            <TextField
              className="w-[59%]"
              id="amountType"
              select
              label="Amount Type"
              defaultValue=""
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="expirationDate"
              defaultValue={undefined}
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
            defaultValue=""
          >
            {getStorageAreas.data.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>
            ))}
          </TextField>
          <Controller
            render={({ field: { onChange } }) => (
              <div className="">
                <Autocomplete
                  multiple
                  filterSelectedOptions
                  blurOnSelect="touch"
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
              </div>
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
          <p
            className="cursor-pointer text-sm underline"
            onClick={() => setShowingMessage(!showingMessage)}
          >
            Having trouble with barcodes not being found?
          </p>
          {showingMessage && (
            <p className="text-sm">
              Quartermaster uses a free and open-source API to provide product
              information from barcodes, and it doesn&apos;t have as many
              products as some of it&apos;s for-profit competitors. If you are
              looking to contribute to it so that is more robust and so that you
              can add more items you use by barcode, visit{" "}
              <a
                href="https://brocade.io"
                className="text-blue-600 underline"
                target="_blank"
              >
                brocade.io
              </a>{" "}
              and create a free account. With your account you can add products
              by typing in the UPC code found at the bottom of your barcode and
              a product name so that next time you go to scan it it will be
              present in the API database.
            </p>
          )}
        </form>
      )}
    </Modal>
  );
};

export default AddItemForm;
