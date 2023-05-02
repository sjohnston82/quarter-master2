import React, { useState } from "react";
import AddShoppingListItemForm from "../shoppingList/AddShoppingListItemForm";

const ShoppingListPage = () => {
  const [showingAddToShoppingListModal, setShowingAddToShoppingListModal] =
    useState(false);

  return (
    <div>
      <button
        className=""
        onClick={() => setShowingAddToShoppingListModal(true)}
      >
        Add Item
      </button>
      <AddShoppingListItemForm
        showingAddToShoppingListModal={showingAddToShoppingListModal}
        setShowingAddToShoppingListModal={setShowingAddToShoppingListModal}
      />
    </div>
  );
};

export default ShoppingListPage;
