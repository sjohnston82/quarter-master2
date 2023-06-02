import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "~/components/ui/Modal";
import { type RouterOutputs, api } from "~/utils/api";

type Item = RouterOutputs["items"]["getAllItems"][0];
interface DeleteConfirmationProps {
  id: string;
  showingDeleteConfirmationModal: boolean;
  setShowingDeleteConfirmationModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  item: Item;
  showingAddToShoppingFromItemsModal: boolean;
  setShowingAddToShoppingFromItemsModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const DeleteConfirmationModal = ({
  id,
  item,
  setShowingAddToShoppingFromItemsModal,
  showingAddToShoppingFromItemsModal,
  showingDeleteConfirmationModal,
  setShowingDeleteConfirmationModal,
}: DeleteConfirmationProps) => {
  const [checked, setChecked] = useState(false);
  const handleAddToShoppingList = () => {
    checked && setShowingAddToShoppingFromItemsModal(true);
    setShowingDeleteConfirmationModal(false);
  };
  const deleteItemRoute = api.useContext().items;
  const deleteItem = api.items.deleteItem.useMutation({
    onSuccess: async () => {
      !checked && (await deleteItemRoute.invalidate());
      toast.success("Item deleted.");
      handleAddToShoppingList();
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Modal
      isOpen={showingDeleteConfirmationModal}
      title="Are you sure you want to delete this item?"
      onClose={() => setShowingDeleteConfirmationModal(false)}
    >
      <div className="mt-5 flex flex-col justify-center gap-4">
        <div className="flex justify-center gap-4">
          <button
            className="rounded-2xl border border-slate-600 px-4 text-lg"
            onClick={() => {
              deleteItem.mutate({ id });
              checked && setShowingAddToShoppingFromItemsModal(true);
            }}
          >
            Yes
          </button>
          <button
            className="rounded-2xl border border-slate-600 px-4 text-lg"
            onClick={() => setShowingDeleteConfirmationModal(false)}
          >
            No
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Add to Shopping List"
        />
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
