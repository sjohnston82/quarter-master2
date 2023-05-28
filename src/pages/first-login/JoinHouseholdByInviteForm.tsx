import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
    formState: { errors },
  } = useForm<JoinByInviteCodeProps>();
  const router = useRouter();
  const { householdId } = useContext(GlobalContext);

  const joinByInviteCode = api.invite.joinByInviteCode.useMutation({
    onSuccess: () => {
      toast.success("Successfully joined household!");
      setSuccessfulLogin(true);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // await router.push(`/household/${joinByInviteCode?.data}`);
    },
  });

  useEffect(() => {
    if (successfulLogin === true && householdId !== null) {
      router.push(`/household/${householdId}`).catch((err) => {
        console.log(err);
      });
    }
  }, [householdId, router, successfulLogin]);

  const onSubmitByInvite = (data: JoinByInviteCodeProps) => {
    const mutationData = {
      email: sessionData?.user.email ?? "",
      inviteCode: data.inviteCode,
    };
    joinByInviteCode.mutate(mutationData);
  };

  return (
    <div className="">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => onSubmitByInvite(data))}
      >
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
    </div>
  );
};

export default JoinHouseholdByInviteForm;
