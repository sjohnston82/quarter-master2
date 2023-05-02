import React from "react";
import { toast } from "react-hot-toast";
import Modal from "~/components/ui/Modal";
import { api } from "~/utils/api";

interface DeleteConfirmationProps {
  id: string;
  showingDeleteConfirmationModal: boolean;
  setShowingDeleteConfirmationModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const DeleteConfirmationModal = ({
  id,
  showingDeleteConfirmationModal,
  setShowingDeleteConfirmationModal,
}: DeleteConfirmationProps) => {
  const deleteItemRoute = api.useContext().items;
  const deleteItem = api.items.deleteItem.useMutation({
    onSuccess: async () => {
      await deleteItemRoute.invalidate();
      toast.success("Item deleted.");
    },
  });

  return (
    <Modal
      isOpen={showingDeleteConfirmationModal}
      title="Are you sure you want to delete this item?"
      onClose={() => setShowingDeleteConfirmationModal(false)}
    >
      <div className="flex justify-center gap-4 mt-5">
        <button
          className="rounded-2xl border border-slate-600 px-4 text-lg"
          onClick={() => deleteItem.mutate({ id })}
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
    </Modal>
  );
};

export default DeleteConfirmationModal;
