import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "~/components/ui/Button";
import LoadingSpinner from "~/components/ui/LoadingSpinner";
import SubmitButton from "~/components/ui/SubmitButton";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";

interface JoinByInviteCodeProps {
  email: string;
  inviteCode: string;
}

const JoinHouseholdByInviteForm = () => {
  const { data: sessionData } = useSession();
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinByInviteCodeProps>();
  const router = useRouter();
  const { householdId, setHouseholdId } = useContext(GlobalContext);

  const joinByInviteCodeRoute = api.useContext().household;

  const joinByInviteCode = api.invite.joinByInviteCode.useMutation({
    onSuccess: async () => {
      toast.success("Successfully joined household!");
      joinByInviteCode.data !== undefined &&
        setHouseholdId(joinByInviteCode.data);
      await joinByInviteCodeRoute.getHouseholdId.invalidate();
      await router.push(`/household/${householdId}`);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // await router.push(`/household/${joinByInviteCode.data}`);

      setSuccessfulLogin(true);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // await router.push(`/household/${joinByInviteCode?.data}`);
    },
  });

  // const handleSeeHousehold = async () => {
  //   await router.push(`/household/${householdId}`);
  // };

  // useEffect(() => {
  //   if (
  //     successfulLogin === true &&
  //     householdId !== null &&
  //     householdId !== undefined
  //   ) {
  //     router.push(`/household/${householdId}`).catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }, [householdId, router, successfulLogin]);

  const onSubmitByInvite = (data: JoinByInviteCodeProps) => {
    const mutationData = {
      email: sessionData?.user.email ?? "",
      inviteCode: data.inviteCode,
    };
    joinByInviteCode.mutate(mutationData);
  };

  return (
    <div className="">
      {successfulLogin ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="">Joining household...</h1>
          <LoadingSpinner size={60} />
        </div>
      ) : (
        <form onSubmit={handleSubmit((data) => onSubmitByInvite(data))}>
          <TextField
            type="text"
            id="inviteCode"
            {...register("inviteCode")}
            className="my-2 w-full"
          />
          <div className="flex justify-center ">
            <SubmitButton className="">Join</SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default JoinHouseholdByInviteForm;
