import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import LocationContainer from "./LocationContainer";
import { RouterOutputs, api } from "~/utils/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import { type ShoppingList } from "@prisma/client";
import Button from "../ui/Button";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface ShoppingListByLocationProps {
  data: Item[] | undefined;
  isLoading: boolean;
}

const ShoppingListByLocation = ({data, isLoading}: ShoppingListByLocationProps) => {
  // const { householdId } = useContext(GlobalContext);
  // const { data, isLoading } = api.shoppingList.getAllShoppingListItems.useQuery(
  //   { householdId }
  // );
  // const [idsToDelete, setIdsToDelete] = useState<string[]>([]);

  // const toggleCompleteRoute = api.useContext().shoppingList;
  // const toggleComplete = api.shoppingList.toggleComplete.useMutation({
  //   onSuccess: async () => {
  //     await toggleCompleteRoute.invalidate();
  //   },
  // });

  // const deleteShoppingListItem =
  //   api.shoppingList.deleteItemFromShoppingList.useMutation({
  //     onSuccess: async () => {
  //       // await toggleCompleteRoute.invalidate();
  //     },
  //   });

  // const deleteAllCompletedItems =
  //   api.shoppingList.deleteAllCompleteItems.useMutation({
  //     onSuccess: async () => {
  //       await toggleCompleteRoute.invalidate();
  //       // setIdsToDelete([]);
  //     },
  //   });

  const produceItems = data?.filter((item) => item.location === "Produce");
  const meatItems = data?.filter((item) => item.location === "Meats");
  const dryGoodsItems = data?.filter(
    (item) => item.location === "Dry/Canned Goods"
  );
  const dairyItems = data?.filter((item) => item.location === "Dairy");
  const householdGoodsItems = data?.filter(
    (item) => item.location === "Household Goods"
  );
  const babyItems = data?.filter((item) => item.location === "Baby");
  const frozenItems = data?.filter((item) => item.location === "Frozen");
  const personalCareItems = data?.filter(
    (item) => item.location === "Personal Care"
  );
  const deliItems = data?.filter(
    (item) => item.location === "Deli"
  );
  const bakeryItems = data?.filter((item) => item.location === "Bakery");
  const otherItems = data?.filter((item) => item.location === "Other");
  const uncategorized = data?.filter((item) => item.location === "");

  // const deleteAllComplete = () => {
  //   data?.forEach((item) => {
  //     if (item.completed) {
  //       setIdsToDelete((prev) => [...prev, item.id]);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (idsToDelete.length > 0) {
  //     deleteAllCompletedItems.mutate(idsToDelete);
  //     setIdsToDelete([]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deleteAllCompletedItems]);

  return (
    <div className="flex w-full flex-col">

      {isLoading && <LoadingSpinner size={40} />}
      {/* this div renders first if the lists are not empty */}
      <div className="">
        {produceItems && produceItems.length > 0 && (
          <LocationContainer location="Produce" items={produceItems} />
        )}

        {dryGoodsItems && dryGoodsItems.length > 0 && (
          <LocationContainer location="Dry Goods" items={dryGoodsItems} />
        )}

        {meatItems && meatItems.length > 0 && (
          <LocationContainer location="Meats" items={meatItems} />
        )}

        {dairyItems && dairyItems.length > 0 && (
          <LocationContainer location="Dairy" items={dairyItems} />
        )}

        {frozenItems && frozenItems.length > 0 && (
          <LocationContainer location="Frozen" items={frozenItems} />
        )}

        {householdGoodsItems && householdGoodsItems.length > 0 && (
          <LocationContainer
            location="Household Goods"
            items={householdGoodsItems}
          />
        )}

        {babyItems && babyItems.length > 0 && (
          <LocationContainer location="Baby" items={babyItems} />
        )}

        {personalCareItems && personalCareItems.length > 0 && (
          <LocationContainer
            location="Personal Care"
            items={personalCareItems}
          />
        )}

        {bakeryItems && bakeryItems.length > 0 && (
          <LocationContainer location="Bakery" items={bakeryItems} />
        )}

        {deliItems && deliItems.length > 0 && (
          <LocationContainer location="Deli" items={deliItems} />
        )}

        {otherItems && otherItems.length > 0 && (
          <LocationContainer location="Other" items={otherItems} />
        )}

        {uncategorized && uncategorized.length > 0 && (
          <LocationContainer
            location="No location info"
            items={uncategorized}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingListByLocation;
