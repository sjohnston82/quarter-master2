import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import EditIcon from "@mui/icons-material/Edit";
import IsoIcon from "@mui/icons-material/Iso";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateQuantityModal from "./UpdateQuantityModal";
import EditItemModal from "./EditItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AddToShoppingFromItems from "./AddToShoppingFromItems";

type Item = RouterOutputs["items"]["getAllItems"][0];

type ItemMenuOptionsProps = {
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  open: boolean;
  item: Item;
};

const ItemOptionsMenu = ({
  anchorEl,
  setAnchorEl,
  open,
  item,
}: ItemMenuOptionsProps) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showingUpdateQuantityModal, setShowingUpdateQuantityModal] =
    useState(false);
  const [showingEditItemModal, setShowingEditItemModal] = useState(false);
  const [showingDeleteConfirmationModal, setShowingDeleteConfirmationModal] =
    useState(false);
  const [
    showingAddToShoppingFromItemsModal,
    setShowingAddToShoppingFromItemsModal,
  ] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleUpdateQuantity = () => {
    handleClose();
    setShowingUpdateQuantityModal(true);
  };

  const handleEditItem = () => {
    handleClose();
    setShowingEditItemModal(true);
  };

  const handleDelete = () => {
    handleClose();
    setShowingDeleteConfirmationModal(true);
  };

  const handleAddToShopping = () => {
    handleClose();
    setShowingAddToShoppingFromItemsModal(true);
  };

  return (
    <div className="">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUpdateQuantity}>
          <IsoIcon /> <span className="ml-3">Update Quantity</span>
        </MenuItem>
        <MenuItem onClick={handleEditItem}>
          <EditIcon /> <span className="ml-3">Edit Item</span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon /> <span className="ml-3">Delete Item</span>
        </MenuItem>
        <MenuItem onClick={handleAddToShopping}>
          <ShoppingCartIcon />{" "}
          <span className="ml-3">Add to Shopping List</span>
        </MenuItem>
      </Menu>
      <UpdateQuantityModal
        item={item}
        showingUpdateQuantityModal={showingUpdateQuantityModal}
        setShowingUpdateQuantityModal={setShowingUpdateQuantityModal}
      />
      <EditItemModal
        showingEditItemModal={showingEditItemModal}
        setShowingEditItemModal={setShowingEditItemModal}
        item={item}
      />
      <DeleteConfirmationModal
        showingDeleteConfirmationModal={showingDeleteConfirmationModal}
        setShowingDeleteConfirmationModal={setShowingDeleteConfirmationModal}
        id={item.id}
        item={item}
        showingAddToShoppingFromItemsModal={showingAddToShoppingFromItemsModal}
        setShowingAddToShoppingFromItemsModal={
          setShowingAddToShoppingFromItemsModal
        }
        checked={checked}
        setChecked={setChecked}
        handleClose={handleClose}
      />
      <AddToShoppingFromItems
        showingAddToShoppingFromItemsModal={showingAddToShoppingFromItemsModal}
        setShowingAddToShoppingFromItemsModal={
          setShowingAddToShoppingFromItemsModal
        }
        item={item}
      />
    </div>
  );
};

export default ItemOptionsMenu;
