import { type RouterOutputs } from "~/utils/api";
import ShoppingListItem from "./ShoppingListItem";
import Banner from "../ui/Banner";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface LocationContainerProps {
  location: string;
  items: Item[];
}

const LocationContainer = ({ location, items }: LocationContainerProps) => {

  return (
    <div className="flex w-full flex-col items-center " role="dialog">
      <Banner fontSize="text-xl">{location}</Banner>
      {items &&
        items
          .sort((item) => (item.completed ? 1 : -1))
          .map((item) => <ShoppingListItem item={item} key={item.id} />)}
    </div>
  );
};

export default LocationContainer;
