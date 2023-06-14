import { api, type RouterOutputs } from "~/utils/api";
import { RiCloseCircleFill } from "react-icons/ri";

import React from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../ui/LoadingSpinner";

type InvitedMemberProps = {
  getInviteList: RouterOutputs["household"]["getInviteList"][0] | undefined;
};

const InvitedMembers = ({ getInviteList }: InvitedMemberProps) => {
  const { data: sessionData } = useSession();
  const inviteRoute = api.useContext().household;
  const deleteInvite = api.invite.deleteInvite.useMutation({
    onSuccess: () => {
      void inviteRoute.getInviteList.invalidate();
    },
  });
  return (
    <div className="flex flex-col gap-2 mt-4">
      {!getInviteList && <LoadingSpinner />}
      {getInviteList &&
        getInviteList.invitedList.map((invite, i) => (
          <div key={i} className="flex items-center justify-between gap-2 px-2 ">
            <p className="text-lg lg:text-sm ">{invite.email}</p>
            {sessionData?.user.role === "ADMIN" && (
              <div onClick={() => deleteInvite.mutate({ email: invite.email })}>
                <RiCloseCircleFill className="text-lg text-red-500 cursor-pointer " />
              </div>
            )}
          </div>
        ))}
      {getInviteList?.invitedList.length === 0 && (
        <p className="text-center w-2/3 mx-auto">There are currently no active invites.</p>
      )}
    </div>
  );
};

export default InvitedMembers;
