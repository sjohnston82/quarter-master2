import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
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

export default CreateHouseholdForm