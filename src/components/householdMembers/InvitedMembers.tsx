import { type Invite } from "@prisma/client";
import { api, type RouterOutputs } from "~/utils/api";

import React from "react";
import { useSession } from "next-auth/react";

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
    <div>
      {getInviteList &&
        getInviteList.invitedList.map((invite, i) => (
          <div key={i} className="flex gap-3">
            <p>{invite.email}</p>
            {sessionData?.user.role === "ADMIN" && (
              <p onClick={() => deleteInvite.mutate({ email: invite.email })}>
                X
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default InvitedMembers;
