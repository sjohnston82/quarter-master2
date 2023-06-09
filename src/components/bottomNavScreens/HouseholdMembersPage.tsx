import { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import ShowUsers from "../householdMembers/ShowUsers";
import { api } from "~/utils/api";
import InvitedMembers from "../householdMembers/InvitedMembers";
import InviteMembers from "../householdMembers/InviteMembers";

const HouseholdMembersPage = () => {
  const { householdId, householdName } = useContext(GlobalContext);
  const getInviteList = api.household.getInviteList.useQuery({ householdId });

  return (
    <div className="mt-3 flex w-full bg-snow flex-col h-[calc(100vh-166px)] overflow-y-scroll pb=4 rounded-b-xl space-y-4 text-woodsmoke">
      <div className="">
        <h1 className="text-center text-2xl pt-4">{householdName} Household</h1>
      </div>
      <InviteMembers />
      <div className="sm:flex-row flex flex-col">
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="border-b border-slate-300 px-2 text-center text-xl font-semibold">
            Members
          </h2>
          <div className=" h-full">
            <ShowUsers />
          </div>
        </div>
        <div className="flex w-full flex-col  items-center ">
          <h2 className="border-b border-slate-300 px-2 text-center text-xl font-semibold">
            Invited
          </h2>
          <div className="pb-8">
            {getInviteList.data && (
              <InvitedMembers getInviteList={getInviteList.data[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdMembersPage;
