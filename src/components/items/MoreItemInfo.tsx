import { Chip } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { type RouterOutputs } from "~/utils/api";

type Item = RouterOutputs["items"]["getAllItems"][0];

const MoreItemInfo = ({ ...item }: Item) => {
  let size;
  if (item.foodCategories.length > 3) {
    size = 3;
  } else {
    size = item.foodCategories.length;
  }

  return (
    <div className="">
      <div className="flex w-full">
        <div className="flex  w-1/3 flex-col ">
          <p className="text-center font-semibold">Expiration Date</p>
          <p className="text-center ">
            {item.expirationDate !== undefined && item.expirationDate !== null && dayjs(item.expirationDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="flex  w-1/3 flex-col ">
          <p className="text-center font-semibold">Brand</p>
          <p className="text-center ">{item.brand}</p>
        </div>
        <div className="flex  w-1/3 flex-col ">
          <p className="text-center font-semibold">Flavor</p>
          <p className="text-center ">{item.flavor}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap justify-center my-4 mx-2">
        {item.foodCategories.map((category, i) => <Chip key={i} label={category} />)}
      </div>
    </div>
  );
};

export default MoreItemInfo;
