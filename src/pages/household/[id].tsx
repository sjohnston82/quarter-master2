import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Modal from "~/components/layouts/ui/Modal";
import { useForm } from "react-hook-form";

interface InviteInputProps {
  email: string;
}

const HouseholdPage = () => {
  const { register, reset, handleSubmit } = useForm<InviteInputProps>();
  const getHouseholdId = api.household.getHouseholdId.useQuery();
  const [householdId, setHouseholdId] = useState<string>("");
  const [isShowingInviteModal, setIsShowingInviteModal] = useState(false);
  const [emailsToSendInvitesTo, setEmailsToSendInvitesTo] = useState<
    InviteInputProps[]
  >([]);
  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setHouseholdId(getHouseholdId.data.householdId!);
  }, [getHouseholdId.data]);

  const getHouseholdInfo = api.household.getHouseholdInfo.useQuery({
    householdId,
  });

  const addNameToInviteQueue = (data: InviteInputProps) => {
    setEmailsToSendInvitesTo((prev) => [...prev, data]);
    reset();
  };

  const removeFromInviteList = (index: number | React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setEmailsToSendInvitesTo(
      emailsToSendInvitesTo.filter((_, i) => i !== index)
    );

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
          <div className="flex flex-col">
            {emailsToSendInvitesTo.map((invite, i) => (
              <div className="flex gap-4" key={i}>
                <p className="">{invite.email}</p>
                <button onClick={() => removeFromInviteList(i)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          {emailsToSendInvitesTo.length > 0 && <button>Confirm</button>}
        </div>
      </Modal>
      <h1 className="text-center text-2xl">
        {getHouseholdInfo.data && getHouseholdInfo.data.name} Household
      </h1>
      <button onClick={() => setIsShowingInviteModal(true)}>
        Invite members
      </button>
    </div>
  );
};

// interface IParams extends ParsedUrlQuery {
//   householdId: string;
// }

// import { generateSSGHelper } from "~/server/helpers/ssgHelper";
// import type { NextPage, GetStaticProps } from "next";
// import { ParsedUrlQuery } from "querystring";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   const householdId = context.params!;
//   console.log("help!", householdId);

//   if (typeof householdId !== "string") throw new Error("No householdId.");

//   await ssg.household.getHouseholdInfo.prefetch({ householdId });

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       householdId: householdId,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

export default HouseholdPage;
