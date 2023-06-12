/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar, Button, Chip } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ItemOptionsMenu from "./optionsMenu/ItemOptionsMenu";
import { chipIcons } from "~/utils/helperLists";
import { GlobalContext } from "~/context/GlobalContextProvider";


type Item = RouterOutputs["items"]["getAllItems"][0];

const ItemCard = ({ ...item }: Item) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { windowSize } = useContext(GlobalContext)
  return (
    <div className="relative w-72 rounded bg-snow p-2 shadow-lg shadow-black">
      <div className="flex flex-col space-y-1">
        <h1 className="text-center text-xl font-semibold">{item.name}</h1>
        <div className="text-center">
          {item.daysUntilExpiry === null ? (
            <p className="text-center text-schooner">Expires: No date given</p>
          ) : item.daysUntilExpiry > 1 ? (
            `Expires: ${item.daysUntilExpiry} days (${dayjs(
              item.expirationDate
            ).format("MM/DD/YYYY")})`
          ) : item.daysUntilExpiry === 1 ? (
            "Expires tomorrow!"
          ) : (
            <span className="font-semibold text-red-600">Expired!</span>
          )}
        </div>

        <div className="flex ">
          <div className="flex w-1/2 flex-col text-center">
            <p className="text-center text-lg font-semibold underline">
              Amount
            </p>
            <p className="">
              {item.amount} {item.amountType}
            </p>
          </div>
          <div className="flex w-1/2 flex-col text-center">
            <p className="text-lg font-semibold underline">Storage Area</p>
            <p className="">{item.storageAreaName}</p>
          </div>
        </div>
        <div className="flex ">
          <div className="flex w-1/2 flex-col text-center">
            <p className="text-center text-lg font-semibold underline">Brand</p>

            {item.brand !== null ? (
              item.brand
            ) : (
              <p className="text-schooner">No info given</p>
            )}
          </div>
          <div className="flex w-1/2 flex-col text-center">
            <p className="text-lg font-semibold underline">Flavor</p>

            {item.flavor !== "" ? (
              item.flavor
            ) : (
              <p className="text-schooner">No info given</p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-2 my-4 flex flex-wrap justify-center gap-2">
        {item.foodCategories.map((category, i) => (
          <Chip
            key={i}
            label={category}
            size={windowSize.innerWidth > 1279 ? "medium" : "small"}
            avatar={
              <Avatar src={chipIcons[category as keyof typeof chipIcons]} />
            }
          />
        ))}
      </div>
      <div className="absolute -right-3 top-1">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <ItemOptionsMenu
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          item={item}
        />
      </div>
    </div>
  );
};

export default ItemCard;
