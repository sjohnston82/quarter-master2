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
    <div className="bg-darkgray">
      <Banner fontSize="text-xl">All Shopping List Items</Banner>
      <div className="relative h-[calc(100vh-340px)] w-full overflow-y-scroll  rounded-b-xl md:rounded-b-xl lg:rounded-b-none lg:rounded-bl-xl bg-snow  lg:pb-0 text-woodsmoke md:h-[calc(100vh-290px)]  lg:h-[calc(100vh-272px)]">
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
          data
            .sort((item) => (item.completed ? 1 : -1))
            .map((item) => (

              <ShoppingListItem item={item} key={item.id} />
            ))}
      </div>
    </div>
  );
};

export default AllShoppingListItems;
