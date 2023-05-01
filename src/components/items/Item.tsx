import React, { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Button, Chip } from "@mui/material";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ItemOptionsMenu from "./optionsMenu/ItemOptionsMenu";


type Item = RouterOutputs["items"]["getAllItems"][0];

const Item = ({ ...item }: Item) => {
  const [showingMoreInfo, setShowingMoreInfo] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="relative flex flex-col border-t-4">
        <div className="ml-2 mr-6 flex justify-between border-b py-2">
          <div className="w-2/5 flex-wrap">
            <p className="text-sm">{item.name}</p>
          </div>
          <div className=" flex-wrap">
            <p className="text-sm">
              {item.amount} {item.amountType}
            </p>
          </div>
          <div className="w-1/3 flex-wrap">
            <p className="text-sm">
              {item.daysUntilExpiry && item.daysUntilExpiry > 0 ? (
                `Expires: ${item.daysUntilExpiry} days`
              ) : (
                <span className="font-semibold text-red-600">Expired!</span>
              )}
            </p>
          </div>
          <div className="absolute -right-4 top-0">
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
        {showingMoreInfo ? (
          <div className="">
            <ExpandLessIcon onClick={() => setShowingMoreInfo(false)} />
          </div>
        ) : (
          <div className="">
            <ExpandMoreIcon onClick={() => setShowingMoreInfo(true)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
