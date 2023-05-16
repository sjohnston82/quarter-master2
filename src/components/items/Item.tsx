import React, { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Button, Chip } from "@mui/material";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ItemOptionsMenu from "./optionsMenu/ItemOptionsMenu";
import MoreItemInfo from "./MoreItemInfo";

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
              {item.daysUntilExpiry === null ? "No date given" : item.daysUntilExpiry > 1 ? (
                `Expires: ${item.daysUntilExpiry} days`
              ) : item.daysUntilExpiry === 1 ? (
                "Expires tomorrow!"
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
          <div className="flex justify-end mx-2">
            <ExpandLessIcon onClick={() => setShowingMoreInfo(false)} />
          </div>
        ) : (
          <div className="flex justify-between mx-2 items-center"><p className="text-sm">More Information</p>
            <ExpandMoreIcon onClick={() => setShowingMoreInfo(true)} />
          </div>
        )}
        {showingMoreInfo && <MoreItemInfo {...item} />}
      </div>
    </div>
  );
};

export default Item;
