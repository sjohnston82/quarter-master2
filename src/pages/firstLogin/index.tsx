import { useEffect, useState, useContext } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import CreateHouseholdForm from "./CreateHouseholdForm";
import JoinHouseholdByInviteForm from "./JoinHouseholdByInviteForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import Button from "~/components/ui/Button";
import Footer from "~/components/layouts/Footer";

const FirstTimeLogin = () => {
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const [showingCreateHouseholdModal, setShowCreateHouseholdModal] =
    useState(false);
  const [showingJoinByInviteModal, setShowJoinByInviteModal] = useState(false);
  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  // const joinOnceVerifiedRoute = api.useContext().invalidate();
  const joinOnceVerified = api.invite.joinOnceVerified.useMutation({
    onSuccess: async () => {
      await api.useContext().invalidate();
    },
  });
  useEffect(() => {
    joinOnceVerified.mutate();
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
    joinOnceVerified,
    router,
    sessionData,
    setHouseholdId,
    status,
  ]);
  return (
    <div className="bg-darkgray">
      <div className="flex h-[calc(100vh-98px)] w-full flex-col justify-center space-y-2 rounded-b-xl  lg:h-[calc(100vh-116px)]">
        <div className="flex h-full flex-col rounded-b-xl bg-snow">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className=" px-6 py-6 text-center">
              Create a new household to start your journey to having a more
              organized pantry today!
            </p>
            <div className="">
              <Button onClick={() => setShowCreateHouseholdModal(true)}>
                Create Household
              </Button>
              <Modal
                isOpen={showingCreateHouseholdModal}
                onClose={() => setShowCreateHouseholdModal(false)}
              >
                <CreateHouseholdForm />
              </Modal>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: "black",
                },
              }}
              className="w-1/2 text-woodsmoke"
            >
              or
            </Divider>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center px-4">
            <p className="mb-6 text-center ">
              Receive a join invitation via email? Enter your code to join your
              household!
            </p>
            <Button onClick={() => setShowJoinByInviteModal(true)}>
              Join Household
            </Button>
            <Modal
              isOpen={showingJoinByInviteModal}
              title="Enter invite code"
              onClose={() => setShowJoinByInviteModal(false)}
            >
              <JoinHouseholdByInviteForm />
            </Modal>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FirstTimeLogin;
