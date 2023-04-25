import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import ShowUsers from "../householdMembers/ShowUsers";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import InvitedMembers from "../householdMembers/InvitedMembers";
import InviteMembers from "../householdMembers/InviteMembers";

const HouseholdMembersPage = () => {
  const { householdId, householdName } = useContext(GlobalContext);
  const getInviteList = api.household.getInviteList.useQuery({ householdId });
  const inviteRoute = api.useContext().household;
  const deleteInvite = api.invite.deleteInvite.useMutation({
    onSuccess: () => {
      void inviteRoute.getInviteList.invalidate();
    },
  });

  const { data: sessionData } = useSession();

  return (
    <div className="mt-3 flex w-full flex-col space-y-4">
      <div className="">
        <h1 className="text-center text-2xl">{householdName} Household</h1>
      </div>
      <InviteMembers />
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="border-b border-slate-300 text-center text-xl font-semibold">
          Members
        </h2>
        <div className=" h-full">
          <ShowUsers />
        </div>
      </div>
      <div className="flex w-full flex-col  items-center ">
        <h2 className="border-b border-slate-300 text-center text-xl font-semibold">
          Invited
        </h2>
        <div className="">
          {getInviteList.data && (
            <InvitedMembers getInviteList={getInviteList.data[0]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseholdMembersPage;
