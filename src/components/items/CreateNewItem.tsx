import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { packageTypes } from "~/utils/helperLists";
import AddItemManuallyForm from "./AddItemManuallyForm";
import AddIcon from "@mui/icons-material/Add";
import Button from "../ui/Button";
import { AiOutlineBarcode } from "react-icons/ai";
import BarcodeScanner from "../barcode/BarcodeScanner";

type NewItemInputProps = {
  name: string;
  amount: string;
  amountType: string;
  storageAreaId: string;
};

const CreateNewItem = () => {
  const {
    householdId,
    showingBarcodeScanner,
    setShowingBarcodeScanner,
    barcode,
    setBarcode,
  } = useContext(GlobalContext);
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);

  const { register, reset, handleSubmit } = useForm<NewItemInputProps>();

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const createNewItem = api.items.createNewItem.useMutation();

  useEffect(() => {
    async function getUPCInfo() {
      if (barcode !== null) {
        const res = await fetch(
          `https://brocade.io/api/items/${barcode.toString()}`
        );
        console.log(res.json());
        alert(res.json());
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUPCInfo()
  }, [barcode]);

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
        <div className="flex flex-col gap-1">
          <Button onClick={() => setShowingAddItemModal(true)}>
            <AddIcon fontSize="small" /> Add Manually
          </Button>
          <Button
            onClick={() => setShowingBarcodeScanner(!showingBarcodeScanner)}
          >
            <span className="flex items-center gap-1">
              <AiOutlineBarcode /> Add By Barcode
            </span>
          </Button>
        </div>
      </div>
      {/* {showingBarcodeScanner && <BarcodeScanner />} */}
      <AddItemManuallyForm
        showingAddItemModal={showingAddItemModal}
        setShowingAddItemModal={setShowingAddItemModal}
      />
    </div>
  );
};

export default CreateNewItem;
