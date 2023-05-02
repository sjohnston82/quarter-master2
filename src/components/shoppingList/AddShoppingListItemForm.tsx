import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { MenuItem, TextField } from "@mui/material";
import { groceryStoreAreas } from "~/utils/helperLists";

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
  return (
    <Modal
      isOpen={showingAddToShoppingListModal}
      title="Add Item to Shopping List"
      onClose={() => setShowingAddToShoppingListModal(false)}
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
        name="location"
        label="Item location"
        id="location"
      >
        {groceryStoreAreas.map((area, i) => (
          <MenuItem key={i} value={area}>
            {area}
          </MenuItem>
        ))}
      </TextField>
      <button type="submit"></button>
    </Modal>
  );
};

export default AddShoppingListItemForm;
