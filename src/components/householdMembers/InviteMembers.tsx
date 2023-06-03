import React, { useState, useContext } from "react";
import Modal from "../ui/Modal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface InviteInputProps {
  email: string;
  householdId: string;
  household: string;
  inviter: string;
}

const inviteSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be blank." })
    .email("Must be a valid email address."),
});

const InviteMembers = () => {
  const { data: sessionData } = useSession();
  const { householdId, householdName } = useContext(GlobalContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteInputProps>({ resolver: zodResolver(inviteSchema) });
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
      household: householdName ?? "",
      inviter: sessionData?.user.name ?? "",
    };
    createInvite.mutate(mutationData);
    reset();
  };

  return (
    <div className="h-full">
      <Modal
        isOpen={isShowingInviteModal}
        // title="Invite members to household"
        onClose={() => setIsShowingInviteModal(false)}
      >
        <div className="flex flex-col items-center gap-2">
          <form
            action=""
            className="flex w-full items-center gap-2"
            onSubmit={handleSubmit((data) => addNameToInviteQueue(data))}
          >
            <div className="flex w-full flex-col">
              <div className="flex w-full gap-2">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-slate-300 p-1 pl-3 placeholder:text-slate-600"
                  {...register("email")}
                  placeholder="Enter email..."
                />
                <button className="font-semibold ">Invite</button>
              </div>
              {errors.email?.message && (
                <p className="text-sm italic text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </form>
          <div className="flex flex-col"></div>
        </div>
        <div className=""></div>
      </Modal>

      <button
        onClick={() => setIsShowingInviteModal(true)}
        className="mx-auto flex items-center gap-1 rounded-xl border border-slate-300 p-2 hover:border-slate-600"
      >
        <PersonAddIcon />
        <span className="text-xl">Invite Members</span>
      </button>
    </div>
  );
};

export default InviteMembers;
