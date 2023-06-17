import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";
import InviteMembers from "../householdMembers/InviteMembers";
import ShowUsers from "../householdMembers/ShowUsers";
import InvitedMembers from "../householdMembers/InvitedMembers";
import SideBarNavButtons from "./SideBarNavButtons";

const MembersSideBar = () => {
  const { householdId, householdName } = useContext(GlobalContext);
  const getInviteList = api.household.getInviteList.useQuery({ householdId });

  return (
    <div className="flex h-[calc(100vh-136px)]  w-full flex-col  rounded-br-xl border-l-2 border-woodsmoke bg-snow">
      <SideBarNavButtons />
      <div className="overflow-y-scroll rounded-br-xl">
        <div className="">
          <h1 className="w-full py-2 text-center text-xl ">
            {householdName} Household
          </h1>
        </div>
        <InviteMembers />
        <div className="flex w-full flex-col items-center justify-center pt-2">
          <h2 className="border-b border-slate-300 px-2 text-center text-xl font-semibold">
            Members
          </h2>
          <div className=" h-full">
            <ShowUsers />
          </div>
        </div>
        <div className="flex w-full flex-col  items-center pb-8">
          <h2 className="border-b border-slate-300 px-2 text-center text-xl font-semibold">
            Invited
          </h2>
          <div className="">
            {getInviteList.data && (
              <InvitedMembers getInviteList={getInviteList.data[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersSideBar;
