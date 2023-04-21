import React, { useState, useContext } from "react";
import Modal from "../ui/Modal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useSession } from "next-auth/react";

interface InviteInputProps {
  email: string;
  householdId: string;
  household: string;
  inviter: string;
}

interface InviteMemberProps {
  household: string | undefined;
}

const InviteMembers = ({ household }: InviteMemberProps) => {
  const { data: sessionData } = useSession();
  const { householdId } = useContext(GlobalContext);
  const { register, reset, handleSubmit } = useForm<InviteInputProps>();
  const [isShowingInviteModal, setIsShowingInviteModal] = useState(false);

  const inviteRoute = api.useContext().household;

  const createInvite = api.invite.addNewInvites.useMutation({
    onSuccess: () => {
      toast.success("Invite successfully sent!");
      setIsShowingInviteModal(false);
      void inviteRoute.getInviteList.invalidate();
    },
    onError: () => {
      toast.error("Invite failed!");
    },
  });

  const addNameToInviteQueue = (data: InviteInputProps) => {
    const mutationData = {
      email: data.email,
      householdId,
      household: household ?? "",
      inviter: sessionData?.user.name ?? "",
    };
    createInvite.mutate(mutationData);
    reset();
  };

  return (
    <div className="h-full">
      <Modal
        isOpen={isShowingInviteModal}
        title="Invite members to household"
        onClose={() => setIsShowingInviteModal(false)}
      >
        <div className="flex flex-col gap-2">
          <form
            action=""
            className="flex w-full gap-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit((data) => addNameToInviteQueue(data))}
          >
            <input
              type="email"
              id="email"
              className="w-full"
              {...register("email")}
            />
            <button>Add</button>
          </form>
          <div className="flex flex-col"></div>
        </div>
        <div className=""></div>
      </Modal>

      <button onClick={() => setIsShowingInviteModal(true)}>
        Invite members
      </button>
    </div>
  );
};

export default InviteMembers;
