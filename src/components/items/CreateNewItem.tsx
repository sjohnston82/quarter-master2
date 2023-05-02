import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { packageTypes } from "~/utils/helperLists";
import AddItemManuallyForm from "./AddItemManuallyForm";

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
        <AddItemManuallyForm
          showingAddItemModal={showingAddItemModal}
          setShowingAddItemModal={setShowingAddItemModal}
        />
        <div className="mx-3 mt-3 flex justify-between">
          <button
            onClick={() => setShowingAddItemModal(true)}
            className="rounded-xl border border-slate-700 p-1"
          >
            Add Item Manually
          </button>
          <button
            className="rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400"
            disabled
          >
            Add By Barcode
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewItem;
