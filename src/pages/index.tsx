import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  console.log(sessionData);

  return (
    <>
      <main className="flex min-h-screen ">
        <div className="w-full">
          <h1 className="text-center">Welcome to QuarterMaster.  Please sign in to continue.</h1>
        </div>
      </main>
    </>
  );
};

export default Home;


