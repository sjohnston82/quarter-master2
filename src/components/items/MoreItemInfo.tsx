import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { type RouterOutputs } from '~/utils/api';

type Item = RouterOutputs["items"]["getAllItems"][0];

const MoreItemInfo = ({ ...item}: Item) => {

  let size;
  if (item.foodCategories.length > 3) {
    size = 3;
  } else {
    size = item.foodCategories.length;
  }

  return (
    <div className="ml-2">
      
        <div className="flex">
          <div className="flex w-2/3 flex-col space-y-1">
            <div className=" flex bg-red-200">
              <div className="mx-2 flex w-1/3 flex-col ">
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

            <div className=" bg-blue-200">
              {/* <div className="flex flex-col space-y-1">
                  <button className="p-1 border rounded-xl ">Update Quantity</button>
                  <button className="p-1 border rounded-xl ">Edit Item Details</button>
                  <button className="p-1 border rounded-xl ">Delete Item</button>
                </div> */}
              <div className="flex justify-between ">
                {item.foodCategories.slice(0, size).map((category, i) => (
                  <Chip label={category} key={i} />
                ))}
              </div>
            </div>
            <button className="mx-auto w-2/3 rounded-xl border border-slate-700">
              Add to Shopping List
            </button>
          </div>

          <div className=" bg-green-500">
            <div className="mt-1 flex flex-col space-y-2 ">
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
      
     
      
    </div>
  );
}

export default MoreItemInfo