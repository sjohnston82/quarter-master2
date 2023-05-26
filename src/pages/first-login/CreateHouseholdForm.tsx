import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/ui/Button";
import SubmitButton from "~/components/ui/SubmitButton";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";

const CreateHouseholdForm = () => {
  const { householdId, setHouseholdId } = useContext(GlobalContext);
  const { data: sessionData } = useSession();
  // get last name of logged in user and set it to default HH name
  const defaultHouseholdName = sessionData?.user?.name?.split(" ")[1];
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: defaultHouseholdName ?? "",
    },
  });


  const createHousehold = api.household.createNewHousehold.useMutation({
    onSuccess: () => {
      reset();
      void router.push("/");
    },
  });

  return (
    <form
      className=""
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((name) => createHousehold.mutate(name))}
    >
      <div className="flex items-center gap-1">
        <span>The </span>
        <TextField type="text" id="name" {...register("name")} className="" />
        <span> Household</span>
      </div>
      <div className="mt-2 flex justify-center">
        <SubmitButton className="">Create</SubmitButton>
      </div>
    </form>
  );
};

export default CreateHouseholdForm