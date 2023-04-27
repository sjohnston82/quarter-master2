/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState, useContext } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateHouseholdForm from "./CreateHouseholdForm";
import JoinHouseholdByInviteForm from "./JoinHouseholdByInviteForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const FirstTimeLogin = () => {
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const [showingCreateHouseholdModal, setShowCreateHouseholdModal] =
    useState(false);
  const [showingJoinByInviteModal, setShowJoinByInviteModal] = useState(false);
  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    getHouseholdId.data &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);

    if (status !== "loading" && sessionData !== undefined && householdId) {
      void router.push(`/household/${householdId}`);
    }

    if (status !== "loading" && sessionData == undefined) {
      void router.push("/");
    }
  }, [
    getHouseholdId.data,
    householdId,
    router,
    sessionData,
    setHouseholdId,
    status,
  ]);
  return (
    <div className="flex h-full w-full justify-center px-28">
      <div className="flex h-full w-full flex-col items-center justify-center bg-red-200">
        <h1 className="text-2xl">Create Household</h1>
        <p className="mt-10">
          Create a new household to start your journey to having a more
          organized pantry today!
        </p>
        <div className="">
          <button onClick={() => setShowCreateHouseholdModal(true)}>
            Create Household
          </button>
          <Modal
            isOpen={showingCreateHouseholdModal}
            title="Enter Household Name"
            onClose={() => setShowCreateHouseholdModal(false)}
          >
            <CreateHouseholdForm />
          </Modal>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center bg-blue-200">
        <p className="mt-10">
          Receive a join invitation via email? Enter your code to join your
          household!
        </p>
        <button onClick={() => setShowJoinByInviteModal(true)}>
          Join Household
        </button>
        <Modal
          isOpen={showingJoinByInviteModal}
          title="Enter invite code"
          onClose={() => setShowJoinByInviteModal(false)}
        >
          <JoinHouseholdByInviteForm />
        </Modal>
      </div>
    </div>
  );
};

export default FirstTimeLogin;
