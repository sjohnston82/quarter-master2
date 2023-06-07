import React, { useContext } from "react";
import Banner from "../ui/Banner";
import { api } from "~/utils/api";
import Item from "./Item";
import LoadingSpinner from "../ui/LoadingSpinner";
import { GlobalContext } from "~/context/GlobalContextProvider";

interface ItemsByStorageAreaProps {
  storageAreaId: string;
}

const ItemsByStorageArea = ({ storageAreaId }: ItemsByStorageAreaProps) => {
  const { debouncedValue } = useContext(GlobalContext)
  const shouldEnableQuery =
    !!storageAreaId && storageAreaId !== undefined && storageAreaId !== null;

  const getCurrentStorageArea = api.storageAreas.getStorageAreaById.useQuery(
    {
      storageAreaId,
    },
    {
      enabled: !!storageAreaId,
    }
  );
  const { data, isLoading } = api.items.getItemsByStorageArea.useQuery(
    {
      storageAreaId,
    },
    {
      enabled: !!storageAreaId,
    }
  );

  const shouldShowLoading = shouldEnableQuery && isLoading;
  return (
    <div>
      <Banner>
        {getCurrentStorageArea.data && getCurrentStorageArea.data.name}
      </Banner>
      {!data && (
        <p className="text-center bg-snow">Select a storage area to see its items.</p>
      )}
      {shouldShowLoading && (
        <div className="relative mt-20 flex h-full flex-col items-center justify-center gap-2">
          <div className="absolute  top-1/2 flex h-full w-full flex-col items-center justify-center ">
            <p className="font-semibold ">Fetching items...</p>
            <LoadingSpinner size={60} />
          </div>
        </div>
      )}
      {data?.length === 0 ? (
        <p className="mx-2 mt-5 text-center">
          There are no items currently saved in this storage area.
        </p>
      ) : (
        data
          ?.filter((item) => {
            if (debouncedValue === "") {
              return item;
            } else if (
              item.name.toLowerCase().includes(debouncedValue) ||
              item.brand?.toLowerCase().includes(debouncedValue)
            ) {
              return item;
            }
          })
          .map((item) => <Item key={item.id} {...item} />)
      )}
    </div>
  );
};

export default ItemsByStorageArea;
