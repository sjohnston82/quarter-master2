import React, { useState } from "react";
import AddShoppingListItemForm from "../shoppingList/AddShoppingListItemForm";
import AllShoppingListItems from "../shoppingList/AllShoppingListItems";
import ShoppingListByLocation from "../shoppingList/ShoppingListByLocation";

const ShoppingListPage = () => {
  const [showingAddToShoppingListModal, setShowingAddToShoppingListModal] =
    useState(false);
  const [showingItemsByLocation, setShowingItemsByLocation] = useState(false);

  return (
    <div>
      <button
        className=""
        onClick={() => setShowingAddToShoppingListModal(true)}
      >
        Add Item
      </button>
      <div className="flex">
        {showingItemsByLocation ? (
          <button onClick={() => setShowingItemsByLocation(false)}>
            All Items
          </button>
        ) : (
          <button className="" onClick={() => setShowingItemsByLocation(true)}>
            Group Items By Location
          </button>
        )}
      </div>
      {showingItemsByLocation ? (
        <ShoppingListByLocation />
      ) : (
        <AllShoppingListItems />
      )}
      <AddShoppingListItemForm
        showingAddToShoppingListModal={showingAddToShoppingListModal}
        setShowingAddToShoppingListModal={setShowingAddToShoppingListModal}
      />
    </div>
  );
};

export default ShoppingListPage;
