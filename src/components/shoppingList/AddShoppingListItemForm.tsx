import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { MenuItem, TextField } from "@mui/material";
import {
  groceryStoreAreas,
  shoppingListAmountTypes,
} from "~/utils/helperLists";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

interface AddToShoppingListProps {
  showingAddToShoppingListModal: boolean;
  setShowingAddToShoppingListModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface ShoppingListInputProps {
  name: string;
  location: string;
  amount: number | null;
  amountType: string;
}

const AddShoppingListItemForm = ({
  showingAddToShoppingListModal,
  setShowingAddToShoppingListModal,
}: AddToShoppingListProps) => {
  const { householdId } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<ShoppingListInputProps>({
    defaultValues: {
      amount: null,
    },
  });

  const addToShoppingListRoute = api.useContext().shoppingList;
  const addToShoppingList = api.shoppingList.addToShoppingList.useMutation({
    onSuccess: async () => {
      toast.success("Item added to shopping list.");
      await addToShoppingListRoute.getAllShoppingListItems.invalidate();
    },
  });

  const onSubmit = (data: ShoppingListInputProps) => {
    const mutationData = {
      name: data.name,
      location: data.location,
      amount: data.amount !== null ? +data.amount : undefined,
      amountType: data.amountType,
      householdId,
    };
    addToShoppingList.mutate(mutationData);

    reset();
    setShowingAddToShoppingListModal(false);
  };

  return (
    <Modal
      isOpen={showingAddToShoppingListModal}
      title="Add Item to Shopping List"
      onClose={() => setShowingAddToShoppingListModal(false)}
    >
      <form
        className="mt-4 space-y-2"
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
            {...register("amountType")}
            disabled={!watch("amount")}
          >
            {shoppingListAmountTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          select
          fullWidth
          label="Item location"
          id="location"
          {...register("location")}
        >
          {groceryStoreAreas.map((area, i) => (
            <MenuItem key={i} value={area}>
              {area}
            </MenuItem>
          ))}
        </TextField>
        <button type="submit" disabled={!isValid}>
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddShoppingListItemForm;
