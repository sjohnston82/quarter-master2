import { MenuItem, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "~/components/ui/Modal";
import SubmitButton from "~/components/ui/SubmitButton";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api, type RouterOutputs } from "~/utils/api";
import {
  groceryStoreAreas,
  shoppingListAmountTypes,
} from "~/utils/helperLists";

type Item = RouterOutputs["items"]["getAllItems"][0];

interface AddToShoppingFromItemsProps {
  showingAddToShoppingFromItemsModal: boolean;
  setShowingAddToShoppingFromItemsModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  item: Item;
  checked: boolean;
}

interface ShoppingListInputProps {
  name: string;
  location: string;
  amount: number | null;
  amountType: string;
}

const AddToShoppingFromItems = ({
  showingAddToShoppingFromItemsModal,
  setShowingAddToShoppingFromItemsModal,
  item,
  checked,
}: AddToShoppingFromItemsProps) => {
  const { householdId } = useContext(GlobalContext);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ShoppingListInputProps>({
    defaultValues: {
      name: item.name,
    },
  });
  const addToShoppingListRoute = api.useContext().shoppingList;
  const deleteItemRoute = api.useContext().items;
  const addToShoppingList = api.shoppingList.addToShoppingList.useMutation({
    onSuccess: async () => {
      toast.success("Item added to shopping list.");
      await addToShoppingListRoute.getAllShoppingListItems.invalidate();
      checked && (await deleteItemRoute.invalidate());
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
    setShowingAddToShoppingFromItemsModal(false);
  };

  return (
    <Modal
      isOpen={showingAddToShoppingFromItemsModal}
      title="Add Item to Shopping List"
      onClose={() => setShowingAddToShoppingFromItemsModal(false)}
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
        <div className="flex justify-center">
          <SubmitButton disabled={!isValid}>Add</SubmitButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddToShoppingFromItems;
