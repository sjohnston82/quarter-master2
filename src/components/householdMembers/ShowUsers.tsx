import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";

const ShowUsers = () => {
  const { householdId } = useContext(GlobalContext)
  // const inviteRoute = api.useContext().household;
  const getHouseholdMembers = api.household.getHouseholdMembers.useQuery({
    householdId,
  });

  // const getInviteList = api.household.getInviteList.useQuery({ householdId });

  // const deleteInvite = api.invite.deleteInvite.useMutation({
  //   onSuccess: () => {
  //     void inviteRoute.getInviteList.invalidate();
  //   },
  // });

  // const { data: sessionData } = useSession();

  return (
    <div className="justify-center flex flex-col">
      {getHouseholdMembers.data &&
        getHouseholdMembers.data[0]?.members.map((member) => (
          <div key={member.id} className="my-2 flex items-center gap-3">
            <Image
              className="rounded-full"
              src={member.image ?? ""}
              width={40}
              height={40}
              alt={member.name ?? ""}
            />
            <div className="flex flex-col">
              <h3 className="text-lg">{member.name}</h3>
              <p className="italic">
                {member.role === "USER" ? "Member" : "Founder"}
              </p>
            </div>
          </div>
        ))}
      {/* <h2>Invited</h2>
      {getInviteList.data &&
        getInviteList.data[0]?.invitedList.map((invite, i) => (
          <div key={i} className="flex gap-3">
            <p>{invite.email}</p>
            {sessionData?.user.role === "ADMIN" && (
              <p onClick={() => deleteInvite.mutate({ email: invite.email })}>
                X
              </p>
            )}
          </div>
        ))} */}
    </div>
  );
};

export default ShowUsers;
