import React from "react";
import Modal from "../ui/Modal";
import { api, type RouterOutputs } from "~/utils/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, TextField } from "@mui/material";
import {
  groceryStoreAreas,
  shoppingListAmountTypes,
} from "~/utils/helperLists";
import { toast } from "react-hot-toast";

interface EditShoppingItemModalProps {
  showingEditShoppingItemModal: boolean;
  setShowingEditShoppingItemModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  shoppingItem: RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];
}

interface EditShoppingItemInputProps {
  name: string;
  amount: number | null;
  amountType: string;
  location: string;
}

const editShoppingItemSchema = z.object({
  name: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(50, { message: "You have exceeded the characters amount." }),
  amount: z.coerce.number().optional(),
  amountType: z.string().optional(),
  location: z.string().optional(),
});

const EditShoppingItemModal = ({
  showingEditShoppingItemModal,
  setShowingEditShoppingItemModal,
  shoppingItem,
}: EditShoppingItemModalProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditShoppingItemInputProps>({
    defaultValues: {
      name: shoppingItem.name,
      amount: shoppingItem.amount ?? null,
      amountType: shoppingItem.amountType ?? "",
      location: shoppingItem.location ?? "",
    },
    resolver: zodResolver(editShoppingItemSchema),
  });

  const editShoppingItemRoute = api.useContext().shoppingList;
  const editShoppingItem = api.shoppingList.editShoppingItem.useMutation({
    onSuccess: async () => {
      toast.success(`Item has been successfully edited!`);
      await editShoppingItemRoute.invalidate();
    },
  });

  const onSubmit = (data: EditShoppingItemInputProps) => {
    const mutationData = {
      id: shoppingItem.id,
      name: data.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      amount: data.amount === 0 ? null : +data.amount!,
      amountType: data.amount === 0 ? null : data.amountType,
      location: data.location,
    };
    editShoppingItem.mutate(mutationData);
    setShowingEditShoppingItemModal(false);
  };

  return (
    <Modal
      isOpen={showingEditShoppingItemModal}
      title={`Edit ${shoppingItem.name} details:`}
      onClose={() => {
        setShowingEditShoppingItemModal(false);
      }}
    >
      <form
        action=""
        className="mt-5 space-y-2"
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
          <TextField
            variant="outlined"
            {...register("amount")}
            name="amount"
            id="amount"
            type="number"
            label="Amount"
            className="w-2/5"
          />
          <TextField
            className="w-3/5"
            id="amountType"
            select
            label="Amount Type"
            defaultValue=""
            {...register("amountType")}
            disabled={!watch("amount")}
          >
            {shoppingListAmountTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          {errors.amount?.message && (
            <p className="text-sm italic text-red-500">
              {errors.amount?.message}
            </p>
          )}
        </div>
        <TextField
          select
          fullWidth
          label="Item location"
          id="location"
          defaultValue=""
          {...register("location")}
        >
          {groceryStoreAreas.map((area, i) => (
            <MenuItem key={i} value={area}>
              {area}
            </MenuItem>
          ))}
        </TextField>
        <div className="flex w-full justify-center pt-3">
          <button
            type="submit"
            className="w-1/2 rounded-2xl border border-slate-600 px-4 text-lg"
          >
            Edit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditShoppingItemModal;
