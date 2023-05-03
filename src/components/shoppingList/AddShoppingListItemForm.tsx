import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { MenuItem, TextField } from "@mui/material";
import { groceryStoreAreas } from "~/utils/helperLists";
import { api } from "~/utils/api";

interface AddToShoppingListProps {
  showingAddToShoppingListModal: boolean;
  setShowingAddToShoppingListModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface ShoppingListInputProps {
  name: string;
  location: string;
}

const AddShoppingListItemForm = ({
  showingAddToShoppingListModal,
  setShowingAddToShoppingListModal,
}: AddToShoppingListProps) => {
  const { householdId } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<ShoppingListInputProps>();

  const addToShoppingList = api.shoppingList.addToShoppingList.useMutation();

  const onSubmit = (data: ShoppingListInputProps) => {
    const mutationData = {
      name: data.name,
      location: data.location,
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
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
};

export default AddShoppingListItemForm;
