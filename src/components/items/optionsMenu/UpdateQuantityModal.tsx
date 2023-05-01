import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { api, type RouterOutputs } from "~/utils/api";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { packageTypes } from "~/utils/foodTypes";

type Item = RouterOutputs["items"]["getAllItems"][0];

interface UpdateQuantityModalProps {
  item: Item;
  showingUpdateQuantityModal: boolean;
  setShowingUpdateQuantityModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface QuantityUpdateInput {
  amount: number;
  amountType: string;
}

const UpdateQuantityModal = ({
  item,
  showingUpdateQuantityModal,
  setShowingUpdateQuantityModal,
}: UpdateQuantityModalProps) => {
  const { register, handleSubmit } = useForm<QuantityUpdateInput>({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    defaultValues: { amount: item.amount!, amountType: item.amountType ?? "" },
  });

  const [amount, setAmount] = useState("");
  const updateQuantityRoute = api.useContext().items;

  const updateQuantity = api.items.updateItemAmount.useMutation({
    onSuccess: async () => {
      toast.success("Amount updated!");
      await updateQuantityRoute.invalidate();
    },
  });

  const onSubmit = (data: QuantityUpdateInput) => {
    const mutationData = {
      id: item.id,
      amount: +data.amount,
      amountType: data.amountType,
    };
    updateQuantity.mutate(mutationData);
    setShowingUpdateQuantityModal(false);
    setAmount("");
  };

  return (
    <Modal
      isOpen={showingUpdateQuantityModal}
      title="Update Quantity"
      onClose={() => setShowingUpdateQuantityModal(false)}
    >
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="mt-5">
        <div className="flex gap-2">
          <TextField
            variant="outlined"
            className="w-2/5"
            {...register("amount")}
            name="amount"
            id="amount"
            type="number"
            label="Amount"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            className="w-[59%]"
            id="amountType"
            select
            label="Amount Type"
            {...register("amountType")}
          >
            {packageTypes.map((type, i) => (
              <MenuItem
                key={i}
                value={amount === "1" ? type.singular : type.plural}
              >
                {amount === "1" ? type.singular : type.plural}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex justify-center">
          <button
            className="mx-auto mt-3 rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateQuantityModal;
