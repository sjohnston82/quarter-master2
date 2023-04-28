import React, { useContext, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Modal from "../ui/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { packageTypes } from "~/utils/foodTypes";

interface AddItemManuallyFormProps {
  showingAddItemModal: boolean;
  setShowingAddItemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddItemManuallyInputProps {
  name: string;
  brand: string;
  amount: number;
  amountType: string;
}

const AddItemManuallyForm = ({
  showingAddItemModal,
  setShowingAddItemModal,
}: AddItemManuallyFormProps) => {
  const { householdId } = useContext(GlobalContext);
  const [amount, setAmount] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddItemManuallyInputProps>();

  const getStorageAreas = api.storageAreas.getStorageAreas.useQuery({
    householdId,
  });

  const onSubmit = (data: AddItemManuallyInputProps) => {
    alert(JSON.stringify(data));
    reset();
    setShowingAddItemModal(false);
    setAmount("")
  };

  return (
    <Modal
      isOpen={showingAddItemModal}
      onClose={() => setShowingAddItemModal(false)}
      title="Add Item Manually"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <TextField
          variant="outlined"
          margin="dense"
          {...register("name")}
          required
          fullWidth
          name="name"
          label="Item Name"
          type="text"
          id="name"
        />
        <TextField
          variant="outlined"
          margin="dense"
          {...register("brand")}
          fullWidth
          name="brand"
          label="Brand"
          type="text"
          id="brand"
        />
        <div className="flex items-center justify-between">
          <TextField
            variant="outlined"
            margin="dense"
            {...register("amount")}
            name="amount"
            id="amount"
            type="number"
            label="Amount"
            required
            className="w-2/5"
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            className="w-[55%]"
            margin="dense"
            id="amountType"
            select
            label="Amount Type"
            {...register("amountType")}
          >
            {packageTypes.map((type, i) => (
              <MenuItem key={i} value={amount === '1' ? type.singular : type.plural}>{amount === '1' ? type.singular : type.plural}</MenuItem>
            ))}
          </TextField>
        </div>
        <button type="submit">Create Item</button>
      </form>
    </Modal>
  );
};

export default AddItemManuallyForm;
