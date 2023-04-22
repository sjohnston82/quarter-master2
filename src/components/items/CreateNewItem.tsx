import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { packageTypes } from "~/utils/foodTypes";

type NewItemInputProps = {
  name: string;
  amount: string;
  amountType: string;
  storageAreaId: string;
};

const CreateNewItem = () => {
  const { householdId } = useContext(GlobalContext);
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);
  const { register, reset, handleSubmit } = useForm<NewItemInputProps>();

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const createNewItem = api.items.createNewItem.useMutation();

  const [amount, setAmount] = useState("");
  const onSubmit = (data: NewItemInputProps) => {
    console.log(data);
    const mutationData = {
      householdId,
      name: data.name,
      amount: parseInt(data.amount),
      amountType: data.amountType,
      storageAreaId: data.storageAreaId,
    };
    createNewItem.mutate(mutationData);
    reset();
    setShowingAddItemModal(false);
    setAmount("");
  };

  return (
    <div>
      <div className="">
        <Modal
          isOpen={showingAddItemModal}
          onClose={() => setShowingAddItemModal(false)}
          title="Add New Item"
        >
          <form
            action=""
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex">
                  <label htmlFor="name">Item Name: </label>
                  <input type="text" id="name" {...register("name")} />
                </div>

                <div className="flex">
                  <label htmlFor="storageArea">Storage Area:</label>
                  <select id="storageAreaId" {...register("storageAreaId")}>
                    {getStorageAreas.data &&
                      getStorageAreas.data.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex">
                <div className="">
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    {...register("amount")}
                    id="amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="">
                  <select
                    id="amountType"
                    className="select"
                    {...register("amountType")}
                  >
                    <option disabled selected>
                      Package Type
                    </option>
                    {packageTypes.map((type, i) => (
                      <option
                        value={amount === "1" ? type.singular : type.plural}
                        key={i}
                      >
                        {amount === "1" ? type.singular : type.plural}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button type="submit">Add Item</button>
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
