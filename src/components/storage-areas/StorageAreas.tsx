import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";
import CreateStorageArea from "./CreateStorageArea";

const StorageAreas = () => {
  const { householdId } = useContext(GlobalContext);

  const { data } = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  console.log(data);
  return (
    <div>
      <CreateStorageArea />

      {data &&
        (data.length === 0 ? (
          <p>You currently do not have any storage areas created!  Create one now to get started saving your food items!</p>
        ) : (
          data.map((storageArea) => (
            <div className="" key={storageArea.id}>
              {storageArea.name}
            </div>
          ))
        ))}
    </div>
  );
};

export default StorageAreas;
