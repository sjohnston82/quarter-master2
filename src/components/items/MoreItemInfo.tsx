import { Avatar, Chip } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { type RouterOutputs } from "~/utils/api";
import pastaicon from "/img/pastaicon.png";
import { chipIcons } from "~/utils/helperLists";

type Item = RouterOutputs["items"]["getAllItems"][0];

const MoreItemInfo = ({ ...item }: Item) => {
  const { windowSize } = useContext(GlobalContext);

  let size;
  if (item.foodCategories.length > 3) {
    size = 3;
  } else {
    size = item.foodCategories.length;
  }

  return (
    <div className="">
      <div className="flex w-full flex-col gap-5 sm:flex-row xl:text-xl">
        <div className="mx-auto flex w-4/5 justify-center sm:w-full ">
          <div className="flex  w-1/2 flex-col sm:w-full  ">
            <p className="text-center font-semibold">Expiration Date</p>
            <p className="text-center xl:text-lg">
              {item.expirationDate !== undefined && item.expirationDate !== null
                ? dayjs(item.expirationDate).format("MM/DD/YYYY")
                : "No date given"}
            </p>
          </div>
          <div className="flex  w-1/2 flex-col sm:w-full ">
            <p className="text-center font-semibold">Storage Area</p>
            <p className="text-center xl:text-lg">{item.storageAreaName}</p>
          </div>
        </div>
        <div className="mx-auto flex w-4/5 justify-center sm:w-full">
          <div className="flex w-1/2  flex-col  sm:w-full ">
            <p className="text-center font-semibold">Brand</p>
            <p className="text-center xl:text-lg ">{item.brand}</p>
          </div>
          <div className="flex w-1/2  flex-col sm:w-full ">
            <p className="text-center font-semibold">Flavor</p>
            <p className="text-center xl:text-lg">{item.flavor}</p>
          </div>
        </div>
      </div>

      <div className="mx-2 my-4 flex flex-wrap justify-center gap-2 xl:text-xl">
        {item.foodCategories.map((category, i) => (
          <Chip
            key={i}
            label={category}
            size={windowSize.innerWidth > 1279 ? "medium" : "small"}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            avatar={<Avatar src={String(chipIcons[category as keyof typeof chipIcons])} />}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreItemInfo;
