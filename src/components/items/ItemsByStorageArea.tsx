import React from "react";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";
import Item from "./Item";

interface ItemsByStorageAreaProps {

  storageAreaId: string;
}

const ItemsByStorageArea = ({ storageAreaId }: ItemsByStorageAreaProps) => {
  console.log("wee", storageAreaId);
  const getCurrentStorageArea = api.storageAreas.getStorageAreaById.useQuery({
    storageAreaId,
  });
  const { data, isLoading } = api.items.getItemsByStorageArea.useQuery({
    storageAreaId,
  });
  return (
    <div>
      <Banner>
        {getCurrentStorageArea.data && getCurrentStorageArea.data.name}
      </Banner>
      {data?.length === 0 ? <p className="mx-2 text-center mt-5">There are no items currently saved in this storage area.</p> : 
      data?.map((item) => (
      
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemsByStorageArea;
