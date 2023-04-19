/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Modal from "~/components/layouts/ui/Modal";

// interface IFormInput {
//   name: string;
// }

const CreateHouseholdForm = () => {
  const { data: sessionData } = useSession();
  const defaultHouseholdName = sessionData?.user?.name?.split(" ")[1];
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: defaultHouseholdName ?? "",
    },
  });

  // get last name of logged in user and set it to default HH name

  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const [householdId, setHouseholdId] = useState<string | null>(null);

  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      setHouseholdId(getHouseholdId.data.householdId);
  }, [getHouseholdId.data]);

  const createHousehold = api.household.createNewHousehold.useMutation({
    onSuccess: () => {
      reset();
      void router.push("/");
    },
  });

  return (
    <form
      className=""
      onSubmit={handleSubmit((name) => createHousehold.mutate(name))}
    >
      <div className="">
        <span>The </span>
        <input type="text" id="name" {...register("name")} className="" />
        <span> Household</span>
      </div>
      <button className="" type="submit">
        Create
      </button>
    </form>
  );
};

interface JoinByInviteCodeProps {
  email: string;
  inviteCode: string;
}

const JoinHouseholdByInviteForm = () => {
  const { data: sessionData } = useSession();
  const { register, handleSubmit } = useForm<JoinByInviteCodeProps>();
  const router = useRouter();

  const joinByInviteCode = api.invite.joinByInviteCode.useMutation({
    onSuccess: () => {
      void router.push("/");
      toast.success("Successfully joined household!");
    },
  });

  const onSubmitByInvite = (data: JoinByInviteCodeProps) => {
    const mutationData = {
      email: sessionData?.user.email ?? "",
      inviteCode: data.inviteCode,
    };
    joinByInviteCode.mutate(mutationData);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit((data) => onSubmitByInvite(data))}>
        <input type="text" id="inviteCode" {...register("inviteCode")} />
        <button className="">Join</button>
      </form>
    </div>
  );
};

const FirstTimeLogin = () => {
  const [showingCreateHouseholdModal, setShowCreateHouseholdModal] =
    useState(false);
  const [showingJoinByInviteModal, setShowJoinByInviteModal] = useState(false);
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
