import React, { useContext, useEffect, useState } from "react";
import AddShoppingListItemForm from "../shoppingList/AddShoppingListItemForm";
import AllShoppingListItems from "../shoppingList/AllShoppingListItems";
import ShoppingListByLocation from "../shoppingList/ShoppingListByLocation";
import Button from "../ui/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { MenuItem, TextField } from "@mui/material";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";

const ShoppingListPage = () => {
  const [showingAddToShoppingListModal, setShowingAddToShoppingListModal] =
    useState(false);
  const [showingItemsByLocation, setShowingItemsByLocation] = useState(false);
  const { householdId } = useContext(GlobalContext);

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
    <div className="bg-snow text-woodsmoke">
      <div className="m-4 flex justify-between">
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
      <div className="flex w-full justify-center mb-1">
        <TextField
          // size="small"
          select
          className="w-1/2 bg-snow"
          defaultValue="all"
          helperText="Choose a filter method"
          onChange={(e) => handleFilterChange(e)}
        >
          <MenuItem selected value="all">
            All Items
          </MenuItem>
          <MenuItem value="byLocation">Items By Location</MenuItem>
        </TextField>
      </div>
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
