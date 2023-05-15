/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
import { type Result } from "@zxing/library";
import { toast } from "react-hot-toast";
import AddItemByBarcodeForm from "./AddItemByBarcodeForm";
import { type UPCInfo } from "~/context/GlobalContextProvider";

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
    currentItemByUPC,
    setCurrentItemByUPC,
    setShowingAddByBarcodeModal,
    showingAddByBarcodeModal,
  } = useContext(GlobalContext);
  const [showingAddItemModal, setShowingAddItemModal] = useState(false);
  // const [showingAddByBarcodeModal, setShowingAddByBarcodeModal] =
  //   useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const [currentProductByUPC, setCurrentProductByUPC] = useState<any>(null);

  const { register, reset, handleSubmit } = useForm<NewItemInputProps>();

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const createNewItem = api.items.createNewItem.useMutation();

  useEffect(() => {
    // const apiUrl = "https://proxy.cors.sh/https://brocade.io/api/items/";
    const apiUrl =
      "https://api.codetabs.com/v1/proxy?quest=https://brocade.io/api/items/";
    function getUPCInfo() {
      if (barcode !== null) {
        fetch(`${apiUrl}${barcode}`, {
          // headers: {
          //   "x-cors-api-key": "temp_2950d9928c59d142ba6ae1e8c7f6be74",
          // },
        })
          .then((response) => {
            if (!response.ok) {
              toast.error("Produce info not found.  Please add manually.");
              // throw new Error("Request failed");
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setCurrentItemByUPC(data);
            setBarcode(null);
            // alert(JSON.stringify(data));
            // console.log(currentItemByUPC);
          })

          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUPCInfo();
  }, [barcode]);
  useEffect(() => {
    if (currentItemByUPC !== null) {
      reset(currentItemByUPC);
      setShowingAddByBarcodeModal(true);
    }
  }, [currentItemByUPC, reset, setShowingAddByBarcodeModal]);

  // const [amount, setAmount] = useState("");
  // const onSubmit = (data: NewItemInputProps) => {
  //   console.log(data);
  //   const mutationData = {
  //     householdId,
  //     name: data.name,
  //     amount: parseInt(data.amount),
  //     amountType: data.amountType,
  //     storageAreaId: data.storageAreaId,
  //   };
  //   createNewItem.mutate(mutationData);
  //   reset();
  //   setShowingAddItemModal(false);
  //   setAmount("");
  // };

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
      <AddItemByBarcodeForm />
    </div>
  );
};

export default CreateNewItem;
