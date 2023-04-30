import React, { useState } from "react";
import { type RouterOutputs } from "~/utils/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Chip } from "@mui/material";
import dayjs from "dayjs";

type Item = RouterOutputs["items"]["getAllItems"][0];

const Item = ({ ...item }: Item) => {
  const [showingMoreInfo, setShowingMoreInfo] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-t-4">
        <div className="mx-2 flex justify-between border-b py-2">
          <div className="">
            <p className="">{item.name}</p>
          </div>
          <div className="">
            {item.amount} {item.amountType}
          </div>
          <div className="">{item.storageAreaName}</div>
        </div>
        <div className="flex justify-between py-2">
          {showingMoreInfo && (
            <div className="flex w-full">
              <div className="flex w-2/3 flex-col">
                <div className="flex w-full">
                  <div className="mx-2 flex flex-col ">
                    <p className="border-b text-center font-semibold">Brand</p>
                    <p className="text-center text-sm">{item.brand}</p>
                  </div>
                  <div className="mx-2 flex flex-col ">
                    <p className="border-b font-semibold">Days Until Expiry</p>
                    <p className="text-center text-sm">
                      <span className="font-semibold">
                        {item.daysUntilExpiry === null
                          ? ""
                          : item.daysUntilExpiry < 0
                          ? "Expired!"
                          : item.daysUntilExpiry}
                      </span>{" "}
                      {item.expirationDate !== null
                        ? `(${dayjs(item.expirationDate).format("MM/DD/YYYY")})`
                        : "Date not provided"}
                    </p>
                  </div>
                </div>
                {/* <div className="flex flex-col space-y-1">
                  <button className="p-1 border rounded-xl ">Update Quantity</button>
                  <button className="p-1 border rounded-xl ">Edit Item Details</button>
                  <button className="p-1 border rounded-xl ">Delete Item</button>
                </div> */}
                <div className="ml-2 flex w-4/5 flex-wrap gap-1">
                  {item.foodCategories.map((category, i) => (
                    <Chip label={category} key={i} />
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col space-y-1">
                  <button className="rounded-xl border border-slate-700 p-1 text-sm">
                    Update Quantity
                  </button>
                  <button className="rounded-xl border border-slate-700 p-1 text-sm">
                    Edit Item
                  </button>
                  <button className="rounded-xl border border-slate-700 p-1 text-sm">
                    Delete Item
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="">
            <p className="">{showingMoreInfo ? "" : "More Information"}</p>
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
      {/* {showingMoreInfo && (
        <div className="flex">
          <div className="">{item.brand}</div>
          <div className="">{item.daysUntilExpiry}</div>
          <div className=""></div>
        </div>
      )} */}
    </div>
  );
};

export default Item;
