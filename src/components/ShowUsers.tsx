import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface ShowUserProps {
  householdId: string;
}

const ShowUsers = ({ householdId }: ShowUserProps) => {
  const inviteRoute = api.useContext().household;
  const getHouseholdMembers = api.household.getHouseholdMembers.useQuery({
    householdId,
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async () => {
      // await inviteRoute.invalidate({householdId});
    }
  });

  const deleteInvite = api.invite.deleteInvite.useMutation()

  const { data: sessionData } = useSession();
  console.log(sessionData);

  console.log(getHouseholdMembers.data);
  return (
    <div>
      {getHouseholdMembers.data &&
        getHouseholdMembers.data[0]?.members.map((member) => (
          <>
            <div key={member.id} className="my-2 flex items-center gap-3">
              <Image
                className="rounded-full"
                src={member.image ?? ""}
                width={40}
                height={40}
                alt={member.name ?? ""}
              />
              <div className="flex flex-col">
                <h3 className="">{member.name}</h3>
                <p className="italic">
                  {member.role === "USER" ? "Member" : "Founder"}
                </p>
              </div>
            </div>
          </>
        ))}
      <h2>Invited</h2>
      {getHouseholdMembers.data &&
        getHouseholdMembers.data[0]?.invitedList.map((invite, i) => (
          <div key={i} className="flex gap-3">
            <p>{invite.email}</p>
            {sessionData?.user.role === "ADMIN" && <p onClick={() => deleteInvite.mutate({email: invite.email})}>X</p>}
          </div>
        ))}
    </div>
  );
};

export default ShowUsers;
