import React, { useContext } from "react";
import { api } from "~/utils/api";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateNewItem from "./CreateNewItem";

const FoodItems = () => {
  const { householdId } = useContext(GlobalContext);
  const { data } = api.items.getAllItems.useQuery({ householdId });
  // console.log(data);
  return (
    <div>

      <div>{data?.length === 0 && <p>No Items</p>}</div>
      <div className="">
        {data?.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
