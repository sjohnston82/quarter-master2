import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import EditIcon from "@mui/icons-material/Edit";
import IsoIcon from "@mui/icons-material/Iso";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateQuantityModal from "./UpdateQuantityModal";

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

  const handleUpdateQuantity = () => {
    handleClose();
    setShowingUpdateQuantityModal(true);
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
        <MenuItem onClick={handleClose}>
          <EditIcon /> <span className="ml-3">Edit Item</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon /> <span className="ml-3">Delete Item</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ShoppingCartIcon />{" "}
          <span className="ml-3">Add to Shopping List</span>
        </MenuItem>
      </Menu>
      <UpdateQuantityModal
        item={item}
        showingUpdateQuantityModal={showingUpdateQuantityModal}
        setShowingUpdateQuantityModal={setShowingUpdateQuantityModal}
      />
    </div>
  );
};

export default ItemOptionsMenu;
