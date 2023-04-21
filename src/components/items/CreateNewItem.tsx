import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

const CreateNewItem = () => {
  const { householdId } = useContext(GlobalContext);
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  return (
    <div>
      <div className="">
        <Modal
          isOpen={showingAddItemModal}
          onClose={() => setShowingAddItemModal(false)}
          title="Add New Item"
        >
          <form action="">
            <div className="flex">

            <div className="flex">
            <label htmlFor="name">Item Name: </label>
            <input type="text" id="name" {...register("name")} />

            </div>

            <div className="flex">
            <label htmlFor="storageArea">Storage Area:</label>
            <select id="storageArea">
              {getStorageAreas.data &&
                getStorageAreas.data.map((area) => (
                  <option key={area.id} value={area.name}>
                    {area.name}
                  </option>
                ))}
            </select>

            </div>
            </div>
          </form>
        </Modal>
        <button onClick={() => setShowingAddItemModal(true)}>
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default CreateNewItem;
