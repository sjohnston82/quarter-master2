import React, { useContext, useEffect, useState } from "react";
import AddShoppingListItemForm from "../shoppingList/AddShoppingListItemForm";
import AllShoppingListItems from "../shoppingList/AllShoppingListItems";
import ShoppingListByLocation from "../shoppingList/ShoppingListByLocation";
import Button from "../ui/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { MenuItem, TextField } from "@mui/material";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import ShoppingListButtonBar from "../shoppingList/ShoppingListButtonBar";

const ShoppingListPage = () => {
  const [showingAddToShoppingListModal, setShowingAddToShoppingListModal] =
    useState(false);
  const [showingItemsByLocation, setShowingItemsByLocation] = useState(false);
  const { householdId, windowSize } = useContext(GlobalContext);

  const { data, isLoading } = api.shoppingList.getAllShoppingListItems.useQuery(
    { householdId }
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value === "all") {
      setShowingItemsByLocation(false);
    } else {
      setShowingItemsByLocation(true);
    }
  };

  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const toggleCompleteRoute = api.useContext().shoppingList;

  const deleteAllCompletedItems =
    api.shoppingList.deleteAllCompleteItems.useMutation({
      onSuccess: async () => {
        await toggleCompleteRoute.invalidate();
      },
    });

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
    <div className="h-[calc(100vh-153px)] w-full bg-red-400 text-woodsmoke  lg:h-[calc(100vh-270px)]">
      {windowSize.innerWidth < 768 ? (
        <>
          <div className="flex justify-between p-4">
            <Button
              fontSize="text-lg"
              onClick={() => setShowingAddToShoppingListModal(true)}
            >
              <AddShoppingCartIcon fontSize="small" /> Add Item
            </Button>
            <div className=" flex justify-end">
              <Button fontSize="text-lg" onClick={deleteAllComplete}>
                Delete Completed
              </Button>
            </div>
          </div>
          <div className="mb-1 flex w-full justify-center">
            <TextField
              // size="small"
              select
              className="w-1/2 bg-snow"
              defaultValue="all"
              onChange={(e) => handleFilterChange(e)}
            >
              <MenuItem selected value="all">
                All Items
              </MenuItem>
              <MenuItem value="byLocation">Items By Location</MenuItem>
            </TextField>
          </div>
        </>
      ) : (
        <ShoppingListButtonBar
          setShowingAddToShoppingListModal={setShowingAddToShoppingListModal}
          handleFilterChange={handleFilterChange}
          deleteAllComplete={deleteAllComplete}
        />
      )}
      {showingItemsByLocation ? (
        <ShoppingListByLocation data={data} isLoading={isLoading} />
      ) : (
        <AllShoppingListItems data={data} isLoading={isLoading} />
      )}
      <AddShoppingListItemForm
        showingAddToShoppingListModal={showingAddToShoppingListModal}
        setShowingAddToShoppingListModal={setShowingAddToShoppingListModal}
      />
    </div>
  );
};

export default ShoppingListPage;
