import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import LocationContainer from "./LocationContainer";

const ShoppingListByLocation = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-around gap-4">
        <LocationContainer location="Produce" />
        <LocationContainer location="Dry Goods" />
      </div>
      <div className="flex justify-around gap-4">
        {" "}
        <LocationContainer location="Meats" />
        <LocationContainer location="Dairy" />
      </div>
      <div className="flex justify-around gap-4">
        <LocationContainer location="Household Goods" />
        <LocationContainer location="Baby" />
      </div>
      <div className="flex justify-around gap-4">
        <LocationContainer location="Frozen" />
        <LocationContainer location="Other" />
      </div>
    </div>
  );
};

export default ShoppingListByLocation;
