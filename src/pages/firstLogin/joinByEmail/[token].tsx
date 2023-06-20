import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { GlobalContext } from "~/context/GlobalContextProvider";

const HouseholdAccessPage = () => {
  const router = useRouter();
  const token = Array.isArray(router.query.token)
    ? router.query.token[0]
    : (router.query.token as string);

  const { setHouseholdId, householdId } = useContext(GlobalContext);

  console.log(token);

  const joinByInviteCodeRoute = api.useContext().household;

  const joinByInviteCode = api.invite.joinByInviteCode.useMutation({
    onSuccess: async () => {
      toast.success("Successfully joined household!");
      joinByInviteCode.data !== undefined &&
        setHouseholdId(joinByInviteCode.data);
      await joinByInviteCodeRoute.getHouseholdId.invalidate();
      await router.push(`/household/${householdId}`);
    },
  });

  useEffect(() => {
    token && joinByInviteCode.mutate({ inviteCode: token });
  }, []);

  return <div>Joining household...</div>;
};

export default HouseholdAccessPage;
