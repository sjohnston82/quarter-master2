import { useContext, useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { AiOutlineBarcode } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { BsHouseAdd } from "react-icons/bs";
import { GlobalContext } from "~/context/GlobalContextProvider";
import AddItemForm from "./AddItemForm";
import CreateStorageArea from "../storageAreas/CreateStorageArea";

const AddItemMenu = () => {
  const {
    setShowingAddItemModal,
    setShowingBarcodeScanner,
    showingBarcodeScanner,
    showingAddItemModal,
    setShowingCreateStorageAreaModal,
  } = useContext(GlobalContext);
  const [showingMenu, setShowingMenu] = useState(false);

  const handleAddItemManually = () => {
    setShowingAddItemModal(true);
    setShowingMenu(false);
  };

  const handleAddItemByBarcode = () => {
    setShowingBarcodeScanner(!showingBarcodeScanner);
    setShowingMenu(false);
  };

  const handleAddStorageArea = () => {
    setShowingMenu(false);
    setShowingCreateStorageAreaModal(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setShowingMenu(false);
    }, 500);
  };
  return (
    <div className="mt-2  ">
      <SpeedDial
        ariaLabel="Add item speed dial"
        sx={{
          flexDirection: "column",
          position: "relative",
          // right: 8,
          opacity: 1,
          zIndex: showingAddItemModal ? 0 : 1,
        }}
        icon={<SpeedDialIcon />}
        // onToggle={() => setShowingMenu(false)}
        onClick={() => setShowingMenu(!showingMenu)}
        open={showingMenu}
        FabProps={{ size: "large" }}
      >
        <SpeedDialAction
          icon={<AiOutlineBarcode size={40} />}
          tooltipTitle="Add By Barcode"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
            position: "absolute",
            top: 60,
            right: -8,
          }}
          FabProps={{ size: "large", color: "success" }}
          onClick={handleAddItemByBarcode}
        />
        <SpeedDialAction
          icon={<IoAddCircleSharp size={40} />}
          tooltipTitle="Add Item Manually"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
            position: "absolute",
            top: 120,
            right: -8,
          }}
          FabProps={{ size: "large" }}
          onClick={handleAddItemManually}
        />
        <SpeedDialAction
          icon={<BsHouseAdd size={40} />}
          tooltipTitle="Add Storage Area"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
            position: "absolute",
            top: 180,
            right: -8,
          }}
          FabProps={{ size: "large" }}
          onClick={handleAddStorageArea}
        />
      </SpeedDial>
      <AddItemForm />
      <CreateStorageArea />
    </div>
  );
};

export default AddItemMenu;
