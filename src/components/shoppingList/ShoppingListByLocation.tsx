import LocationContainer from "./LocationContainer";
import { RouterOutputs } from "~/utils/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import Banner from "../ui/Banner";

type Item = RouterOutputs["shoppingList"]["getAllShoppingListItems"][0];

interface ShoppingListByLocationProps {
  data: Item[] | undefined;
  isLoading: boolean;
}

const ShoppingListByLocation = ({
  data,
  isLoading,
}: ShoppingListByLocationProps) => {
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
  const deliItems = data?.filter((item) => item.location === "Deli");
  const bakeryItems = data?.filter((item) => item.location === "Bakery");
  const otherItems = data?.filter((item) => item.location === "Other");
  const uncategorized = data?.filter((item) => item.location === "");

  return (
    <div className="relative  w-full overflow-y-scroll  rounded-b-xl bg-darkgray text-woodsmoke lg:rounded-b-none  lg:rounded-bl-xl   ">
      {data?.length === 0 && (
        <Banner fontSize="text-xl">Shopping List By Location</Banner>
      )}
      {isLoading && <LoadingSpinner size={40} />}
      {data?.length === 0 && (
        <p className="pt-8 text-center text-lg">
          Your shopping list is currently empty.
        </p>
      )}

      {/* this div renders first if the lists are not empty */}
      <div className="h-[calc(100vh-340px)] bg-darkgray md:h-[calc(100vh-242px)] lg:h-[calc(100vh-224px)] ">
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
