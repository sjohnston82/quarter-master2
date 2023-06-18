import { useState } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import EditIcon from "@mui/icons-material/Edit";
import EditShoppingItemModal from "./EditShoppingItemModal";

interface ShoppingListItemProps {
  item: RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];
}

const ShoppingListItem = ({ item }: ShoppingListItemProps) => {
  const toggleCompleteRoute = api.useContext().shoppingList;
  const toggleComplete = api.shoppingList.toggleComplete.useMutation({
    onSuccess: async () => {
      await toggleCompleteRoute.invalidate();
    },
  });
  const [showingEditShoppingItemModal, setShowingEditShoppingItemModal] =
    useState(false);

  return (
    <div className="mx-auto flex w-full items-center justify-between border-b bg-snow ">
      <div
        className="flex w-full cursor-pointer"
        role="dialog"
        onClick={() => {
          toggleComplete.mutate({ id: item.id });
        }}
      >
        <div
          className={`ml-5 flex w-full  flex-wrap gap-3 py-3 ${
            item.completed ? "line-through" : ""
          }`}
        >
          {item.amount !== null || 0 ? (
            <span className="w-full text-xl md:text-2xl">
              {item.amount === 0 ? "" : item.amount}
              {item.amount === 0 ? "" : item.amountType} {item.name}
            </span>
          ) : (
            <span className="text-xl md:text-2xl">{item.name} </span>
          )}
        </div>
      </div>
      <div className="mr-5 flex w-1/5 items-center justify-end ">
        <EditIcon
          onClick={() => setShowingEditShoppingItemModal(true)}
          fontSize="small"
        />
      </div>
      <EditShoppingItemModal
        showingEditShoppingItemModal={showingEditShoppingItemModal}
        setShowingEditShoppingItemModal={setShowingEditShoppingItemModal}
        shoppingItem={item}
      />
    </div>
  );
};

export default ShoppingListItem;
