import {
  KitchenOutlined,
  SwapVerticalCircleOutlined,
} from "@mui/icons-material";
import { MdOutlineFoodBank } from "react-icons/md";
import React, { useState } from "react";
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

const HorizontalAddItemMenu = () => {
  const [showingMenu, setShowingMenu] = useState(false);
  const toggleShowingMenu = () => setShowingMenu(!showingMenu);
  // const useStyles = makeStyles((theme: Theme) => ({
  //   speedDialAction: {
  //     backgroundColor: "red", // Customize the background color
  //     color: "white", // Customize the text color
  //     "&:hover": {
  //       backgroundColor: "blue", // Customize the hover background color
  //     },
  //   },
  // }));
  return (
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
      />
    </SpeedDial>
  );
};

export default HorizontalAddItemMenu;
