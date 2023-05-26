import {
  KitchenOutlined,
  SwapVerticalCircleOutlined,
} from "@mui/icons-material";
import { MdOutlineFoodBank } from "react-icons/md";
import React, { useContext, useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  type Theme,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AiOutlineBarcode } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { BsHouseAdd } from "react-icons/bs";
import { GlobalContext } from "~/context/GlobalContextProvider";
import AddItemForm from "./AddItemForm";

const HorizontalAddItemMenu = () => {
  const { setShowingAddItemModal } = useContext(GlobalContext);
  const [showingMenu, setShowingMenu] = useState(false);

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
        />
        <SpeedDialAction
          icon={<IoAddCircleSharp size={40} />}
          tooltipTitle="Add Item Manually"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
          }}
          FabProps={{ size: "large" }}
          onClick={() => setShowingAddItemModal(true)}
        />
        <SpeedDialAction
          icon={<BsHouseAdd size={40} />}
          tooltipTitle="Add Storage Area"
          tooltipOpen
          sx={{
            whiteSpace: "nowrap",
          }}
          FabProps={{ size: "large" }}
        />
      </SpeedDial>
      <AddItemForm />
    </div>
  );
};

export default HorizontalAddItemMenu;
