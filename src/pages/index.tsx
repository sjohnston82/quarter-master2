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
  const { data: sessionData } = useSession();
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const getHouseholdId = api.household.getHouseholdId.useQuery();

  useEffect(() => {
    getHouseholdId.data &&
    getHouseholdId.data !== null &&
    setHouseholdId(getHouseholdId.data.householdId);
    if (!sessionData) return redirect("/");
    if (sessionData && householdId)
    return redirect(`/household/${householdId}`);
  }, [getHouseholdId.data, householdId, sessionData]);

  // const redirectToHousehold = async () => {
  //   householdId && sessionData && (await router.push(`/household/${householdId}`));
  // };
  console.log(sessionData);

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
