/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useContext, useEffect } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import AddIcon from "@mui/icons-material/Add";
import Button from "../ui/Button";
import { AiOutlineBarcode } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { type UPCInfo } from "~/context/GlobalContextProvider";
import AddItemForm from "./AddItemForm";

type NewItemInputProps = {
  name: string;
  amount: string;
  amountType: string;
  storageAreaId: string;
};

const CreateNewItem = () => {
  const {
    showingBarcodeScanner,
    setShowingBarcodeScanner,
    barcode,
    setBarcode,
    currentItemByUPC,
    setCurrentItemByUPC,
    setShowingAddItemModal,
    setFetchingProductInfo,
  } = useContext(GlobalContext);

  const { reset} = useForm<NewItemInputProps>();

  useEffect(() => {
    const apiUrl =
      "https://api.codetabs.com/v1/proxy?quest=https://brocade.io/api/items/";
    function getUPCInfo() {
      if (barcode === null) {
        setFetchingProductInfo(true);
        fetch(`${apiUrl}041321241055`)
          .then((response) => {
            if (!response.ok) {
              toast.error("Produce info not found.  Please add manually.");
              throw new Error("Request failed");
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentItemByUPC(data as UPCInfo);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (data.error) {
              toast.error(
                "Unable to obtain product info.  Please add item manually."
              );
            }
            setBarcode(null);
          })

          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUPCInfo();
  }, [barcode, setBarcode, setCurrentItemByUPC, setFetchingProductInfo]);
  useEffect(() => {
    if (currentItemByUPC !== null) {
      setFetchingProductInfo(false);
      reset(currentItemByUPC);
      setShowingAddItemModal(true);
    }
  }, [currentItemByUPC, reset, setShowingAddItemModal, setFetchingProductInfo]);

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

      <AddItemForm />
    </div>
  );
};

export default CreateNewItem;
