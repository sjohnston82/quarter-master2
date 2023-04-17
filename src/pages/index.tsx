import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const getHouseholdId = api.household.getHouseholdId.useQuery();

  useEffect(() => {
    getHouseholdId.data &&
      getHouseholdId.data !== null &&
      setHouseholdId(getHouseholdId.data.householdId);
    // if (!sessionData) return redirect("/");
    if (status !== "loading" && sessionData !== undefined && householdId) {
      void router.push(`/household/${householdId}`);
    }

    if (status !== "loading" && sessionData == undefined) void router.push("/");
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHouseholdId.data, householdId, sessionData, status]);

  // const redirectToHousehold = async () => {
  //   householdId && sessionData && (await router.push(`/household/${householdId}`));
  // };

  return (
    <>
      <main className="flex min-h-screen ">
        <div className="w-full">
          <h1 className="text-center">
            Welcome to QuarterMaster. Please sign in to continue.
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
