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

  const classes = {
    opacity: 1
  }
  const actions = [
    {
      name: "Add Storage Area",
      icon: <BsHouseAdd size={40} />,
      action: handleAddStorageArea,
      top: 60,
    },
    {
      name: "Add By Barcode",
      icon: <AiOutlineBarcode size={40} />,
      action: handleAddItemByBarcode,
      top: 120,
    },
    {
      name: "Add Item Manually",
      icon: <IoAddCircleSharp size={40} />,
      action: handleAddItemManually,
      top: 180,
    },
  ];

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
        onClick={() => setShowingMenu(!showingMenu)}
        open={showingMenu}
        FabProps={{ size: "large" }}
      >
        {actions.map((action, index) => {
          const icon = <span className="opacity-100">{action.icon}</span>;
          return (
            <SpeedDialAction
              key={index}
              icon={icon}
              tooltipTitle={action.name}
              tooltipOpen
              sx={{
                whiteSpace: "nowrap",
                position: "absolute",
                top: action.top,
                right: -8,
                opacity: 1,
              }}
              FabProps={{ size: "large", color: "success" }}
              onClick={action.action}
            />
          );
        })}
      </SpeedDial>
      <AddItemForm />
      <CreateStorageArea />
    </div>
  );
};

export default AddItemMenu;
