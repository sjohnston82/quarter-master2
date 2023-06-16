
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "../ui/Button";
import { MenuItem, TextField } from "@mui/material";

interface ShoppingListButtonBarProps {
  setShowingAddToShoppingListModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  deleteAllComplete: () => void;
}

const ShoppingListButtonBar = ({ setShowingAddToShoppingListModal, handleFilterChange, deleteAllComplete}: ShoppingListButtonBarProps) => {
  return (
    <div className="flex justify-between p-4">
      <Button
        fontSize="text-lg"
        onClick={() => setShowingAddToShoppingListModal(true)}
      >
        <AddShoppingCartIcon fontSize="small" /> Add Item
      </Button>

      <TextField
        // size="small"
        select
        className="w-1/2 bg-snow"
        defaultValue="all"
        onChange={(e) => handleFilterChange(e)}
      >
        <MenuItem selected value="all">
          All Items
        </MenuItem>
        <MenuItem value="byLocation">Items By Location</MenuItem>
      </TextField>

      <Button fontSize="text-lg" onClick={deleteAllComplete}>
        Delete Completed
      </Button>
    </div>
  );
};

export default ShoppingListButtonBar;
