import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
  } = useForm<JoinByInviteCodeProps>();
  const router = useRouter();
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const [badCode, setBadCode] = useState(false);

  const joinByInviteCodeRoute = api.useContext().household;

  const joinByInviteCode = api.invite.joinByInviteCode.useMutation({
    onSuccess: async () => {
      toast.success("Successfully joined household!");
      joinByInviteCode.data !== undefined &&
        setHouseholdId(joinByInviteCode.data);
      await joinByInviteCodeRoute.getHouseholdId.invalidate();
      await router.push(`/household/${householdId}`);
      setSuccessfulLogin(true);
    },
    onError: () => {
      setBadCode(true);
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
            onInput={() => setBadCode(false)}
          />
          {badCode && (
            <p className="text-sm italic text-red-500 text-center">
              The invite code you entered is incorrect! Please try again.
            </p>
          )}
          <div className="flex justify-center ">
            <SubmitButton className="">Join</SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default JoinHouseholdByInviteForm;
