import { useEffect, useState, useContext } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/layouts/ui/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ShowUsers from "~/components/householdMembers/ShowUsers";
import StorageAreas from "~/components/storage-areas/StorageAreas";
import { GlobalContext } from "~/context/GlobalContextProvider";
import InviteMembers from "~/components/householdMembers/InviteMembers";

const HouseholdPage = () => {
  const router = useRouter();
  const { householdId, setHouseholdId } = useContext(GlobalContext);

  const getHouseholdId = api.household.getHouseholdId.useQuery();

  const { data: sessionData, status } = useSession();
  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);

    if (status === "unauthenticated" && sessionData == undefined)
      void router.push("/");
  }, [getHouseholdId.data, sessionData, status, router, setHouseholdId]);

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId,
  });

  return (
    <div className="h-full w-full ">
      <h1 className="text-center text-2xl">
        {getHouseholdInfo.data && getHouseholdInfo.data.name} Household
      </h1>
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <div className="col-span-2">
          <StorageAreas />
        </div>
        <div className="col-span-8 bg-blue-200"></div>
        <div className="grid col-span-2 ">
          <InviteMembers household={getHouseholdInfo.data?.name} />
          <ShowUsers householdId={householdId} />
        </div>
      </div>
    </div>
  );
};

export default HouseholdPage;
