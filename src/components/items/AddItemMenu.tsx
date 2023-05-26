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

  return (
    <div className="">
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          flexDirection: "column",
          position: "absolute",
          right: 8,
          opacity: 1,
        }}
        icon={<SpeedDialIcon />}
        onClose={() => setShowingMenu(false)}
        onOpen={() => setShowingMenu(true)}
        open={showingMenu}
        FabProps={{ size: "large" }}
      >
        <SpeedDialAction
          icon={<AiOutlineBarcode size={40} />}
          tooltipTitle="Add By Barcode"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
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
