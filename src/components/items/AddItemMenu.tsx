/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useContext, useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { AiOutlineBarcode } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { BsHouseAdd } from "react-icons/bs";
import { GlobalContext } from "~/context/GlobalContextProvider";
import AddItemForm from "./AddItemForm";
import CreateStorageArea from "../storageAreas/CreateStorageArea";
import { useForm } from "react-hook-form";
import { type UPCInfo } from "~/context/GlobalContextProvider";
import { toast } from "react-hot-toast";
import { type TooltipClasses } from "@mui/material";

type NewItemInputProps = {
  name: string;
  amount: string;
  amountType: string;
  storageAreaId: string;
};

const AddItemMenu = () => {
  const {
    setShowingAddItemModal,
    setShowingBarcodeScanner,
    showingBarcodeScanner,
    showingAddItemModal,
    setShowingCreateStorageAreaModal,
    barcode,
    setBarcode,
    currentItemByUPC,
    setCurrentItemByUPC,
    searchingForProduct,
    setSearchingForProduct,
  } = useContext(GlobalContext);

  const { reset } = useForm<NewItemInputProps>();
  const [showingMenu, setShowingMenu] = useState(false);
  // const [searchingForProduct, setSearchingForProduct] = useState(false)
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    const apiUrl =
      "https://api.codetabs.com/v1/proxy?quest=https://brocade.io/api/items/";
    function getUPCInfo() {
      if (barcode !== null) {
        setSearchingForProduct(true);
        fetch(`${apiUrl}${barcode}`)
          .then((response) => {
            if (!response.ok) {
              toast.error("Produce info not found.  Please add manually.");
              throw new Error("Request failed");
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentItemByUPC(data as UPCInfo);
            setSearchingForProduct(false);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (data.error) {
              toast.error(
                "Unable to obtain product info.  Please add item manually."
              );
            }
            setBarcode(null);
          })

          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUPCInfo();
  }, [barcode, setBarcode, setCurrentItemByUPC, setSearchingForProduct]);
  useEffect(() => {
    if (currentItemByUPC !== null) {
      reset(currentItemByUPC);
      setShowingAddItemModal(true);
    }
  }, [currentItemByUPC, reset, setShowingAddItemModal, setSearchingForProduct]);

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

  const tooltipClasses: Partial<TooltipClasses> = {
    tooltip: "custom-tooltip-class",
  };
  return (
    <div className="mt-2 sm:mt-3 sm:ml-auto sm:mr-5">
      <SpeedDial
        ariaLabel="Add item speed dial"
        sx={{
          flexDirection: "column",
          position: "relative",
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
                tooltip: {
                  backgroundColor: "red",
                },
              }}
              FabProps={{ size: "large", color: "success" }}
              onClick={action.action}
              TooltipClasses={tooltipClasses}
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
