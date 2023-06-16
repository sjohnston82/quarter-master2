import { type RouterOutputs } from "~/utils/api";
import ShoppingListItem from "./ShoppingListItem";
import LoadingSpinner from "../ui/LoadingSpinner";
import Banner from "../ui/Banner";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface AllShoppingListItemsProps {
  data: Item[] | undefined;
  isLoading: boolean;
}

const AllShoppingListItems = ({
  data,
  isLoading,
}: AllShoppingListItemsProps) => {
  return (
    <div className="h-[calc(100vh-252px)] md:h-[calc(100vh-242px)] lg:h-[calc(100vh-229px)] overflow-y-scroll relative w-full bg-blue-400  text-woodsmoke">
      <Banner fontSize="text-xl">All Shopping List Items</Banner>
      {isLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="font-semibold">Fetching items...</p>
            <LoadingSpinner size={40} />
          </div>
        </div>
      )}
      {data?.length === 0 && (
        <p className="pt-8 text-center text-lg">
          Your shopping list is currently empty.
        </p>
      )}
      {data &&
        data.map((item) => <ShoppingListItem item={item} key={item.id} />)}
    </div>
  );
};

export default AllShoppingListItems;
