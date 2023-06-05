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
      <div className="flex w-full flex-col gap-5 sm:flex-row">
        <div className="mx-auto flex w-4/5 sm:w-full justify-center">
          <div className="flex  w-1/2 flex-col sm:w-full  ">
            <p className="text-center font-semibold">Expiration Date</p>
            <p className="text-center ">
              {item.expirationDate !== undefined && item.expirationDate !== null
                ? dayjs(item.expirationDate).format("MM/DD/YYYY")
                : "No date given"}
            </p>
          </div>
          <div className="flex  w-1/2 flex-col sm:w-full ">
            <p className="text-center font-semibold">Storage Area</p>
            <p className="text-center ">{item.storageAreaName}</p>
          </div>
        </div>
        <div className="mx-auto flex w-4/5 sm:w-full justify-center">
          <div className="flex w-1/2  flex-col  sm:w-full ">
            <p className="text-center font-semibold">Brand</p>
            <p className="text-center ">{item.brand}</p>
          </div>
          <div className="flex w-1/2  flex-col sm:w-full ">
            <p className="text-center font-semibold">Flavor</p>
            <p className="text-center ">{item.flavor}</p>
          </div>
        </div>
      </div>

      <div className="mx-2 my-4 flex flex-wrap justify-center gap-2">
        {item.foodCategories.map((category, i) => (
          <Chip key={i} label={category} />
        ))}
      </div>
    </div>
  );
};

export default MoreItemInfo;
