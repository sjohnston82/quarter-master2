import { type Invite } from "@prisma/client";
import { api, type RouterOutputs } from "~/utils/api";
import {RiCloseCircleFill} from "react-icons/ri";

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
          <div key={i} className="flex gap-2 items-center">
            <p className="text-lg">{invite.email}</p>
            {sessionData?.user.role === "ADMIN" && (
              <div onClick={() => deleteInvite.mutate({ email: invite.email })}>
                <RiCloseCircleFill className="text-red-500 text-lg" />
              </div>
            )}
          </div>
        ))}
      {getInviteList?.invitedList.length === 0 && (
        <p className="mt-2">There are currently no active invites.</p>
      )}
    </div>
  );
};

export default InvitedMembers;
