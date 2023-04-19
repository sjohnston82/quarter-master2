import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/layouts/ui/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ShowUsers from "~/components/ShowUsers";

interface InviteInputProps {
  email: string;
  householdId: string;
  household: string;
  inviter: string;
}

const HouseholdPage = () => {
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm<InviteInputProps>();
  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const [householdId, setHouseholdId] = useState<string>("");
  const [isShowingInviteModal, setIsShowingInviteModal] = useState(false);
  const [emailsToSendInvitesTo, setEmailsToSendInvitesTo] =
    useState<InviteInputProps>();
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);

    if (status === "unauthenticated" && sessionData == undefined)
      void router.push("/");
  }, [getHouseholdId.data, sessionData, status, router]);

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId,
  });

  const inviteRoute = api.useContext().invite;

  const createInvite = api.invite.addNewInvites.useMutation({
    onSuccess: async () => {
      toast.success("Invite successfully sent!");
      setIsShowingInviteModal(false);
      await inviteRoute.invalidate();
    },
    onError: () => {
      toast.error("Invite failed!");
    },
  });

  const addNameToInviteQueue = (data: InviteInputProps) => {
    const mutationData = {
      email: data.email,
      householdId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      household: getHouseholdInfo.data!.name ?? "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inviter: sessionData!.user.name ?? "",
    };
    createInvite.mutate(mutationData);
    reset();
  };

  return (
    <div className="h-full w-full">
      <Modal
        isOpen={isShowingInviteModal}
        title="Invite members to household"
        onClose={() => setIsShowingInviteModal(false)}
      >
        <div className="flex flex-col gap-2">
          <form
            action=""
            className="flex w-full gap-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit((data) => addNameToInviteQueue(data))}
          >
            <input
              type="email"
              id="email"
              className="w-full"
              {...register("email")}
            />
            <button>Add</button>
          </form>
          <div className="flex flex-col"></div>
        </div>
        <div className=""></div>
      </Modal>
      <h1 className="text-center text-2xl">
        {getHouseholdInfo.data && getHouseholdInfo.data.name} Household
      </h1>
      <button onClick={() => setIsShowingInviteModal(true)}>
        Invite members
      </button>
      <div className="">
        <ShowUsers householdId={householdId} />
      </div>
    </div>
  );
};

export default HouseholdPage;
