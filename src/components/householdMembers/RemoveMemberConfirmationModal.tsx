import Modal from "../ui/Modal";
import { api } from "~/utils/api";

type RemoveMemberConfirmationProps = {
  id: string;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowingUserInfoModal: React.Dispatch<React.SetStateAction<string>>;
};

const RemoveMemberConfirmationModal = ({
  showConfirmationModal,
  setShowConfirmationModal,
  id,
  setShowingUserInfoModal,
}: RemoveMemberConfirmationProps) => {
  const membersRoute = api.useContext().household;
  const removeFromHousehold = api.user.removeFromHousehold.useMutation({
    onSuccess: async () => {
      setShowConfirmationModal(false);
      setShowingUserInfoModal("");
      await membersRoute.getHouseholdMembers.invalidate();
    },
  });
  return (
    <Modal
      isOpen={showConfirmationModal}
      onClose={() => setShowConfirmationModal(false)}
      title="Are you sure you want to remove this member from your household?"
    >
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="rounded-2xl border border-slate-600 px-4 text-lg"
          onClick={() => removeFromHousehold.mutate({ id })}
        >
          Yes
        </button>
        <button
          className="rounded-2xl border border-slate-600 px-4 text-lg"
          onClick={() => setShowConfirmationModal(false)}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemberConfirmationModal;
