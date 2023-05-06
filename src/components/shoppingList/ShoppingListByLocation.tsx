import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import LocationContainer from "./LocationContainer";
import { api } from "~/utils/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import { type ShoppingList } from "@prisma/client";

const ShoppingListByLocation = () => {
  const { householdId } = useContext(GlobalContext);
  const { data, isLoading } = api.shoppingList.getAllShoppingListItems.useQuery(
    { householdId }
  );
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);

  const toggleCompleteRoute = api.useContext().shoppingList;
  const toggleComplete = api.shoppingList.toggleComplete.useMutation({
    onSuccess: async () => {
      await toggleCompleteRoute.invalidate();
    },
  });

  const deleteShoppingListItem =
    api.shoppingList.deleteItemFromShoppingList.useMutation({
      onSuccess: async () => {
        // await toggleCompleteRoute.invalidate();
      },
    });

  const deleteAllCompletedItems =
    api.shoppingList.deleteAllCompleteItems.useMutation({
      onSuccess: async () => {
        await toggleCompleteRoute.invalidate();
        // setIdsToDelete([]);
      },
    });

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
  const otherItems = data?.filter((item) => item.location === "Other");
  const uncategorized = data?.filter((item) => item.location === "");

  const deleteAllComplete = () => {
    data?.forEach((item) => {
      if (item.completed) {
        setIdsToDelete((prev) => [...prev, item.id]);
      }
    });

  };

  useEffect(() => {
    if (idsToDelete.length > 0) {
      deleteAllCompletedItems.mutate(idsToDelete);
      setIdsToDelete([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAllCompletedItems]);

  return (
    <div className="flex w-full flex-col">
      <button onClick={deleteAllComplete}>Delete Completed</button>
      {isLoading && <LoadingSpinner size={40} />}
      {/* this div renders first if the lists are not empty */}
      <div className="">
        {produceItems && produceItems.length > 0 && (
          <LocationContainer
            location="Produce"
            items={produceItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {dryGoodsItems && dryGoodsItems.length > 0 && (
          <LocationContainer
            location="Dry Goods"
            items={dryGoodsItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {meatItems && meatItems.length > 0 && (
          <LocationContainer
            location="Meats"
            items={meatItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {dairyItems && dairyItems.length > 0 && (
          <LocationContainer
            location="Dairy"
            items={dairyItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {frozenItems && frozenItems.length > 0 && (
          <LocationContainer
            location="Frozen"
            items={frozenItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {householdGoodsItems && householdGoodsItems.length > 0 && (
          <LocationContainer
            location="Household Goods"
            items={householdGoodsItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {babyItems && babyItems.length > 0 && (
          <LocationContainer
            location="Baby"
            items={babyItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {personalCareItems && personalCareItems.length > 0 && (
          <LocationContainer
            location="Personal Care"
            items={personalCareItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {otherItems && otherItems.length > 0 && (
          <LocationContainer
            location="Other"
            items={otherItems}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}

        {uncategorized && uncategorized.length > 0 && (
          <LocationContainer
            location="No location info"
            items={uncategorized}
            idsToDelete={idsToDelete}
            setIdsToDelete={setIdsToDelete}
          />
        )}
      </div>
      {/* <div className="">
        {produceItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Produce</h1>
          </div>
        )}
        {dryGoodsItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Dry Goods</h1>
          </div>
        )}
        {meatItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Meats</h1>
          </div>
        )}
        {dairyItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Dairy</h1>
          </div>
        )}
        {frozenItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Frozen</h1>
          </div>
        )}
        {householdGoodsItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Household Goods</h1>
          </div>
        )}
        {babyItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Baby</h1>
          </div>
        )}
        {personalCareItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Personal Care</h1>
          </div>
        )}
        {otherItems?.length === 0 && (
          <div className="flex w-full flex-col items-center">
            <h1 className="text-xl underline">Other</h1>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ShoppingListByLocation;
