/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { type RouterOutputs } from "~/utils/api";

type Item = RouterOutputs["items"]["getAllItems"][0];

const ItemCard = ({ ...item }: Item) => {
  
  return (
    <div className="w-72 rounded bg-snow p-2 shadow-lg shadow-black">
      <div className="flex flex-col space-y-1">
        <h1 className="text-center text-xl font-semibold">{item.name}</h1>

        {item.daysUntilExpiry === null ? (
          <p className="text-schooner">Expires: No date given</p>
        ) : item.daysUntilExpiry > 1 ? (
          `Expires: ${item.daysUntilExpiry} days (${dayjs(
            item.expirationDate
          ).format("MM/DD/YYYY")})`
        ) : item.daysUntilExpiry === 1 ? (
          "Expires tomorrow!"
        ) : (
          <span className="font-semibold text-red-600">Expired!</span>
        )}

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
          <Chip key={i} label={category} />
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
